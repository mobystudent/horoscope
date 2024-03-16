import { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SettingsContext } from '../contexts/settings';
import moment from 'moment';

import * as zodiacIcons from '../icons/zodiac';

export default function MoonDetails() {
	const {
		settings: {
			currentMoonDay: {
				details
			}
		}
	} = useContext(SettingsContext);
	const blocks = {
		sunDay: 'Сегодня',
		moonDay: 'Лунный день',
		sunSign: 'Солнце',
		moonSign: 'Луна'
	};
	const zodiac = {
		aries: {
			namePrep: 'Овне',
		},
		taurus: {
			namePrep: 'Тельце',
		},
		gemini: {
			namePrep: 'Близнеце',
		},
		cancer: {
			namePrep: 'Раке',
		},
		leo: {
			namePrep: 'Льве',
		},
		virgo: {
			namePrep: 'Деве',
		},
		libra: {
			namePrep: 'Весах',
		},
		scorpio: {
			namePrep: 'Скорпионе',
		},
		sagittarius: {
			namePrep: 'Стрельце',
		},
		capricorn: {
			namePrep: 'Козероге',
		},
		aquarius: {
			namePrep: 'Водолее',
		},
		pisces: {
			namePrep: 'Рыбах',
		}
	};
	const monthsGenitive = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
	const infoDays = (name, obj) => {
		let textUpper = '';
		let textLower = '';

		if (name === 'sunDay') {
			const date = moment(obj.period, 'DD-MM-YY');

			textUpper = monthsGenitive[date.month()];
			textLower = date.year();
		} else {
			const parsePeriod = obj.period.split('-');

			textUpper = parsePeriod[0];
			textLower = parsePeriod[1];
		}

		return (
			<>
				<Text style={ styles.text }>{ textUpper }</Text>
				<Text style={ styles.text }>{ textLower }</Text>
			</>
		);
	};
	const detailsList = Object.keys(blocks).map((key) => {
		if (key === 'moonSign') return;

		const block = details[key];

		return (
			<View style={ styles.detailItem } key={ key }>
				<Text style={[ styles.title, styles.text ]}>{ blocks[key] }</Text>
				<View style={ styles.info }>
					{
						typeof block === 'object' ?
						<Text style={ styles.day }>{ block.day }</Text>
						: <View style={ styles.sign }>
							{ zodiacIcons[block]('#fff') }
						</View>
					}
					{
						typeof block === 'string' ?
						<Text style={ styles.text }>{ `В ${ zodiac[block].namePrep }` }</Text>
						: <View>
							{ infoDays(key, block) }
						</View>
					}
				</View>
			</View>
		);
	});

	return (
		<ScrollView contentContainerStyle={ styles.scroll } horizontal={ true }>
			<View style={ styles.details }>
				{ detailsList }
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scroll: {
		marginBottom: 15
	},
	details: {
		flexDirection: 'row',
		columnGap: 10
	},
	detailItem: {
		rowGap: 15,
		width: 'auto',
		padding: 15,
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	title: {
		textTransform: 'uppercase',
		opacity: .5
	},
	day: {
		// fontFamily: 'SFBold',
		fontSize: 34,
		lineHeight: 40,
		color: '#fff',
		letterSpacing: -.215
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 10
	},
	text: {
		// fontFamily: 'SFReg',
		fontSize: 12,
		lineHeight: 14,
		color: '#fff',
		letterSpacing: -.075
	},
	sign: {
		width: 40,
		height: 40
	}
});
