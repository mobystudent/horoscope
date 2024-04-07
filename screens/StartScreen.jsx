import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import Container from '../components/Container';
import { SvgXml } from 'react-native-svg';
import { SettingsContext } from '../contexts/settings';
import moment from 'moment';

import { moonIcons } from '../icons/moon';

export default function StartScreen({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ readyData, setReadyData ] = useState(false);
	const [ serverData, setServerData ] = useState(false);
	const [ months, setMonths ] = useState({});
	const [ moon, setMoon ] = useState({});
	const time = 2000;

	useEffect(() => {
		if (!readyData) return;

		setTimeout(() => {
			navigation.navigate('moon');
		}, time);
	}, [readyData]);

	useEffect(() => {
		const currentDate = moment().format('YYYY-MM-DD');

		fetch(`https://api-moon.digitalynx.org/api/moon/special/year?date=${ currentDate }`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok. Getting months failed');
				}

				return response.json();
			})
			.then((monthsData) => {
				setMonths(monthsData);

				return fetch(`https://api-moon.digitalynx.org/api/moon/special/day?date=${ currentDate }`);
			})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok. Getting moon day failed');
				}

				return response.json();
			})
			.then((moonData) => {
				setMoon(moonData);
				setServerData(true);
			})
			.catch((error) => {
				console.error('There was a problem with your fetch operation:', error);
			});
	}, []);

	useEffect(() => {
		if (!serverData) return;

		const loadData = async () => {
			await SplashScreen.preventAutoHideAsync();

			const storagePersonString = await AsyncStorage.getItem('person');
			const storageNotesString = await AsyncStorage.getItem('notesArray');
			const storageBirthdayString = await AsyncStorage.getItem('birthdayMoon');
			const storagePerson = JSON.parse(storagePersonString);
			const storageNotesList = JSON.parse(storageNotesString);
			const storageBirthdayMoon = JSON.parse(storageBirthdayString);

			setSettings({
				...settings,
				person: storagePerson || {},
				notesList: storageNotesList || [],
				birthdayMoon: storageBirthdayMoon || {},
				currentMoonDay: moon,
				monthsRange: months
			});

			await SplashScreen.hideAsync();
			setReadyData(true);
		};

		loadData();
	}, [serverData]);

	return (
		<Container>
			<View style={ styles.body }>
				<View style={ styles.moonIcon }>
					<SvgXml xml={ moonIcons('new') } width={ 265 } height={ 265 } />
				</View>
				<Text style={ styles.title }>Загрузка данных...</Text>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		marginBottom: 35,
		justifyContent: 'center'
	},
	title: {
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'SFBold',
		fontSize: 24,
		lineHeight: 28
	},
	moonIcon: {
		alignItems: 'center',
		marginBottom: 30
	}
});
