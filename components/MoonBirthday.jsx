import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { SettingsContext } from '../contexts/settings';

import lang from '../languages/lang_ru.json';

import { arrowRightIcon } from '../icons/elements';
import { zodiacIcons } from '../icons/zodiac';

export default function MoonBirthday({ navigation }) {
	const {
		settings: {
			birthdayMoon: {
				phase,
				details: {
					moonDay,
					moonSign
				},
				content
			}
		},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const parseLang = JSON.parse(JSON.stringify(lang));
	const width = 40;
	const strokeWidth = 2;
	const radius = (width - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - moonDay.percent / 100 * circumference;
	const openContent = () => {
		setSettings({
			...settings,
			displayDocument: {
				header: `${ moonDay.day }-й лунный день`,
				...content
			}
		});

		navigation.navigate('content');
	};
	const setPeriod = () => {
		return (
			<View style={ styles.data }>
				<Text style={ styles.text }>{ moonDay.period[0].date }</Text>
				<Text style={ [ styles.text, styles.moonMark ] }>{ `${ moonDay.period[0].time } - ${ moonDay.period[1].time }` }</Text>
				<Text style={ styles.text }>{ moonDay.period[1].date }</Text>
			</View>
		);
	};

	return (
		<View style={ styles.content }>
			<Pressable style={ styles.block } onPress={ () => openContent() }>
				<View style={ styles.dayWrap }>
					<Text style={ styles.day }>{ moonDay.day }</Text>
				</View>
				<View style={ styles.wrap }>
					<Text style={ styles.title }>Лунный день</Text>
					{ setPeriod() }
				</View>
				<View style={ styles.iconWrap }>
					<View style={ styles.arrowRightIcon }>
						{ arrowRightIcon('#fff', .5) }
					</View>
				</View>
			</Pressable>
			<View style={ styles.block }>
				<View style={ styles.dayWrap }>
					<Svg width={ width } height={ width } style={ styles.progress }>
						<Circle
							cx={ width/2 }
							cy={ width/2 }
							r={ radius }
							strokeWidth={ strokeWidth }
							strokeDasharray={ `${circumference} ${circumference}` }
							strokeDashoffset={ strokeDashoffset }
							style={ styles.circleFill }
						/>
					</Svg>
					<Text style={ styles.counter }>{ `${ moonDay.percent }%` }</Text>
				</View>
				<View style={ styles.wrap }>
					<Text style={ styles.title }>{ parseLang.phase[phase].title }</Text>
					<Text style={ styles.text }>{ parseLang.phase[phase].type }</Text>
				</View>
				<View style={ styles.zodiacIcon }>
					{ zodiacIcons('#fff')[moonSign] }
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	content: {
		rowGap: 10
	},
	dayWrap: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
		borderRadius: 40/2,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	day: {
		fontWeight: '500',
		fontSize: 20,
		lineHeight: 26,
		color: '#fff',
	},
	wrap: {
		flex: 1,
	},
	title: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		letterSpacing: -.1,
		color: '#fff'
	},
	text: {
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 20,
		color: 'rgba(255, 255, 255, .5)'
	},
	data: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		columnGap: 5
	},
	moonMark: {
		color: '#fff'
	},
	block: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 15,
		paddingHorizontal: 15,
		paddingVertical: 12,
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	iconWrap: {
		justifyContent: 'center',
		width: 16
	},
	arrowRightIcon: {
		width: 9,
		height: 14
	},
	zodiacIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
		height: 40
	},
	progress: {
		marginLeft: 'auto',
		marginRight: 'auto',
		transform: [{ rotate: '-90deg' }],
	},
	circleFill: {
		stroke: '#fff',
		fill: 'none'
	},
	counter: {
		position: 'absolute',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 14,
		color: '#fff'
	}
});
