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
			currentMonth = {}
		} = {}
	} = useContext(SettingsContext);
	const [ dayWidth, setDayWidth ] = useState(0);
	const parseLang = JSON.parse(JSON.stringify(lang));
	const date = moment(period, 'YYYY-MM-DD');
	const numberDay = date.date();
	const numberWeekDay = date.isoWeekday();
	const numberMonth = date.month();
	const calendarWidth = ({ nativeEvent: { layout } }) => {
		const columnGap = 5;
		const bodyWidth = layout.width - columnGap * 6;

		setDayWidth(bodyWidth / 7);
	};
	const nameDays = parseLang.week.map(({ cropName }) => {
		return <Text style={[ styles.day, { width: dayWidth } ]} key={ cropName }>{ cropName }</Text>;
	});
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
		const numberYear = date.format('YY');
		const numberFirstDay = moment(`01-${ numberMonth + 1 }-${ numberYear }`, 'DD-MM-YY').isoWeekday();

		return (
			<Pressable
				style={[
					styles.item,
					numberDay === +key && styles.itemActive,
					{ width: dayWidth },
					key === '1' && { marginLeft: (numberFirstDay - 1) * (dayWidth + 5) }
				]}
				key={ key }
				onPress={ () => checkDay()
			}>
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
	const checkDay = () => {
		console.log('Chake');
	};

	return (
		<View style={ styles.calendar }>
			{ type === 'calendar' && <View style={ styles.header }>
				<View>
					<Text style={ styles.month }>{ parseLang.months[numberMonth].nameNom }</Text>
					<Text style={ styles.weekDay }>{ parseLang.week[numberWeekDay - 1].fullName }</Text>
				</View>
				<View style={ styles.control }>
					<Pressable style={ styles.button } onPress={ () => console.log('prev') }>
						<View style={ styles.arrowIcon }>
							{ arrowLeftIcon('#fff', .5) }
						</View>
					</Pressable>
					<Pressable style={ styles.button } onPress={ () => console.log('next') }>
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
		fontFamily: 'SFBold',
		fontSize: 20,
		lineHeight: 24,
		color: '#fff',
		letterSpacing: -.12,
		marginBottom: 5
	},
	weekDay: {
		fontFamily: 'SFReg',
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
		fontFamily: 'SFReg',
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
		fontFamily: 'SFMed',
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
