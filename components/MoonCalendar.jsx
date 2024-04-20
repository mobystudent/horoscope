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
						period = ''
					} = {}
				} = {}
			} = {},
			monthsRange = {}
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ dayWidth, setDayWidth ] = useState(0);
	const parseLang = JSON.parse(JSON.stringify(lang));
	const date = moment(period, 'YYYY-MM-DD');
	const numberDay = date.date();
	const numberWeekDay = date.isoWeekday();
	const [ currentDate, setCurrentDate ] = useState({
		day: date.date(),
		month: date.month(),
		year: date.year()
	});
	const numberFirstDay = moment(`01-${ currentDate.month + 1 }-${ currentDate.year }`, 'DD-MM-YYYY').isoWeekday();
	const calendarWidth = ({ nativeEvent: { layout } }) => {
		const columnGap = 5;
		const bodyWidth = layout.width - columnGap * 6;

		setDayWidth(bodyWidth / 7);
	};
	const nameDays = parseLang.week.map(({ cropName }) => {
		return <Text style={[ styles.day, { width: dayWidth } ]} key={ cropName }>{ cropName }</Text>;
	});
	const currentMonth = monthsRange[currentDate.month + 1];
	const filterWeek = () => {
		const firstDayWeek = numberWeekDay - 1;
		const firstDay = numberDay - firstDayWeek;
		const firstDayOfWeek = firstDay < 0 ? 0 : firstDay - 1;
		const countDaysOfMonth = Object.keys(currentMonth).length;
		const lastDayOfWeek = firstDay + 6 > countDaysOfMonth ? countDaysOfMonth : firstDay + 6;

		return Object.keys(currentMonth).slice(firstDayOfWeek, lastDayOfWeek);
	};
	const visibleDays = type === 'calendar' ? Object.keys(currentMonth) : filterWeek();
	const monthArray = visibleDays.map((key) => {
		return (
			<Pressable
				style={[
					styles.item,
					currentDate.day === +key && styles.itemActive,
					{ width: dayWidth },
					key === '1' && { marginLeft: (numberFirstDay - 1) * (dayWidth + 5) }
				]}
				key={ key }
				onPress={ () => chooseDay(+key) }
			>
				<Text style={ styles.number }>{ key }</Text>
				<View style={ styles.wrap }>
					<View style={ styles.itemIcon }>
						{ phaseIcons('#fff')[currentMonth[key].phase] }
					</View>
					<View style={ styles.itemIcon }>
						{ zodiacIcons('#fff')[currentMonth[key].sign] }
					</View>
				</View>
			</Pressable>
		);
	});
	const chooseDay = (day) => {
		const dayFormat = day < 10 ? `0${ day }` : day;
		const monthFormat = currentDate.month < 10 ? `0${ currentDate.month + 1 }` : currentDate.month + 1;
		const dateFormat = `${ currentDate.year }-${ monthFormat }-${ dayFormat }`;

		setCurrentDate({
			...currentDate,
			day
		});

		fetch(`https://api-moon.digitalynx.org/api/moon/special/day?date=${ dateFormat }`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok. Getting months failed');
				}

				return response.json();
			})
			.then((moonData) => {
				setSettings({
					...settings,
					currentMoonDay: moonData,
					background: moonData.phase
				});
			});
	};
	const changeViewMonth = (direction) => {
		let viewMonth = 0;
		let viewYear = 0;

		if (direction === 'next') {
			viewMonth = currentDate.month + 1 > 11 ? 0 : currentDate.month + 1;
			viewYear = currentDate.month === 0 ? currentDate.year + 1 : currentDate.year;
		} else {
			viewMonth = currentDate.month - 1 < 0 ? 11 : currentDate.month - 1;
			viewYear = viewMonth === 11 ? currentDate.year - 1 : currentDate.year;
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
					<Text style={ styles.month }>{ parseLang.months[currentDate.month].nameNom }</Text>
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
		padding: 5,
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
