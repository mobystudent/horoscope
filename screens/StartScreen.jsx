import { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getCalendars } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../components/Container';
import { SvgXml } from 'react-native-svg';
import { SettingsContext } from '../contexts/settings';
import moment from 'moment';

import { moonIcons } from '../icons/moon';

export default function StartScreen({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ storagePerson, setStoragePerson ] = useState({});
	const [ storageNotesList, setStorageNotesList ] = useState({});
	const [ storageBirthdayMoon, setStorageBirthdayMoon ] = useState({});
	const [ months, setMonths ] = useState({});
	const [ moon, setMoon ] = useState({});
	const timezone = getCalendars()[0].timeZone;
	const time = 2000;
	const storagePersonData = async () => {
		try {
			const person = await AsyncStorage.getItem('person');

			if (person === null) {
				throw new Error('Данных о пользователе нет');
			}

			setStoragePerson(JSON.parse(person));
		} catch(error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка загрузки данных о пользователе',
					message: `Проблема с ответом из хранилища. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const storageNotesListData = async () => {
		try {
			const notesList = await AsyncStorage.getItem('notesList');

			if (notesList === null) {
				throw new Error('Данных о сохраненных заметках нет');
			}

			setStorageNotesList(JSON.parse(notesList));
		} catch(error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка загрузки сохраненных заметок',
					message: `Проблема с ответом из хранилища. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const storageBirthdayMoonData = async () => {
		try {
			const birthdayMoon = await AsyncStorage.getItem('birthdayMoon');

			if (birthdayMoon === null) {
				throw new Error('Данных о луне при рождении нет');
			}

			setStorageBirthdayMoon(JSON.parse(birthdayMoon));
		} catch(error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка загрузки данных о луне при рождении',
					message: `Проблема с ответом из хранилища. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const settingsStatus = useMemo(() => {
		return [storagePerson, storageNotesList, storageBirthdayMoon].every((object) => Object.keys(object).length);
	}, [storagePerson, storageNotesList, storageBirthdayMoon]);

	useEffect(() => {
		const loadServerData = async () => {
			try {
				const currentDate = moment().format('YYYY-MM-DD');
				const currentTime = moment().format('HH:mm');
				const lat = 56.946;
				const lng = 24.10589;

				fetch(`https://api-moon.digitalynx.org/api/moon/special/year?date=${ currentDate }`)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Не удалось получить данные о текущем лунном месяце');
						}

						return response.json();
					})
					.then((monthsData) => {
						if (!Object.keys(monthsData).length) {
							throw new Error(`Данных о текущем лунном месяце на сервере не обнаружено`);
						}

						setMonths(monthsData);

						return fetch(`https://api-moon.digitalynx.org/api/moon/special/day?date=${ currentDate }&time=${ currentTime }&lat=${ lat }&lng=${ lng }&tz=${ timezone }`);
					})
					.then((response) => {
						if (!response.ok) {
							throw new Error('Не удалось получить данные о текущем лунном дне');
						}

						return response.json();
					})
					.then((moonData) => {
						if (!Object.keys(moonData).length) {
							throw new Error(`Данных о текущем лунном дне на сервере не обнаружено`);
						}

						setMoon(moonData);
						storagePersonData();
						storageNotesListData();
						storageBirthdayMoonData();
					})
					.catch((error) => {
						setSettings({
							...settings,
							modal: {
								visible: true,
								status: 'error',
								title: 'Ошибка загрузки данных',
								message: `Проблема с ответом от сети. ${ error }, попробуйте перезагрузить приложение`
							}
						});
					});
			} catch (error) {
				setSettings({
					...settings,
					modal: {
						visible: true,
						status: 'error',
						title: 'Ошибка подключения к сети',
						message: `Не удалось подключиться к сети. ${ error }, попробуйте перезагрузить приложение`
					}
				});

				return;
			}
		};

		loadServerData();
	}, []);

	useEffect(() => {
		if (!settingsStatus) return;

		setSettings({
			...settings,
			person: storagePerson,
			notesList: storageNotesList,
			birthdayMoon: storageBirthdayMoon,
			currentMoonDay: moon,
			monthsRange: months,
			registered: true
		});

		setTimeout(() => {
			navigation.navigate('moon');
		}, time);
	}, [settingsStatus]);

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
		fontWeight: '700',
		fontSize: 24,
		lineHeight: 28
	},
	moonIcon: {
		alignItems: 'center',
		marginBottom: 30
	}
});
