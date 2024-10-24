import { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getCalendars } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../components/Container';
import Config from '../config';
import { SettingsContext } from '../contexts/settings';
import moment from 'moment';

export default function StartScreen({ navigation }) {
	const {
		settings: {
			moonImagesList = {}
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
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
	const updateStorageBasicData = async (updateTimezone) => {
		const updateStorageBasic = {
			...storageBasic,
			city: {
				...storageBasic.city,
				timezone: updateTimezone
			}
		};

		setStorageBasic(updateStorageBasic);

		try {
			const basicString = JSON.stringify(updateStorageBasic);

			if (!Object.keys(storageBasic).length) {
				throw new Error('Данных об основных настройках приложения нет');
			}

			await AsyncStorage.setItem('basic', basicString);
		} catch(error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка сохранения данных об основных настройках приложения',
					message: `Проблема с записью в хранилище. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const loadMoonMonthsData = async () => {
		try {
			const currentDate = moment().format('YYYY-MM-DD');

			fetch(`${ Config.DATABASE_MOON_MONTH_URL }?date=${ currentDate }`)
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
	const loadMoonDayData = async () => {
		try {
			const currentDate = moment().format('YYYY-MM-DD');
			const currentTime = moment().format('HH:mm');
			const {
				city: {
					lat: currentLat = '',
					lng: currentLng = '',
					timezone: currentTimezone = ''
				} = {}
			} = storageBasic;

			fetch(`${ Config.DATABASE_MOON_DAY_URL }?date=${ currentDate }&time=${ currentTime }&lat=${ currentLat }&lng=${ currentLng }&tz=${ currentTimezone }`)
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
						status === 'ok' ? updateStorageBasicData(timezone) : loadMoonDayData();
					}
				}
			});

			return;
		} else {
			loadMoonDayData();
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
			registered: true,
			moonImagesList: {
				newMoon: require('../assets/images/newMoon.png'),
				fullMoon: require('../assets/images/fullMoon.png'),
				thirdQuarter: require('../assets/images/thirdQuarter.png'),
				waningGibbous: require('../assets/images/waningGibbous.png'),
				waningCrescent: require('../assets/images/waningCrescent.png'),
				waxingCrescent: require('../assets/images/waxingCrescent.png'),
				firstQuarter: require('../assets/images/firstQuarter.png'),
				waxingGibbous: require('../assets/images/waxingGibbous.png')
			}
		});

		setTimeout(() => {
			navigation.navigate('moon');
		}, time);
	}, [settingsStatus]);

	return (
		<Container>
			<View style={ styles.body }>
				<View style={ styles.moonWrap }>
					<Image source={ moonImagesList['fullMoon'] } style={ styles.moonImage } />
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
	moonWrap: {
		alignItems: 'center',
		marginBottom: 30
	},
	moonImage: {
		width: 250,
		height: 250
	}
});
