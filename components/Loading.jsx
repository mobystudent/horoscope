import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Navigation from '../Navigation';

import { SettingsContext } from '../contexts/settings';

export default function Loading() {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ ready, setReady ] = useState(false);
	const [ firstScreen, setFirstScreen ] = useState('');

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

			const moonData = {
				phase: 'fullMoon',
				slogan: 'Свой стержень внутренний держи, алхимию души и пищи соверши',
				details: {
					sunDay: {
						day: '21',
						period: '02-09-23'
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
			const month = {
				'1': {
					moon: 'newMoon',
					sign: 'leo'
				},
				'2': {
					moon: 'fullMoon',
					sign: 'leo'
				},
				'3': {
					moon: 'lastQuarter',
					sign: 'leo'
				},
				'4': {
					moon: 'waningMoon',
					sign: 'leo'
				},
				'5': {
					moon: 'oldMoon',
					sign: 'leo'
				},
				'6': {
					moon: 'youngMoon',
					sign: 'leo'
				},
				'7': {
					moon: 'firstQuarter',
					sign: 'leo'
				},
				'8': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'9': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'10': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'11': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'12': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'13': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'14': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'15': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'16': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'17': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'18': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'19': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'20': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'21': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'22': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'23': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'24': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'25': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'26': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'27': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'28': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'29': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				'30': {
					moon: 'waxingMoon',
					sign: 'leo'
				},
				// '31': {
				// 	moon: 'waxingMoon',
				// 	sign: 'leo'
				// },
			}

			setFirstScreen(Boolean(storagePersonString) ? 'moon' : 'name');
			setSettings({
				...settings,
				person: storagePerson || {},
				notesList: storageNotesList || [],
				birthdayMoon: storageBirthdayMoon || {},
				currentMoonDay: moonData,
				currentMonth: month
			});
			setReady(true);

			await SplashScreen.hideAsync();
		};

		loadFonts();
	}, []);

	if (!ready) return;

	return <Navigation screen={ firstScreen } />;
};
