import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { SettingsContext } from '../contexts/settings';

import lang from '../languages/lang_ru.json';

export default function MoonInfo() {
	const {
		settings: {
			currentMoonDay: {
				details: {
					moonSign
				},
				content
			}
		}
	} = useContext(SettingsContext);
	const [ activeTab, setActiveTab ] = useState('moon');
	const parseLang = JSON.parse(JSON.stringify(lang));
	const blocks = {
		zodiac: `Луна в ${ parseLang.zodiac[moonSign].namePrep }`,
		moon: 'Лунный день',
		planet: `День ${ content.planet.name }`
	};
	const tabslist = Object.keys(blocks).map((key) => {
		return (
			<Pressable style={[ styles.button, activeTab === key && styles.activeButton ]} key={ key } onPress={ () => setActiveTab(key) }>
				<Text style={[ styles.buttonText, activeTab === key && styles.activeButtonText ]}>{ blocks[key] }</Text>
			</Pressable>
		);
	});

	return (
		<>
			<ScrollView contentContainerStyle={ styles.tabs } horizontal={ true }>
				{ tabslist }
			</ScrollView>
			<View style={ styles.block }>
				{ 'symbol' in content[activeTab] && <Text style={ styles.symbol }>{ `Символ дня: ${ content[activeTab].symbol }` }</Text> }
				<Text style={ styles.title }>{ content[activeTab].title }</Text>
				<Text style={ styles.description }>{ content[activeTab].description }</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	tabs: {
		flexDirection: 'row',
		marginBottom: 15
	},
	button: {
		flexGrow: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 16
	},
	activeButton: {
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	buttonText: {
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 16,
		color: '#fff',
		textAlign: 'center',
		opacity: .5
	},
	activeButtonText: {
		opacity: 1
	},
	block: {
		padding: 15,
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	title: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 20,
		lineHeight: 24,
		marginBottom: 15
	},
	description: {
		color: '#fff',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 24
	},
	symbol: {
		color: 'rgba(255, 255, 255, .5)',
		fontWeight: '400',
		fontSize: 12,
		letterSpacing: -.075,
		textTransform: 'uppercase',
		marginBottom: 15
	}
});
