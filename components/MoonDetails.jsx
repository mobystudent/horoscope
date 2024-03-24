import { useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SettingsContext } from '../contexts/settings';
import moment from 'moment';

import lang from '../languages/lang_ru.json';

import { zodiacIcons } from '../icons/zodiac';
import { borderIcon } from '../icons/elements';
import { moonIcons } from '../icons/moon';

export default function MoonDetails({ type }) {
	const {
		settings: {
			currentMoonDay: {
				phase = '',
				details = {}
			} = {}
		} = {}
	} = useContext(SettingsContext);
	const [ blockSize, setBlockSize ] = useState(0);
	const parseLang = JSON.parse(JSON.stringify(lang));
	const blocks = {
		sunDay: 'Сегодня',
		moonDay: 'Лунный день',
		sunSign: 'Солнце',
		moonSign: 'Луна'
	};
	const infoDays = (name, obj) => {
		let textUpper = '';
		let textLower = '';

		if (name === 'sunDay') {
			const date = moment(obj.period, 'DD-MM-YY');

			textUpper = parseLang.months[date.month()].nameGen;
			textLower = date.year();
		} else {
			const parsePeriod = obj.period.split('-');

			if (type === 'calendar') {
				textUpper = `С ${parsePeriod[0]}`;
				textLower = `до ${parsePeriod[1]}`;
			} else {
				const periodStart = parsePeriod[0];
				const lastIndent = periodStart.lastIndexOf(' ');

				textUpper = periodStart.slice(0, lastIndent);
				textLower = periodStart.slice(lastIndent + 1);;
			}
		}

		return (
			<>
				<Text style={ styles.text }>{ textUpper }</Text>
				<Text style={ styles.text }>{ textLower }</Text>
			</>
		);
	};
	const detailsSize = ({ nativeEvent: { layout } }) => {
		const width = (layout.width - 10) / 2;

		setBlockSize({
			width,
			height: (134 * width) / 167
		});
	};
	const detailsList = Object.keys(blocks).map((key, i) => {
		if (type === 'calendar' && key === 'moonSign') return;

		const block = details[key];

		return (
			<View style={
						type === 'calendar'
						? styles.detailItem
						: [
							styles.detailsBlock,
							i % 2 && styles.detailItemPair,
							{
								width: blockSize.width,
								height: blockSize.height
							}
						]
					}
					key={ key }
				>
				<Text style={[ styles.title, styles.text ]}>{ blocks[key] }</Text>
				<View style={
						type === 'calendar'
						? styles.infoRow
						: [
							styles.infoColumn,
							i % 2 && styles.infoColumnPair
						]
					}>
					{
						typeof block === 'object'
						? <>
							<Text style={ styles.day }>{ block.day }</Text>
							<View style={ i % 2 && styles.textWrap }>
								{ infoDays(key, block) }
							</View>
						</>
						: <>
							<View style={ styles.sign }>
								{ zodiacIcons('#fff')[block] }
							</View>
							<Text style={ styles.text }>{ `В ${ parseLang.zodiac[block].namePrep }` }</Text>
						</>
					}
				</View>
				{
					type === 'day' && <View style={[ styles.borderIcon, { width: blockSize.width, height: blockSize.height } ]}>
						{ borderIcon('#fff', .1)[i] }
					</View>
				}
			</View>
		);
	});
	const moonIconPosition = {
		top: blockSize.height ? blockSize.height - 165 / 2 + 5 : 0,
		left: blockSize.width ? blockSize.width - 165 / 2 + 5 : 0
	};

	return (
		type === 'calendar' ? (
			<ScrollView contentContainerStyle={ styles.scroll } horizontal={ true }>
				<View style={ styles.details }>
					{ detailsList }
				</View>
			</ScrollView>
		) : (
			<View style={ styles.square }>
				<View style={ styles.details } onLayout={ (event) => detailsSize(event) }>
					{ detailsList }
					{
						type === 'day' && <View style={[ styles.moonIcon, { top: moonIconPosition.top, left: moonIconPosition.left } ]}>
							<SvgXml xml={ moonIcons(phase) } width={ 165 } height={ 165 } />
						</View>
					}
				</View>
			</View>
		)
	);
}

const styles = StyleSheet.create({
	scroll: {
		marginBottom: 15
	},
	square: {
		marginBottom: 15
	},
	details: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10
	},
	detailsBlock: {
		rowGap: 15,
		padding: 15
	},
	detailItem: {
		rowGap: 15,
		width: 'auto',
		padding: 15,
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	detailItemPair: {
		alignItems: 'flex-end'
	},
	title: {
		textTransform: 'uppercase',
		opacity: .5
	},
	day: {
		fontFamily: 'SFBold',
		fontSize: 34,
		lineHeight: 40,
		color: '#fff',
		letterSpacing: -.215
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 10
	},
	infoColumn: {
		flex: 1,
		justifyContent: 'space-between'
	},
	infoColumnPair: {
		alignItems: 'flex-end'
	},
	text: {
		fontFamily: 'SFReg',
		fontSize: 12,
		lineHeight: 14,
		color: '#fff',
		letterSpacing: -.075
	},
	textWrap: {
		alignItems: 'flex-end'
	},
	sign: {
		width: 40,
		height: 40
	},
	borderIcon: {
		position: 'absolute'
	},
	moonIcon: {
		position: 'absolute'
	}
});
