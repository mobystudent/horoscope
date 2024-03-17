import { useContext } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import MoonInfo from '../components/MoonInfo';
import MoonDetails from '../components/MoonDetails';
import MoonCalendar from '../components/MoonCalendar';
import { SettingsContext } from '../contexts/settings';


import fullMoon from '../assets/images/fullMoon.png';

export default function Calendar({ navigation }) {
	const { settings } = useContext(SettingsContext);
	const title = 'Календарь';
	const subtitle = '21 сентября';
	const moonPhase = {
		title: 'Растущая луна',
		phase: 'I Фаза',
		image: fullMoon
	}
	const leftButton = {
		screenLink: 'account',
		type: 'account'
	};
	const rightButton = {
		screenLink: 'createNote',
		type: 'note',
		// params: { noteToday, page: 'moon' }
	};

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
				<View style={ styles.period }>
					<Pressable style={ styles.button } onPress={ () => navigation.navigate('moon') }>
						<Text style={ styles.buttonText }>Сегодня</Text>
					</Pressable>
					<View style={ styles.button }>
						<Text style={ styles.buttonText }>Календарь</Text>
					</View>
				</View>
				<MoonCalendar type="calendar" />
				<View style={ styles.moonPhase }>
					<View style={ styles.moonIcon }>
						<Image style={ styles.imageMoon } source={ moonPhase.image } />
					</View>
					<View style={ styles.moonWrap }>
						<Text style={ styles.moonTitle }>{ moonPhase.title }</Text>
						<Text style={ styles.moonText }>{ moonPhase.phase }</Text>
					</View>
				</View>
				<MoonDetails type="calendar" />
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
	period: {
		flexDirection: 'row',
		marginBottom: 15
	},
	button: {
		flexGrow: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	buttonText: {
		// fontFamily: 'SFMed',
		fontSize: 14,
		lineHeight: 16,
		color: '#fff',
		textAlign: 'center'
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
