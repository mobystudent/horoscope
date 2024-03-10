import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';

export default function MoonInfo(props) {
	const {
		data = {}
	} = props;
	const [ activeTab, setActiveTab ] = useState('moon');
	const tabs = [
		{
			name: 'zodiac',
			text: 'Луна в Скорпионе'
		},
		{
			name: 'moon',
			text: 'Лунный день'
		},
		{
			name: 'planet',
			text: 'День Меркурия'
		}
	];
	const tabslist = tabs.map(({ name, text }) => {
		return (
			<Pressable style={[ styles.button, activeTab === name && styles.activeButton ]} key={ name } onPress={ () => setActiveTab(name) }>
				<Text style={[ styles.buttonText, activeTab === name && styles.activeButtonText ]}>{ text }</Text>
			</Pressable>
		);
	});

	return (
		<>
			<ScrollView contentContainerStyle={ styles.tabs } horizontal={ true }>
				{ tabslist }
			</ScrollView>
			<View style={ styles.block }>
				<Text style={ styles.symbol }>{ `Символ дня: ${data[activeTab].symbol}` }</Text>
				<Text style={ styles.title }>{ data[activeTab].title }</Text>
				<Text style={ styles.description }>{ data[activeTab].description }</Text>
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
		// fontFamily: 'SFMed',
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
		// fontFamily: 'SFBold',
		fontSize: 20,
		lineHeight: 24,
		marginBottom: 15
	},
	description: {
		color: '#fff',
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 24
	},
	symbol: {
		color: 'rgba(255, 255, 255, .5)',
		// fontFamily: 'SFReg',
		fontSize: 12,
		letterSpacing: -.075,
		textTransform: 'uppercase',
		marginBottom: 15
	}
});
