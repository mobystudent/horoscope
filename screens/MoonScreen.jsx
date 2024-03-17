import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import MoonInfo from '../components/MoonInfo';
import MoonDetails from '../components/MoonDetails';
import MoonCalendar from '../components/MoonCalendar';
import { SettingsContext } from '../contexts/settings';

import { personIcon } from '../icons/elements';

import fullMoon from '../assets/images/fullMoon.png';

export default function Moon({ navigation }) {
	const { settings } = useContext(SettingsContext);
	const [ activeTab, setActiveTab ] = useState('day');
	const title = activeTab === "day" ? 'Растущая луна' : 'Календарь';
	const subtitle = activeTab === "day" ? 'I Фаза' : '21 сентября';
	const noteToday = settings.notesList.filter((note) => note.day === settings.currentDayMoon);
	const moonPhase = {
		title: 'Растущая луна',
		phase: 'I Фаза',
		image: fullMoon
	};
	const tabs = {
		day: 'Сегодня',
		calendar: 'Календарь'
	};
	const leftButton = {
		screenLink: 'account',
		type: 'account'
	};
	const rightButton = {
		screenLink: 'createNote',
		type: 'note',
		// params: { noteToday, page: 'moon' }
	};
	const tabslist = Object.keys(tabs).map((key) => {
		return (
			<Pressable style={[ styles.button, activeTab === key && styles.activeButton ]} key={ key } onPress={ () => setActiveTab(key) }>
				<Text style={[ styles.buttonText, activeTab === key && styles.activeButtonText ]}>{ tabs[key] }</Text>
			</Pressable>
		);
	});

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ title }
				subtitle={ subtitle }
				leftButton={ leftButton }
				rightButton={ rightButton }
			/>
			<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
				<View style={ styles.tabs }>
					{ tabslist }
				</View>
				<MoonCalendar type={ activeTab } />
				{ activeTab === "day"
					? <View style={ styles.slogan }>
						<View style={ styles.personIcon }>
							{ personIcon('#fff', .5) }
						</View>
						<Text style={ styles.sloganText }>{ settings.currentMoonDay.slogan }</Text>
					</View>
					: <View style={ styles.moonPhase }>
						<View style={ styles.moonIcon }>
							<Image style={ styles.imageMoon } source={ moonPhase.image } />
						</View>
						<View style={ styles.moonWrap }>
							<Text style={ styles.moonTitle }>{ moonPhase.title }</Text>
							<Text style={ styles.moonText }>{ moonPhase.phase }</Text>
						</View>
					</View>
				}
				<MoonDetails type={ activeTab } />
				<MoonInfo />
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		paddingTop: 15,
		paddingBottom: 45
	},
	slogan: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginBottom: 30,
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	personIcon: {
		width: 28,
		height: 25
	},
	sloganText: {
		flex: 1,
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
		letterSpacing: -.1
	},
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
	moonPhase: {
		flexDirection: 'row',
		columnGap: 15,
		marginBottom: 15
	},
	moonIcon: {
		width: 48,
		height: 48
	},
	imageMoon: {
		width: '100%',
		height: '100%'
	},
	moonTitle: {
		// fontFamily: 'SFBold',
		fontSize: 20,
		lineHeight: 24,
		color: '#fff',
		letterSpacing: -.125,
		marginBottom: 5
	},
	moonText: {
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
		letterSpacing: -.125,
		opacity: .5
	}
});
