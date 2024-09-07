import { useState, useMemo, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { SettingsContext } from '../contexts/settings';
import moment from 'moment';

import lang from '../languages/lang_ru.json';

import { zodiacIcons } from '../icons/zodiac';
import { borderIcon } from '../icons/elements';
import cloudImage from '../assets/cloud.png';

export default function MoonDetails({ type }) {
	const {
		settings: {
			currentMoonDay: {
				phase = '',
				details = {}
			} = {},
			moonImagesList = {}
		} = {}
	} = useContext(SettingsContext);
	const [ blockSize, setBlockSize ] = useState({});
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
			const date = moment(obj.date, 'YYYY-MM-DD');

			textUpper = parseLang.months[date.month()].nameGen;
			textLower = date.year();
		} else {
			textUpper = `С ${ obj.period[0].time }`;
			textLower = `до ${ obj.period[1].time }`;
		}

		return (
			<>
				<Text style={ styles.text }>{ textUpper }</Text>
				<Text style={ styles.text }>{ textLower }</Text>
			</>
		);
	};
	const detailsSize = ({ nativeEvent: { layout } }) => {
		const width = (Math.floor(layout.width) - 10) / 2;

		setBlockSize({
			width,
			height: Math.floor((134 * width) / 167)
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
	const moonImage = useMemo(() => {
		if (!Object.keys(blockSize).length) return;

		return (
			<View style={[
				styles.moonWrap,
				{
					top: blockSize.height - ( blockSize.width + 5 ) / 2 + 5,
					left: blockSize.width - ( blockSize.width + 5 ) / 2 + 5,
					width: blockSize.width + 5,
					height: blockSize.width + 5
				}
			]}>
				<Image source={ moonImagesList[phase] } style={ styles.moonImage } />
				<Image
					source={ cloudImage }
					style={[
						styles.cloudImage,
						{
							width: blockSize.width + blockSize.width / 2 + 5,
							height: blockSize.height + blockSize.width / 2 + 5
						}
					]}
				/>
			</View>
		);
	}, [blockSize, phase]);

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
						type === 'day' && moonImage
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
		fontWeight: '700',
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
		fontWeight: '400',
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
	moonWrap: {
		position: 'absolute'
	},
	moonImage: {
		width: '100%',
		height: '100%'
	},
	cloudImage: {
		position: 'absolute',
		top: -25,
		left: -40,
		zIndex: 4
	}
});
