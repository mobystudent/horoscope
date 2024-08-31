import { useState, useEffect, useMemo, useRef, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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
	const [ hour, setHour ] = useState({});
	const [ minute, setMinute ] = useState({});
	const [ halfDay, setHalfDay ] = useState([]);
	const [ scrolling, setScrolling ] = useState(false);
	const [ currentTime, setCurrentTime ] = useState({
		hour: +time.slice(0, 2) > 12 ? +time.slice(0, 2) % 12 : +time.slice(0, 2),
		minute: +time.slice(3),
		halfDay: +time.slice(0, 2) > 12 ? 'pm' : 'am'
	});
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const hourRef = useRef();
	const minuteRef = useRef();
	const heightItem = 32;
	const wheelListsLength = 9;
	const handleScrollStart = ((type) => {
		let listState = null;
		let updatedList = [];

		if (type !== 'halfDay') {
			const listName = type === 'hour' ? hour : minute;
			listState = type === 'hour' ? setHour : setMinute;
			updatedList = listName.map((list) => {
				for (key in list) {
					return {
							[key]: list[key].map((item) => {
								item.style = '';

								return item;
							})
					}
				}
			});
		} else {
			listState = setHalfDay;
			updatedList = halfDay.map((item) => {
				item.style = '';

				return item;
			});
		}

		listState([ ...updatedList ]);
		setScrolling(true);
	});
	const handleScrollEnd = (({ nativeEvent: { contentOffset } }, type) => {
		if (!scrolling) return;

		let updatedList = [];
		const activePosition = Math.floor(contentOffset.y / heightItem);

		if (type !== 'halfDay') {
			const listName = type === 'hour' ? hour : minute;
			updatedList = listName.map((list, index) => {
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

									setCurrentTime({
										...currentTime,
										[type]: item.value
									});
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

			setInfiniteList(activePosition, updatedList, type);
		} else {
			updatedList = halfDay.map((item) => {
				if (item.id === activePosition + 1) {
					item.style = 'prev1';
				}
				if (item.id === activePosition + 2) {
					item.style = 'active';

					setCurrentTime({
						...currentTime,
						[type]: item.value
					});
				}
				if (item.id === activePosition + 3) {
					item.style = 'next1';
				}

				return item;
			});

			setHalfDay([ ...updatedList ]);
		}
	});
	const setInfiniteList = (activePosition, updatedList, type) => {
		const listState = type === 'hour' ? setHour : setMinute;
		const listRef = type === 'hour' ? hourRef : minuteRef;

		if (activePosition <= 28) {
			const lastList = updatedList.slice(wheelListsLength - 3, wheelListsLength);
			const residualList = updatedList.slice(0, wheelListsLength - 3);
			const modifiedList = [ ...lastList, ...residualList ];

			listState(modifiedList);

			listRef.current.scrollTo({ y: heightItem * (activePosition + 36), animated: false });
		} else if (activePosition >= (updatedList.length * 12 - 33)) {
			const firstList = updatedList.slice(0, 3);
			const residualList = updatedList.slice(3, wheelListsLength);
			const modifiedList = [ ...residualList, ...firstList ];

			listState(modifiedList);

			listRef.current.scrollTo({ y: heightItem * 39, animated: false });
		} else {
			listState([ ...updatedList ]);
		}

		setScrolling(false);
	};
	const generateList = ((type) => {
		const numberOfLists = Array.from({ length: wheelListsLength }, (_, i) => i);

		return numberOfLists.reduce((acc, current) => {
			const createdList = {
				[current]: Array.from({ length: 12 }, (_, i) => {
					return type === 'hour'
						? {
							id: `${ current }h${ ++i }`,
							type: 'hour',
							value: i,
							style: ''
						}
						: {
							id: `${ current }m${ i }`,
							type: 'minute',
							value: `${ i * 5 < 10 ? '0' : '' }${ i * 5 }`,
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
		if (!hour.length) return;

		const valuesList = hour.reduce((acc, list) => {
			for (key in list) {
				acc.push(...list[key]);
			}

			return acc;
		}, []);

		return valuesList.map((item) => (
			<Text style={[ styles.num, styles[item.style] ]} key={ item.id }>{ item.value }</Text>
		));
	}, [hour]);
	const allMinutes = useMemo(() => {
		if (!minute.length) return;

		const valuesList = minute.reduce((acc, list) => {
			for (key in list) {
				acc.push(...list[key]);
			}

			return acc;
		}, []);

		return valuesList.map((item) => (
			<Text style={[ styles.num, styles[item.style] ]} key={ item.id }>{ item.value }</Text>
		));
	}, [minute]);
	const allHalfDay = useMemo(() => {
		return halfDay.map((item) => (
			<Text style={[ styles.num, styles[item.style] ]} key={ item.id }>{ item.value }</Text>
		));
	}, [halfDay]);

	useEffect(() => {
		const initHours = generateList('hour');
		const initMinutes = generateList('minute');
		const initHalfDay = [ '', '', 'am', 'pm', '', '' ].map((item, i) => {
			return {
				id: i,
				type: 'halfDay',
				value: item,
				style: ''
			}
		});

		setHour(initHours);
		setMinute(initMinutes);
		setHalfDay(initHalfDay);
	}, []);

	useEffect(() => {
		const hourFormat = () => {
			if (currentTime.halfDay === 'pm') {
				return currentTime.hour + 12 === 24 ? '00' : currentTime.hour + 12;
			} else {
				return `${ currentTime.hour < 10 ? '0' : '' }${ currentTime.hour }`;
			}
		};
		const timeFormat = `${ hourFormat() }:${ currentTime.minute }`;

		setTime(timeFormat);
		setDisabledBtn(false);
	}, [currentTime]);

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
						onMomentumScrollBegin={ () => handleScrollStart('hour') }
						onMomentumScrollEnd={ (event) => handleScrollEnd(event, 'hour') }
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
						onMomentumScrollBegin={ () => handleScrollStart('minute') }
						onMomentumScrollEnd={ (event) => handleScrollEnd(event, 'minute') }
						ref={ minuteRef }
					>
						{ allMinutes }
					</ScrollView>
					<ScrollView
						style={ styles.list }
						contentOffset={{ y: 0 }}
						showsVerticalScrollIndicator={ false }
						pagingEnabled="true"
						snapToInterval={ heightItem }
						decelerationRate="fast"
						onMomentumScrollBegin={ () => handleScrollStart('halfDay') }
						onMomentumScrollEnd={ (event) => handleScrollEnd(event, 'halfDay') }
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
		transform: [{ scale: (.7) }],
		borderTopWidth: 1, // del
		borderBottomWidth: 1, // del
	},
	active: {
		transform: [{ scale: (1) }],
		color: '#fff'
	},
	prev1: {
		transform: [{ scale: (.85) }],
		color: '#256'
	},
	prev2: {
		color: '#873'
	},
	next1: {
		transform: [{ scale: (.85) }],
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
