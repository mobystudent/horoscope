import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { SettingsContext } from '../contexts/settings';

export default function Loading() {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ ready, setReady ] = useState(false);

	useEffect(() => {
		const loadFonts = async () => {
			await SplashScreen.preventAutoHideAsync();
			await Font.loadAsync({
				'SFBold': require('../assets/fonts/SFProDisplay-Bold.ttf'),
				'SFMed': require('../assets/fonts/SFProDisplay-Medium.ttf'),
				'SFReg': require('../assets/fonts/SFProDisplay-Regular.ttf'),
				'SFSbold': require('../assets/fonts/SFProDisplay-Semibold.ttf')
			});

			const storagePersonString = await AsyncStorage.getItem('person');
			const storageNotesString = await AsyncStorage.getItem('notesArray');
			const storagePerson = JSON.parse(storagePersonString);
			const storageNotesList = JSON.parse(storageNotesString);

			setSettings({
				...settings,
				// person: storagePerson,
				notesList: storageNotesList
			});

			setReady(true);
			console.log('storageNotesList +++++++++++++++++++++++++++++++++++++');
			console.log(storageNotesList);
			console.log(storagePerson);
			console.log('storageNotesListy +++++++++++++++++++++++++++++++++++++');
			// if (ready) {
				await SplashScreen.hideAsync();
			// }
		};

		loadFonts();
	}, []);
};
