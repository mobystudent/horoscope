import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import * as zodiac from '../icons/zodiac';

export default function MoonDetails(props) {
	const {
		data = {}
	} = props;
	const detailsList = data.slice(0, 3).map((detail) => {
		return (
			<View style={ styles.detailItem } key={ detail.title }>
				<Text style={[ styles.title, styles.text ]}>{ detail.title }</Text>
				<View style={ styles.info }>
					{
						detail.day ?
						<Text style={ styles.day }>{ detail.day }</Text>
						: <View style={ styles.sign }>
							{ zodiac[detail.sign]('#fff') }
						</View>
					}
					{
						detail.text ?
						<Text style={ styles.text }>{ detail.text }</Text>
						: <View>
							<Text style={ styles.text }>{ detail.period.start }</Text>
							<Text style={ styles.text }>{ detail.period.end }</Text>
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
		width: 160,
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
