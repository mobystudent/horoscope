import * as React from 'react';
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';

import { arrowSvg } from './SvgSprite';

export default function MoonBirthday({ navigation }) {
	const moonDay = {
		day: 29,
		title: 'Лунный день',
		symbol: 'единорог',
		startPeriod: {
			time: '23:26',
			day: '15.07'
		},
		endPeriod: {
			time: '00:26',
			day: '15.07'
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
			<Pressable style={ styles.block } onPress={ () => navigation.navigate('createNote', moonDay.symbol) }>
				<View style={ styles.dayWrap }>
					<Text style={ styles.day }>{ moonDay.day }</Text>
				</View>
				<View style={ styles.wrap }>
					<Text style={ styles.title }>{ moonDay.title }</Text>
					<View style={ styles.data }>
						<Text style={ styles.text }>{ moonDay.startPeriod.day }</Text>
						<Text style={ [ styles.text, styles.moonMark ] }>{ `${moonDay.startPeriod.time}-${moonDay.endPeriod.time}` }</Text>
						<Text style={ styles.text }>{ moonDay.endPeriod.day }</Text>
					</View>
				</View>
				<View style={ styles.svg }>
					{ arrowSvg('#fff', .5) }
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
				<Image
					style={ styles.image }
					source={ require('../assets/images/libra.png') }
				/>
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
		color: 'rgba(255, 255, 255, .5)'
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
	image: {
		width: 32,
		height: 32
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
	svg: {
		alignItems: 'center',
		width: 32
	}
});
