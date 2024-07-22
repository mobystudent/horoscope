import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SettingsContext } from '../contexts/settings';
import moment from 'moment';

import lang from '../languages/lang_ru.json';

import { arrowRightIcon, arrowLeftIcon } from '../icons/elements';
import { zodiacIcons } from '../icons/zodiac';
import { phaseIcons } from '../icons/phase';

export default function MoonCalendar({ type }) {
	const {
		settings: {
			currentMoonDay: {
				details: {
					sunDay: {
						date: sunDate = ''
					} = {}
				} = {}
			} = {},
			monthsRange = {},
			basicSettings: {
				city: {
					lat: currentLat,
					lng: currentLng,
					timezone: currentTimezone
				}
			} = {}
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ dayWidth, setDayWidth ] = useState(0);
	const parseLang = JSON.parse(JSON.stringify(lang));
	const date = moment(sunDate, 'YYYY-MM-DD');
	const numberWeekDay = date.isoWeekday();
	const [ currentDate, setCurrentDate ] = useState({
		day: date.date(),
		month: date.month() + 1,
		year: date.year()
	});
	const calendarWidth = ({ nativeEvent: { layout } }) => {
		const columnGap = 5;
		const bodyWidth = Math.floor(layout.width) - columnGap * 6;

		setDayWidth(bodyWidth / 7);
	};
	const nameDays = parseLang.week.map(({ cropName }) => {
		return <Text style={[ styles.day, { width: dayWidth } ]} key={ cropName }>{ cropName }</Text>;
	});
	const currentMonth = monthsRange[currentDate.month];
	const visibleMonth = () => {
		const monthArray = [];

		for (let i = 1; i <= Object.keys(currentMonth).length; i++) {
			monthArray.push({
				day: i,
				month: currentDate.month,
				year: currentDate.year
			});
		}

		return monthArray;
	};
	const visibleWeek = () => {
		const numberDay = date.date();
		const firstDayWeek = numberWeekDay - 1;
		const firstDay = numberDay - firstDayWeek;
		const getWeek = visibleMonth().filter((item) => item.day >= firstDay && item.day < firstDay + 7);

		if (getWeek.length === 7) {
			return getWeek;
		} else {
			const sublingMonth = [];

			if (firstDay > 0) {
				for (let i = 1; i <= 7 - getWeek.length; i++) {
					sublingMonth.push({
						day: i,
						month: currentDate.month + 1 > 12 ? 1 : currentDate.month + 1,
						year: currentDate.month + 1 > 12 ? currentDate.year + 1 : currentDate.year
					});
				}

				return [ ...getWeek, ...sublingMonth ];
			} else {
				const prevMonth = monthsRange[currentDate.month - 1 < 1 ? 12 : currentDate.month - 1];
				const countDaysOfPrevMonth = Object.keys(prevMonth).length;
				const lastDaysPrevMonth = countDaysOfPrevMonth + firstDay;

				for (let i = lastDaysPrevMonth; i <= lastDaysPrevMonth + 6 - getWeek.length; i++) {
					sublingMonth.push({
						day: i,
						month: currentDate.month - 1 < 1 ? 12 : currentDate.month - 1,
						year: currentDate.month - 1 < 1 ? currentDate.year - 1 : currentDate.year
					});
				}

				return [ ...sublingMonth, ...getWeek ];
			}
		}
	};
	const visibleDays = type === 'calendar' ? visibleMonth() : visibleWeek();
	const monthArray = visibleDays.map((item) => {
		return (
			<Pressable
				style={[
					styles.item,
					currentDate.day === item.day && styles.itemActive,
					{ width: dayWidth }
				]}
				key={ item.day }
				onPress={ () => chooseDay(item) }
			>
				<Text style={ styles.number }>{ item.day }</Text>
				<View style={ styles.wrap }>
					<View style={ styles.itemIcon }>
						{ phaseIcons('#fff')[currentMonth[item.day].phase] }
					</View>
					<View style={ styles.itemIcon }>
						{ zodiacIcons('#fff')[currentMonth[item.day].sign] }
					</View>
				</View>
			</Pressable>
		);
	});
	const chooseDay = (item) => {
		const dayFormat = item.day < 10 ? `0${ item.day }` : item.day;
		const monthFormat = item.month < 10 ? `0${ item.month }` : item.month;
		const dateFormat = `${ item.year }-${ monthFormat }-${ dayFormat }`;
		const currentTime = moment().format('HH:mm');

		setCurrentDate(item);

		try {
			fetch(`https://api-moon.digitalynx.org/api/moon/special/day?date=${ dateFormat }&time=${ currentTime }&lat=${ currentLat }&lng=${ currentLng }&tz=${ currentTimezone }`)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Не удалось получить данные о текущем лунном дне');
					}

					return response.json();
				})
				.then((moonData) => {
					if (!Object.keys(moonData).length) {
						throw new Error(`Данных о текущем лунном дне на сервере не обнаружено`);
					}

					setSettings({
						...settings,
						currentMoonDay: moonData,
						background: moonData.phase
					});
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
	};
	const changeViewMonth = (direction) => {
		let viewMonth = 0;
		let viewYear = 0;

		if (direction === 'next') {
			viewMonth = currentDate.month + 1 > 12 ? 1 : currentDate.month + 1;
			viewYear = viewMonth === 1 ? currentDate.year + 1 : currentDate.year;
		} else {
			viewMonth = currentDate.month - 1 < 1 ? 12 : currentDate.month - 1;
			viewYear = viewMonth === 12 ? currentDate.year - 1 : currentDate.year;
		}

		setCurrentDate({
			...currentDate,
			month: viewMonth,
			year: viewYear
		});
	};

	return (
		<View style={ styles.calendar }>
			{ type === 'calendar' && <View style={ styles.header }>
				<View>
					<Text style={ styles.month }>{ parseLang.months[currentDate.month - 1].nameNom }</Text>
					<Text style={ styles.weekDay }>{ parseLang.week[numberWeekDay - 1].fullName }</Text>
				</View>
				<View style={ styles.control }>
					<Pressable style={ styles.button } onPress={ () => changeViewMonth('prev') }>
						<View style={ styles.arrowIcon }>
							{ arrowLeftIcon('#fff', .5) }
						</View>
					</Pressable>
					<Pressable style={ styles.button } onPress={ () => changeViewMonth('next') }>
						<View style={ styles.arrowIcon }>
							{ arrowRightIcon('#fff', .5) }
						</View>
					</Pressable>
				</View>
			</View> }
			<View style={ styles.body } onLayout={ (event) => calendarWidth(event) }>
				{ nameDays }
				{ monthArray }
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	calendar: {
		marginBottom: 30
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15
	},
	month: {
		fontWeight: '700',
		fontSize: 20,
		lineHeight: 24,
		color: '#fff',
		letterSpacing: -.12,
		marginBottom: 5
	},
	weekDay: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		color: 'rgba(255, 255, 255, .5)',
		letterSpacing: -.12
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
		rowGap: 7,
		columnGap: 5
	},
	day: {
		fontWeight: '400',
		fontSize: 10,
		lineHeight: 12,
		color: 'rgba(255, 255, 255, .5)',
		textAlign: 'center'
	},
	item: {
		alignItems: 'center',
		rowGap: 10,
		paddingTop: 5,
		paddingHorizontal: 7,
		paddingBottom: 8,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, .1)',
	},
	itemActive: {
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	number: {
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff'
	},
	wrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	},
	itemIcon: {
		width: 12,
		height: 12
	}
});
