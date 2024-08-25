import { useState, useEffect, useMemo, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonTemplate from '../../components/PersonTemplate';
import { SettingsContext } from '../../contexts/settings';
// import DateTimePicker from 'react-native-ui-datepicker';
// import dayjs from 'dayjs';

export default function TimeScreen({ navigation }) {
	const {
		settings: {
			registered,
			person: {
				time: personTime = ''
			}
		},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ time, setTime ] = useState(personTime || '12:00');
	const [ hours, setHours ] = useState({});
	const [ minutes, setMinutes ] = useState({});
	const [ halfDay, setHalfDay ] = useState([]);
	const hourRef = useRef();
	const minuteRef = useRef();
	// const date = new Date();
	// const noon = date.setHours(12, 0, 0, 0);
	// const [value, setValue] = useState(dayjs());
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const selectItem = ((value, type) => {
		let timeLine = '';

		if (type === 'hours') {
			timeLine = time ? `${ value }${ time.slice(2) }` : `${ value }:00`;
		} else if (type === 'minutes') {
			timeLine = time ? `${ time.slice(0, 3) }${ value }` : `12:${ value }`;
		} else if (type === 'midday') {
			const hoursValue = +time.slice(0, 2);

			if (value === 'pm') {
				if (hoursValue > 12 || hoursValue < 1) return;

				timeLine = `${ hoursValue === 12 ? '00' : hoursValue + 12 }${ time.slice(2) }`;
			} else {
				if (hoursValue < 13 && hoursValue > 0) return;

				if (hoursValue === 0) {
					timeLine = `12${ time.slice(2) }`;
				} else {
					timeLine = `${ hoursValue - 12 < 10 ? '0' : '' }${ hoursValue - 12 }${ time.slice(2) }`;
				}
			}
		}

		setTime(timeLine);
		setDisabledBtn(false);
	});
	const heightItem = 32;
	const wheelListsLength = 9;
	const handleScrollStart = ((type) => {
		const listName = type === 'hours' ? hours : minutes;
		const listState = type === 'hours' ? setHours : setMinutes;
		const listRef = type === 'hours' ? hourRef : minuteRef;
		const updatedList = listName.map((list) => {
			for (key in list) {
				return {
						[key]: list[key].map((item) => {
							item.style = '';

							return item;
						})
				}
			}
		});

		listState([ ...updatedList ]);

		listRef.current.value = false;
	});
	const handleScrollEnd = (({ nativeEvent: { contentOffset } }, type) => {
		const listName = type === 'hours' ? hours : minutes;
		const listState = type === 'hours' ? setHours : setMinutes;
		const listRef = type === 'hours' ? hourRef : minuteRef;
		const activePosition = Math.floor(contentOffset.y / heightItem);

		if (listRef.current.value) return;

		const updatedList = listName.map((list, index) => {
			for (key in list) {
				return {
						[key]: list[key].map((item, i) => {
							const itemPosition = index * 12 + i;

							if (itemPosition === activePosition) {
								item.style = 'prev2';
							}
							if (itemPosition === activePosition + 1) {
								item.style = 'prev1';
							}
							if (itemPosition === activePosition + 2) {
								item.style = 'active';
							}
							if (itemPosition === activePosition + 3) {
								item.style = 'next1';
							}
							if (itemPosition === activePosition + 4) {
								item.style = 'next2';
							}

							return item;
						})
				}
			}
		});

		console.log('valuesList ^^^^^^^^^^^^^^^^^^^');
		console.log(activePosition);
		console.log('valuesList ^^^^^^^^^^^^^^^^^^^');

		if (activePosition <= 28) {
			const lastList = updatedList.slice(wheelListsLength - 3, wheelListsLength);
			const residualList = updatedList.slice(0, wheelListsLength - 3);
			const modifiedList = [ ...lastList, ...residualList ];

			listState(modifiedList);

			listRef.current.value = true;
			listRef.current.scrollTo({ y: heightItem * (activePosition + 36), animated: false });
		} else if (activePosition >= (updatedList.length * 12 - 33)) {
			const firstList = updatedList.slice(0, 3);
			const residualList = updatedList.slice(3, wheelListsLength);
			const modifiedList = [ ...residualList, ...firstList ];

			listState(modifiedList);

			listRef.current.value = true;
			listRef.current.scrollTo({ y: heightItem * 39, animated: false });
		} else {
			listState([ ...updatedList ]);
		}
	});
	const generateList = ((type) => {
		const numberOfLists = Array.from({ length: wheelListsLength }, (_, i) => i);

		return numberOfLists.reduce((acc, current) => {
			const createdList = {
				[current]: Array.from({ length: 12 }, (_, i) => {
					return type === 'hours'
						? {
							id: `${ current }h${ ++i }`,
							type: 'hours',
							title: i,
							value: `${i < 10 ? '0' : ''}${i}`,
							style: ''
						}
						: {
							id: `${ current }m${ i }`,
							type: 'minutes',
							title: `${i * 5 < 10 ? '0' : ''}${i * 5}`,
							value: `${i * 5 < 10 ? '0' : ''}${i * 5}`,
							style: ''
						};
				})
			}

			acc.push(createdList);

			return acc;
		}, []);
	});
	const nextStep = async () => {
		if (disabledBtn) return;

		const userData = {
			...settings.person,
			time
		};

		setSettings({
			...settings,
			person: {
				...userData
			}
		});

		if (registered) {
			try {
				const personString = JSON.stringify(userData);

				await AsyncStorage.setItem('person', personString);
			} catch (error) {
				setSettings({
					...settings,
					modal: {
						visible: true,
						status: 'error',
						title: 'Ошибка сохранения времени рождения',
						message: `Проблема с записью в хранилище. ${ error }, попробуйте выбрать время снова`
					}
				});

				return;
			}

			navigation.navigate('account');
		} else {
			navigation.navigate('place');
		}
	}
	const title = 'Во сколько вы родились?';
	const description = 'Введите время своего рождения, чтобы получить более точные прогнозы лунного влияния на различные сферы вашей жизни';
	const btnText = registered ? 'Сохранить' : 'Далее';
	const allHours = useMemo(() => {
		if (!hours.length) return;

		const valuesList = hours.reduce((acc, list) => {
			for (key in list) {
				acc.push(...list[key]);
			}

			return acc;
		}, []);

		return valuesList.map((item) => (
			<Pressable onPress={ () => selectItem(item.value, item.type) } key={ item.id }>
			<Text style={[ styles.num, styles[item.style] ]}>{ item.title }</Text>
			</Pressable>
		));
	}, [hours]);
	const allMinutes = useMemo(() => {
		if (!minutes.length) return;

		const valuesList = minutes.reduce((acc, list) => {
			for (key in list) {
				acc.push(...list[key]);
			}

			return acc;
		}, []);

		return valuesList.map((item) => (
				<Pressable onPress={ () => selectItem(item.value, item.type) } key={ item.id }>
					<Text style={[ styles.num, styles[item.style] ]}>{ item.title }</Text>
				</Pressable>
			));
	}, [minutes]);
	const allHalfDay = useMemo(() => {
		return halfDay.map((item) => (
				<Pressable onPress={ () => selectItem(item.value, item.type) } key={ item.id }>
					<Text style={[ styles.num, styles[item.style] ]}>{ item.title }</Text>
				</Pressable>
			));
	}, [halfDay]);

	useEffect(() => {
		const initHours = generateList('hours');
		const initMinutes = generateList('minutes');
		const initHalfDay = [ 'am', 'pm' ].map((item, i) => {
			return {
				id: i,
				type: 'midday',
				title: item,
				value: item,
				style: ''
			}
		});

		// console.log('Object.values(hours) >>>>>>>>>>>>>>>>>>>>>>>');
		// console.log(initHours);
		// console.log('Object.values(hours) >>>>>>>>>>>>>>>>>>>>>>>');
		// return;

		setHours(initHours);
		setMinutes(initMinutes);
		setHalfDay(initHalfDay);
	}, []);

	return (
		<PersonTemplate
			navigation={ navigation }
			title={ title }
			description={ description }
			btnText={ btnText }
			disabledBtn={ disabledBtn }
			nextStep={ nextStep }
		>
			<View style={ styles.content }>
				<View style={ styles.wrap }>
					<ScrollView
						style={ styles.list }
						contentOffset={{ y: heightItem * 46 }}
						showsVerticalScrollIndicator={ false }
						pagingEnabled="true"
						snapToInterval={ heightItem }
						decelerationRate="fast"
						onMomentumScrollBegin={ () => handleScrollStart('hours') }
						onMomentumScrollEnd={ (event) => handleScrollEnd(event, 'hours') }
						ref={ hourRef }
					>
						{ allHours }
					</ScrollView>
					<ScrollView
						style={ styles.list }
						contentOffset={{ y: heightItem * 46 }}
						showsVerticalScrollIndicator={ false }
						pagingEnabled="true"
						snapToInterval={ heightItem }
						decelerationRate="fast"
						onMomentumScrollBegin={ () => handleScrollStart('minutes') }
						onMomentumScrollEnd={ (event) => handleScrollEnd(event, 'minutes')  }
						ref={ minuteRef }
					>
						{ allMinutes }
					</ScrollView>
					<ScrollView
						style={ styles.list }
						showsVerticalScrollIndicator={ false }
						pagingEnabled="true"
						snapToOffsets={[ 0, 32 ]}
						decelerationRate="fast"
						// onMomentumScrollBegin={ () => handleScrollStart('minutes') }
						// onMomentumScrollEnd={ (event) => handleScrollEnd(event, 'minutes')  }
					>
						{ allHalfDay }
					</ScrollView>
					<View style={ styles.activeLine }></View>
				</View>
			</View>
		</PersonTemplate>
	);
	// <DateTimePicker
	// 	mode="time"
	// 	value={value}
	// 	onValueChange={(date) => setValue(date)}
	// 	style={ styles.clockItem }
	// />
}

const styles = StyleSheet.create({
	content: {
		position: 'relative',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrap: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 200,
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginBottom: 'auto',
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)',
	},
	clockItem: {
		position: 'static'
	},
	num: {
		fontWeight: '400',
		fontSize: 20,
		lineHeight: 24,
		color: 'rgba(255, 255, 255, .35)',
		height: 32, // del
		textAlign: 'center',
		paddingHorizontal: 5,
		paddingVertical: 4,
		borderTopWidth: 1, // del
		borderBottomWidth: 1, // del
	},
	active: {
		color: '#fff'
	},
	prev1: {
		color: '#256'
	},
	prev2: {
		color: '#873'
	},
	next1: {
		color: '#b2c'
	},
	next2: {
		color: '#a31'
	},
	list: {
		flexGrow: 0,
		height: 160,
		width: 50,
		paddingHorizontal: 5,
		marginHorizontal: 10
	},
	activeLine: {
		position: 'absolute',
		left: 10,
		width: '100%',
		height: 32,
		borderRadius: 7,
		backgroundColor: 'rgba(255, 255, 255, .08)',
		zIndex: -1
	}
});
