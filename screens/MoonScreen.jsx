import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Container from '../components/Container';
import Header from '../components/Header';
import MoonInfo from '../components/MoonInfo';
import MoonDetails from '../components/MoonDetails';
import MoonCalendar from '../components/MoonCalendar';
import { SettingsContext } from '../contexts/settings';
import moment from 'moment';

import lang from '../languages/lang_ru.json';

import { personIcon } from '../icons/elements';
import { moonIcons } from '../icons/moon';

export default function Moon({ navigation }) {
	const {
		settings: {
			currentMoonDay: {
				phase = '',
				slogan = '',
				details: {
					sunDay: {
						period = ''
					} = {}
				} = {}
			} = {}
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ activeTab, setActiveTab ] = useState('day');
	const parseLang = JSON.parse(JSON.stringify(lang));
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
		btnAction: 'add',
		type: 'note'
	};
	const getDate = () => {
		const date = moment(period, 'YYYY-MM-DD');

		return `${ date.date() } ${ parseLang.months[date.month()].nameGen }`
	};
	const title = activeTab === "day" ? parseLang.phase[phase].title : 'Календарь';
	const subtitle = activeTab === "day" ? parseLang.phase[phase].type : getDate();
	const tabslist = Object.keys(tabs).map((key) => {
		return (
			<Pressable style={[ styles.button, activeTab === key && styles.activeButton ]} key={ key } onPress={ () => setActiveTab(key) }>
				<Text style={[ styles.buttonText, activeTab === key && styles.activeButtonText ]}>{ tabs[key] }</Text>
			</Pressable>
		);
	});

	useEffect(() => {
		setSettings({
			...settings,
			background: phase
		});
	}, []);

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
						<Text style={ styles.sloganText }>{ slogan }</Text>
					</View>
					: <View style={ styles.moonPhase }>
						<SvgXml xml={ moonIcons(phase) } width={ 48 } height={ 48 } />
						<View style={ styles.moonWrap }>
							<Text style={ styles.moonTitle }>{ parseLang.phase[phase].title }</Text>
							<Text style={ styles.moonText }>{ parseLang.phase[phase].type }</Text>
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
		fontWeight: '400',
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
	moonPhase: {
		flexDirection: 'row',
		columnGap: 15,
		marginBottom: 15
	},
	// moonIcon: {
	// 	width: 48,
	// 	height: 48
	// },
	moonTitle: {
		fontWeight: '700',
		fontSize: 20,
		lineHeight: 24,
		color: '#fff',
		letterSpacing: -.125,
		marginBottom: 5
	},
	moonText: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
		letterSpacing: -.125,
		opacity: .5
	}
});
