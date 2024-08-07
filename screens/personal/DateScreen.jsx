import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonTemplate from '../../components/PersonTemplate';
import { SettingsContext } from '../../contexts/settings';
import moment from 'moment';

import lang from '../../languages/lang_ru.json';

import { arrowRightIcon, arrowLeftIcon } from '../../icons/elements';

export default function DateScreen({ navigation }) {
	const {
		settings: {
			registered = false,
			person: {
				date: personDate,
				time: personTime,
				place: {
					lat: birthLat,
					lng: birthLng
				} = {}
			} = {}
		},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ date, setDate ] = useState(personDate);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ dayWidth, setDayWidth ] = useState(0);
	const [ boardItemSize, setBoardItemSize ] = useState({
		width: 0,
		height: 0
	});
	const [ showMonthsBoard, setShowMonthsBoard ] = useState(false);
	const [ showYearsBoard, setShowYearsBoard ] = useState(false);
	const parseLang = JSON.parse(JSON.stringify(lang));
	const datePresent = moment();
	const [ currentDate, setCurrentDate ] = useState({
		day: datePresent.date(),
		month: datePresent.month(),
		year: datePresent.year() - 5
	});
	const minAgeLimit = currentDate.month === datePresent.month() && currentDate.year <= datePresent.year() - 74;
	const maxAgeLimit = currentDate.month === datePresent.month() && currentDate.year >= datePresent.year() - 5;
	const numberFirstDay = moment(`01-${ currentDate.month + 1 }-${ currentDate.year }`, 'DD-MM-YYYY').isoWeekday();
	const calendarWidth = ({ nativeEvent: { layout } }) => {
		const columnGap = 4;
		const bodyWidth = layout.width - columnGap * 6;

		setDayWidth(bodyWidth / 7);
	};
	const nameDays = parseLang.week.map(({ cropName }) => {
		return <Text style={[ styles.day, { width: dayWidth } ]} key={ cropName }>{ cropName }</Text>;
	});
	const monthArray = () => {
		const daysList = [];
		const chooseMonth = moment().year(currentDate.year).month(currentDate.month).daysInMonth();

		for (let day = 0; day < chooseMonth; day++) {
			const dayDisabledMin = minAgeLimit && day + 1 < datePresent.date() && styles.disabled;
			const dayDisabledMax = maxAgeLimit && day + 1 > datePresent.date() && styles.disabled;

			if (dayDisabledMax || dayDisabledMin) {
				daysList.push(
					<View
						style={[
							styles.item,
							{ width: dayWidth, height: dayWidth, borderRadius: dayWidth / 2 },
						]}
						key={ day }
					>
						<Text style={[ styles.number, dayDisabledMin, dayDisabledMax ]}>{ day + 1 }</Text>
					</View>
				);
			} else {
				daysList.push(
					<Pressable
						style={[
							styles.item,
							currentDate.day === day + 1 && styles.itemActive,
							{ width: dayWidth, height: dayWidth, borderRadius: dayWidth / 2 },
							day + 1 === 1 && { marginLeft: (numberFirstDay - 1) * (dayWidth + 4) }
						]}
						key={ day }
						onPress={ () => chooseDay(day + 1) }
					>
						<Text style={ styles.number }>{ day + 1 }</Text>
					</Pressable>
				);
			}
		}

		return daysList;
	};
	const chooseDay = (day) => {
		setCurrentDate({
			...currentDate,
			day
		});
	};
	const changeViewMonth = (direction) => {
		let viewMonth = 0;
		let viewYear = 0;

		if (direction === 'next') {
			if (maxAgeLimit) return;

			viewMonth = currentDate.month + 1 > 11 ? 0 : currentDate.month + 1;
			viewYear = currentDate.month === 11 ? currentDate.year + 1 : currentDate.year;
		} else {
			if (minAgeLimit) return;

			viewMonth = currentDate.month - 1 < 0 ? 11 : currentDate.month - 1;
			viewYear = viewMonth === 11 ? currentDate.year - 1 : currentDate.year;
		}

		setCurrentDate({
			...currentDate,
			month: viewMonth,
			year: viewYear
		});
	};
	const choiseMonth = (indexMonth) => {
		setCurrentDate({
			...currentDate,
			month: indexMonth
		});
		setShowMonthsBoard(false);
	};
	const choiseYear = (year) => {
		setCurrentDate({
			...currentDate,
			year
		});
		setShowYearsBoard(false);
	};
	const monthsNameArray = parseLang.months.map((month, index) => {
		const monthDisabledMin = currentDate.year <= datePresent.year() - 74 && index < datePresent.month() && styles.disabled;
		const monthDisabledMax = currentDate.year >= datePresent.year() - 5 && index > datePresent.month() && styles.disabled;

		return (
			monthDisabledMin || monthDisabledMax ?
			<View
				style={[
					styles.boardItem,
					{
						width: (Math.ceil(boardItemSize.width) - 6) / 3,
						height: '25%'
					}
				]}
				key={ month.nameNom }
			>
				<Text style={[ styles.itemName, monthDisabledMin, monthDisabledMax ]}>{ month.nameNom }</Text>
			</View>
			: <Pressable
				style={[
					styles.boardItem,
					{
						width: (Math.ceil(boardItemSize.width) - 6) / 3,
						height: '25%'
					}
				]}
				key={ month.nameNom }
				onPress={ () => choiseMonth(index) }
			>
				<Text style={ styles.itemName }>{ month.nameNom }</Text>
			</Pressable>
		);
	});
	const yearPeriodArray = () => {
		const yearsList = [];

		for (let year = datePresent.year() - 74; year < datePresent.year() - 4; year++) {
			yearsList.push(
				<Pressable
					style={[
						styles.boardItem,
						{
							width: (Math.ceil(boardItemSize.width) - 6) / 4,
							height: '20%'
						}
					]}
					key={ year }
					onPress={ () => choiseYear(year) }
				>
					<Text style={ styles.itemName }>{ year }</Text>
				</Pressable>
			);
		}

		return yearsList;
	};
	const contentSize = ({ nativeEvent: { layout } }) => {
		const contentWidth = layout.width;
		const contentHeight = layout.height;

		setBoardItemSize({
			width: contentWidth,
			height: contentHeight
		});
	};
	const nextStep = async () => {
		if (disabledBtn) return;

		const userData = {
			...settings.person,
			date
		};

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
						title: 'Ошибка сохранения даты рождения',
						message: `Проблема с записью в хранилище. ${ error }, попробуйте выбрать дату заново`
					}
				});

				return;
			}

			try {
				const birthDate = moment(date.data, 'DD-MM-YYYY').format('YYYY-MM-DD');

				fetch(`https://api-moon.digitalynx.org/api/moon/register?date=${ birthDate }&time=${ personTime }&lat=${ birthLat }&lng=${ birthLng }`)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Не удалось получить данные о лунном дне при рождении');
						}

						return response.json();
					})
					.then((birthdayData) => {
						if (!Object.keys(birthdayData).length) {
							throw new Error(`Данных о лунном дне при рождении на сервере не обнаружено`);
						}

						setSettings({
							...settings,
							person: {
								...userData
							},
							birthdayMoon: birthdayData
						});

						navigation.navigate('account');
					})
					.catch((error) => {
						setSettings({
							...settings,
							modal: {
								visible: true,
								status: 'error',
								title: 'Ошибка загрузки данных',
								message: `Проблема с ответом от сети. ${ error }, попробуйте перезагрузить приложение`
							}
						});
					});
			} catch (error) {
				setSettings({
					...settings,
					modal: {
						visible: true,
						status: 'error',
						title: 'Ошибка подключения к сети',
						message: `Не удалось подключиться к сети. ${ error }, попробуйте перезагрузить приложение`
					}
				});

				return;
			}
		} else {
			setSettings({
				...settings,
				person: {
					...userData
				}
			});

			navigation.navigate('time');
		}
	};
	const title = 'Когда у вас день рождение?';
	const description = 'Укажите дату своего рождения, чтобы получить доступ к астрологическому анализу и лунным фазам, влияющим на вас';
	const btnText = registered ? 'Сохранить' : 'Далее';

	useEffect(() => {
		const dayFormat = currentDate.day < 10 ? `0${ currentDate.day }` : currentDate.day;
		const monthFormat = currentDate.month < 10 ? `0${ currentDate.month + 1 }` : currentDate.month + 1;

		setDate({
			data: `${ dayFormat }-${ monthFormat }-${ currentDate.year }`,
			value: `${ dayFormat }.${ monthFormat }.${ currentDate.year }`
		});
		setDisabledBtn(false);
	}, [currentDate]);

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
				<View style={ styles.calendar } onLayout={ (event) => contentSize(event) }>
					<View style={ styles.header }>
						<Pressable style={ styles.yearWrap } onPress={ () => setShowYearsBoard(true) }>
							<Text style={ styles.year }>{ currentDate.year }</Text>
						</Pressable>
						<Pressable style={ styles.monthWrap } onPress={ () => setShowMonthsBoard(true) }>
							<Text  style={ styles.month }>{ parseLang.months[currentDate.month].nameNom }</Text>
						</Pressable>
						<View style={ styles.control }>
							<Pressable style={ styles.button } onPress={ () => changeViewMonth('prev') }>
								<View style={ styles.arrowIcon }>
									{ arrowLeftIcon('#fff', 1) }
								</View>
							</Pressable>
							<Pressable style={ styles.button } onPress={ () => changeViewMonth('next') }>
								<View style={ styles.arrowIcon }>
									{ arrowRightIcon('#fff', 1) }
								</View>
							</Pressable>
						</View>
					</View>
					<View style={ styles.body } onLayout={ (event) => calendarWidth(event) }>
						{ nameDays }
						{ monthArray() }
					</View>
					{ showMonthsBoard &&
						<View style={[ styles.monthBoard, { width: boardItemSize.width, height: boardItemSize.height } ]}>
							{ monthsNameArray }
						</View>
					}
					{ showYearsBoard &&
						<ScrollView style={[ styles.yearBoard, { width: boardItemSize.width, height: boardItemSize.height } ]} horizontal={ true }>
							<View style={ styles.boardWrap }>
								{ yearPeriodArray() }
							</View>
						</ScrollView>
					}
				</View>
			</View>
		</PersonTemplate>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1
	},
	calendar: {
		position: 'relative',
		padding: 15,
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)',
		overflow: 'hidden'
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		columnGap: 20,
		marginBottom: 15
	},
	monthWrap: {
		flex: 1
	},
	month: {
		fontWeight: '700',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
		textAlign: 'center'
	},
	yearWrap: {
		width: 65
	},
	year: {
		fontWeight: '700',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
		textAlign: 'center'
	},
	control: {
		flexDirection: 'row',
		columnGap: 10
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 32,
		height: 32,
		borderRadius: 32/2,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	arrowIcon: {
		width: 9,
		height: 14
	},
	body: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		rowGap: 5,
		columnGap: 4
	},
	day: {
		fontWeight: '700',
		fontSize: 14,
		lineHeight: 16,
		color: 'rgba(255, 255, 255, .5)',
		textAlign: 'center'
	},
	disabled: {
		color: 'rgba(255, 255, 255, .12)'
	},
	item: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	itemActive: {
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	number: {
		fontWeight: '500',
		fontSize: 20,
		lineHeight: 24,
		color: '#fff'
	},
	monthBoard: {
		position: 'absolute',
		flexWrap: 'wrap',
		flexDirection: 'row',
		gap: 3,
		backgroundColor: '#100e24'
	},
	yearBoard: {
		position: 'absolute',
		backgroundColor: '#100e24'
	},
	boardWrap: {
		flexWrap: 'wrap',
		flexDirection: 'column',
		columnGap: 2,
		maxWidth: 1163
	},
	boardItem: {
		alignItems: 'center',
		justifyContent: 'center',
		borderTopWidth: 1,
		borderTopStyle: 'style',
		borderTopColor : '#100e24',
		borderBottomWidth: 1,
		borderBottomStyle: 'style',
		borderBottomColor : '#100e24',
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	itemName: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff'
	}
});
