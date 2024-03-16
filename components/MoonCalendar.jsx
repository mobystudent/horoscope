import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SettingsContext } from '../contexts/settings';
import moment from 'moment';

import lang from '../languages/lang_ru.json';

import { arrowRightIcon, arrowLeftIcon } from '../icons/elements';
import * as zodiac from '../icons/zodiac';
import * as phase from '../icons/phase';

export default function MoonCalendar() {
	const {
		settings: {
			currentMoonDay: {
				details: {
					sunDay: {
						period
					}
				}
			}
		}
	} = useContext(SettingsContext);
	const [ dayWidth, setDayWidth ] = useState(0);
	const parseLang = JSON.parse(JSON.stringify(lang));
	const date = moment(period, 'DD-MM-YY');
	const numberDay = date.date();
	const numberWeekDay = date.isoWeekday();
	const numberMonth = date.month();
	const days = [
		{
			number: '1',
			moon: 'newMoon',
			sign: 'leo'
		},
		{
			number: '2',
			moon: 'fullMoon',
			sign: 'leo'
		},
		{
			number: '3',
			moon: 'lastQuarter',
			sign: 'leo'
		},
		{
			number: '4',
			moon: 'waningMoon',
			sign: 'leo'
		},
		{
			number: '5',
			moon: 'oldMoon',
			sign: 'leo'
		},
		{
			number: '6',
			moon: 'youngMoon',
			sign: 'leo'
		},
		{
			number: '7',
			moon: 'firstQuarter',
			sign: 'leo'
		},
		{
			number: '8',
			moon: 'waxingMoon',
			sign: 'leo'
		},
	];
	const calendarWidth = ({ nativeEvent: { layout } }) => {
		const columnGap = 5;
		const bodyWidth = layout.width - columnGap*6;

		setDayWidth(bodyWidth / 7);
	};
	const nameDays = parseLang.week.map(({ cropName }) => {
		return <Text style={[ styles.day, { width: dayWidth } ]} key={ cropName }>{ cropName }</Text>;
	});
	const monthArray = days.map(({ number, moon, sign }) => {
		return (
			<Pressable
				style={[
					styles.item,
					numberDay === number && styles.itemActive,
					{ width: dayWidth },
					number === '1' && { marginLeft: (numberWeekDay - 1) * (dayWidth + 5) }
				]}
				key={ number }
				onPress={ () => checkDay()
			}>
				<Text style={ styles.number }>{ number }</Text>
				<View style={ styles.wrap }>
					<View style={ styles.itemIcon }>
					{ phase[moon]('#fff') }
					</View>
					<View style={ styles.itemIcon }>
						{ zodiac[sign]('#fff') }
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
			<View style={ styles.header }>
				<View>
					<Text style={ styles.month }>{ parseLang.months[numberMonth].nameNom }</Text>
					<Text style={ styles.weekDay }>{ parseLang.week[numberWeekDay].fullName }</Text>
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
			</View>
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
		// fontFamily: 'SFBold',
		fontSize: 20,
		lineHeight: 24,
		color: '#fff',
		letterSpacing: -.12,
		marginBottom: 5
	},
	weekDay: {
		// fontFamily: 'SFReg',
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
		// fontFamily: 'SFReg',
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
		// fontFamily: 'SFMed',
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
