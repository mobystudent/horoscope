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
	const [ storageBasic, setStorageBasic ] = useState({});
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
	const storageBasicData = async () => {
		try {
			const basic = await AsyncStorage.getItem('basic');

			if (basic === null) {
				throw new Error('Данных об основных настройках приложения нет');
			}

			setStorageBasic(JSON.parse(basic));
		} catch(error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка загрузки данных основных настроек приложения',
					message: `Проблема с ответом из хранилища. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const loadMoonMonthsData = async () => {
		try {
			const currentDate = moment().format('YYYY-MM-DD');

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
					storageBasicData();
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
	const loadMoonDayData = async ({ currentLat, currentLng, selectedTimezone }) => {
		try {
			const currentDate = moment().format('YYYY-MM-DD');
			const currentTime = moment().format('HH:mm');

			fetch(`https://api-moon.digitalynx.org/api/moon/special/day?date=${ currentDate }&time=${ currentTime }&lat=${ currentLat }&lng=${ currentLng }&tz=${ selectedTimezone }`)
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
	const settingsStatus = useMemo(() => {
		return [storagePerson, storageNotesList, storageBirthdayMoon].every((object) => Object.keys(object).length);
	}, [storagePerson, storageNotesList, storageBirthdayMoon]);

	useEffect(() => {
		loadMoonMonthsData();
	}, []);

	useEffect(() => {
		if (!Object.keys(storageBasic).length) return;

		const {
			city: {
				lat: currentLat,
				lng: currentLng,
				timezone: currentTimezone
			} = {}
		} = storageBasic;

		if (currentTimezone !== timezone) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'info',
					title: 'Изменена таймзона',
					message: `Ваша текущая таймзона "${ timezone }" отличается от "${ currentTimezone }" которая соответствует вашему городу проживания. Хотите применить новую таймзону "${ timezone }" для рассчета данных о текущем лунном дне?`,
					handler: (status) => {
						const selectedData = {
							currentLat,
							currentLng,
							selectedTimezone: status === 'ok' ? timezone : currentTimezone
						} ;

						loadMoonDayData(selectedData);
					}
				}
			});
		}
	}, [storageBasic]);

	useEffect(() => {
		if (!settingsStatus) return;

		setSettings({
			...settings,
			person: storagePerson,
			notesList: storageNotesList,
			birthdayMoon: storageBirthdayMoon,
			basic: storageBasic,
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
