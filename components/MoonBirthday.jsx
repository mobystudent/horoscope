import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { SettingsContext } from '../contexts/settings';

import { arrowRightIcon } from './SvgSprite';

export default function MoonBirthday({ navigation }) {
	const { settings } = useContext(SettingsContext);
	const moonDay = {
		day: settings.currentDayMoon,
		headerTitle: 'Лунный день',
		symbol: 'единорог',
		title: 'Хороший день для занятия спорта',
		description: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).',
		period: {
			start: {
				time: '23:26',
				day: '15.07'
			},
			end: {
				time: '00:26',
				day: '15.07'
			}
		}
	};
	const moonPhase = {
		percent: 33,
		title: 'Убывающая луна',
		phase: '4-фаза',
		sign: 'libra'
	}

	return (
		<View style={ styles.content }>
			<Pressable style={ styles.block } onPress={ () => navigation.navigate('content', moonDay) }>
				<View style={ styles.dayWrap }>
					<Text style={ styles.day }>{ moonDay.day }</Text>
				</View>
				<View style={ styles.wrap }>
					<Text style={ styles.title }>{ moonDay.headerTitle }</Text>
					<View style={ styles.data }>
						<Text style={ styles.text }>{ moonDay.period.start.day }</Text>
						<Text style={ [ styles.text, styles.moonMark ] }>{ `${moonDay.period.start.time}-${moonDay.period.end.time}` }</Text>
						<Text style={ styles.text }>{ moonDay.period.end.day }</Text>
					</View>
				</View>
				<View style={ styles.iconWrap }>
					<View style={ styles.arrowRightIcon }>
						{ arrowRightIcon('#fff', .5) }
					</View>
				</View>
			</Pressable>
			<View style={ styles.block }>
				<View style={ styles.dayWrap }>
					<Text style={ styles.day }>{ moonPhase.percent }</Text>
				</View>
				<View style={ styles.wrap }>
					<Text style={ styles.title }>{ moonPhase.title }</Text>
					<Text style={ styles.text }>{ moonPhase.phase }</Text>
				</View>
				<View style={ styles.zodiac }>
				</View>
			</View>
		</View>
	);
};
// { svg[moonPhase.sign]('#fff', 1) }

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
		// fontFamily: 'SFMed',
		fontSize: 20,
		lineHeight: 26,
		color: '#fff',
	},
	wrap: {
		flex: 1,
	},
	title: {
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		letterSpacing: -.1,
		color: '#fff'
	},
	text: {
		// fontFamily: 'SFReg',
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
	zodiac: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
		height: 40
	}
});
