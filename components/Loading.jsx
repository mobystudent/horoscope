import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import moment from 'moment';
import Navigation from '../Navigation';

import { SettingsContext } from '../contexts/settings';

export default function Loading() {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ readyData, setReadyData ] = useState(false);
	const [ serverData, setServerData ] = useState(false);
	const [ firstScreen, setFirstScreen ] = useState('');
	const [ months, setMonths ] = useState({});
	const [ moon, setMoon ] = useState({});

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
			await Font.loadAsync({
				'SFBold': require('../assets/fonts/SFProDisplay-Bold.ttf'),
				'SFMed': require('../assets/fonts/SFProDisplay-Medium.ttf'),
				'SFReg': require('../assets/fonts/SFProDisplay-Regular.ttf'),
				'SFSbold': require('../assets/fonts/SFProDisplay-Semibold.ttf')
			});

			const storagePersonString = await AsyncStorage.getItem('person');
			const storageNotesString = await AsyncStorage.getItem('notesArray');
			const storageBirthdayString = await AsyncStorage.getItem('birthdayMoon');
			const storagePerson = JSON.parse(storagePersonString);
			const storageNotesList = JSON.parse(storageNotesString);
			const storageBirthdayMoon = JSON.parse(storageBirthdayString);

			setFirstScreen(Boolean(storagePersonString) ? 'moon' : 'name');
			setSettings({
				...settings,
				person: storagePerson || {},
				notesList: storageNotesList || [],
				birthdayMoon: storageBirthdayMoon || {},
				currentMoonDay: moon,
				monthsRange: months,
				background: moon.phase
			});
			setReadyData(true);
			await SplashScreen.hideAsync();
		};

		loadData();
	}, [serverData]);

	if (!readyData) return;

	return <Navigation screen={ firstScreen } />;
};
