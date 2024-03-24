import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import moment from 'moment';
import Navigation from '../Navigation';

import { SettingsContext } from '../contexts/settings';

export default function Loading() {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ ready, setReady ] = useState(false);
	const [ firstScreen, setFirstScreen ] = useState('');
	const [ month, setMonth ] = useState({});

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
			const storageBirthdayString = await AsyncStorage.getItem('birthdayMoon');
			const storagePerson = JSON.parse(storagePersonString);
			const storageNotesList = JSON.parse(storageNotesString);
			const storageBirthdayMoon = JSON.parse(storageBirthdayString);
			const currentDate = moment().format('YYYY-DD-MM');

			console.log('currentDate =================');
			console.log(currentDate);
			console.log('currentDate =================');

			const moonData = {
				phase: 'fullMoon',
				slogan: 'Свой стержень внутренний держи, алхимию души и пищи соверши',
				details: {
					sunDay: {
						day: '21',
						period: '24-03-24'
					},
					moonDay: {
						day: '5',
						period: '01:53 20.05-23:03 21.05'
					},
					sunSign: 'cancer',
					moonSign: 'virgo'
				},
				content: {
					zodiac: {
						title: 'Хороший день для занятия спорта',
						description: 'ЗНАК ЗОДИАКА Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
					},
					moon: {
						symbol: 'единорог',
						title: 'Хороший день для занятия программирования',
						description: 'ЛУНА Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
					},
					planet: {
						name: 'Венеры',
						title: 'Хороший день для занятия пением',
						description: 'ПЛАНЕТА Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
					}
				}
			};

			fetch(`https://api-moon.digitalynx.org/api/moon/special/month?date=${ currentDate }`)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}

					return response.json();
				})
				.then((data) => {
					setMonth(data);
					// const sortedKeys = Object.entries(month)
					// 	.sort((a, b) => a[0] - b[0]);
					// console.log('data ///////////////////////////');
					// console.log( Object.fromEntries(sortedKeys));
					// console.log(data);
					// console.log('data ///////////////////////////');
					// setMonth(data);
					setFirstScreen(Boolean(storagePersonString) ? 'moon' : 'name');
					setSettings({
						...settings,
						person: storagePerson || {},
						notesList: storageNotesList || [],
						birthdayMoon: storageBirthdayMoon || {},
						currentMoonDay: moonData,
						currentMonth: month
					});
					console.log('settings --------------------------------');
					console.log(settings);
					console.log('settings --------------------------------');
					setReady(true);
					SplashScreen.hideAsync();
				})
				.catch(error => {
					console.error('There was a problem with your fetch operation:', error);
				});

			// setFirstScreen(Boolean(storagePersonString) ? 'moon' : 'name');
			// setSettings({
			// 	...settings,
			// 	person: storagePerson || {},
			// 	notesList: storageNotesList || [],
			// 	birthdayMoon: storageBirthdayMoon || {},
			// 	currentMoonDay: moonData
			// });
			// console.log(statusRequest);
			// if (ready) {
			// 	// setReady(true);
			// 	console.log('READY');
			// 	await SplashScreen.hideAsync();
			// }
		};

		loadFonts();
	}, []);

	if (!ready) return;

	return <Navigation screen={ firstScreen } />;
};
