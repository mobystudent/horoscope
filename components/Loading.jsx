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
			const storagePerson = JSON.parse(storagePersonString);
			const storageNotesList = JSON.parse(storageNotesString);

			const moonData = {
				moon: {
					title: 'Растущая луна',
					phase: 'I Фаза',
				},
				slogan: 'Свой стержень внутренний держи, алхимию души и пищи соверши',
				info: [
					{
						title: 'Сегодня',
						day: '21',
						text: 'Сентября 2023'
					},
					{
						title: 'Лунный день',
						day: '5',
						text: 'С 07:53 до 23:03'
					},
					{
						title: 'Солнце',
						sign: 'cancer',
						text: 'В Раке'
					},
					{
						title: 'Луна',
						sign: 'virgo',
						text: 'В Деве'
					}
				],
				content: [
					{
						name: 'zodiac',
						title: 'Луна в Деве',
						block: {
							symbol: 'единорог',
							title: 'Хороший день для занятия спорта',
							description: 'ЗНАК ЗОДИАКА Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
						}
					},
					{
						name: 'moon',
						title: 'Лунный день',
						block: {
							symbol: 'единорог',
							title: 'Хороший день для занятия программирования',
							description: 'ЛУНА Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
						}
					},
					{
						name: 'planet',
						title: 'День Венеры',
						block: {
							symbol: 'единорог',
							title: 'Хороший день для занятия пением',
							description: 'ПЛАНЕТА Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
						}
					}
				]
			};

			setFirstScreen(Boolean(storagePersonString) ? 'calendar' : 'name');
			setSettings({
				...settings,
				person: storagePerson || {},
				notesList: storageNotesList || [],
				currentMoonDay: moonData
			});
			setReady(true);

			await SplashScreen.hideAsync();
		};

		loadFonts();
	}, []);

	if (!ready) return;

	return <Navigation screen={ firstScreen } />;
};
