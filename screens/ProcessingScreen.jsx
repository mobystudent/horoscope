import { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle } from 'react-native-svg';
import Container from '../components/Container';
import Header from '../components/Header';
import Config from '../config';
import { SettingsContext } from '../contexts/settings';
import moment from 'moment';

import { checkIcon } from '../icons/elements';

export default function Processing({ navigation }) {
	const {
		settings: {
			person: {
				date: personDate,
				time: personTime,
				place: {
					lat: birthLat,
					lng: birthLng
				} = {}
			} = {},
			basic: {
				city: {
					lat: currentLat,
					lng: currentLng,
					timezone: currentTimezone
				}
			} = {}
		},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ steps, setSteps ] = useState([
		{ level: 20, title: 'Анализируем данные', active: false },
		{ level: 35, title: 'Адаптируем лунные события', active: false },
		{ level: 55, title: 'Учитываем влияние фаз', active: false },
		{ level: 75, title: 'Согласуем с биоритмами', active: false },
		{ level: 90, title: 'Составляем прогноз', active: false }
	]);
	const [ progress, setProgress ] = useState(0);
	const [ readyData, setReadyData ] = useState(false);
	const [ months, setMonths ] = useState({});
	const [ moon, setMoon ] = useState({});
	const [ notesList, setNotesList ] = useState([]);
	const [ birthdayMoon, setBirthdayMoon ] = useState({});
	const title = 'Создаем ваш профиль';
	const renderSteps = useMemo(() => {
		return steps.map((step) => (
			<View style={ [ styles.step, step.active && styles.active ] } key={ step.title }>
				<View style={ styles.iconWrap }>
					<View style={ styles.checkIcon }>
						{ checkIcon('#fff') }
					</View>
				</View>
				<Text style={ styles.text }>{ step.title }</Text>
			</View>
		));
	}, [steps]);
	const time = 3000 / 100;

	// const AnimatedCircle = useRef(new Animated.Value(0)).current;
	const width = 165;
	const strokeWidth = 16;
	const radius = (width - strokeWidth) / 2;
	// const alpha = AnimatedCircle.interpolate({
	// 	inputRange: [0, 1],
	// 	outputRange: [0, Math.PI * 2],
	// });
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - progress / 100 * circumference;
	const storagePersonData = async () => {
		try {
			const personString = JSON.stringify(settings.person);

			if (!Object.keys(settings.person).length) {
				throw new Error('Данных о пользователе нет');
			}

			await AsyncStorage.setItem('person', personString);
		} catch(error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка сохранения данных о пользователе',
					message: `Проблема с записью в хранилище. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const storageNotesListData = async () => {
		try {
			const notesArray = [];

			for (let i = 1; i <= 30; i++) {
				notesArray.push({
					day: i,
					date: '',
					description: ''
				});
			}
			setNotesList(notesArray);

			const notesString = JSON.stringify(notesArray);

			await AsyncStorage.setItem('notesList', notesString);
		} catch(error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка сохраненния списка заметок',
					message: `Проблема с записью в хранилище. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const storageBirthdayMoonData = async () => {
		try {
			const birthdayString = JSON.stringify(birthdayMoon);

			if (!Object.keys(birthdayMoon).length) {
				throw new Error('Данных о луне при рождении нет');
			}

			await AsyncStorage.setItem('birthdayMoon', birthdayString);
		} catch(error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка сохранения данных о луне при рождении',
					message: `Проблема с записью в хранилище. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const storageBasicData = async () => {
		try {
			const basicString = JSON.stringify(settings.basic);

			if (!Object.keys(settings.basic).length) {
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
	const loadMoonData = async () => {
		try {
			const currentDate = moment().format('YYYY-MM-DD');
			const currentTime = moment().format('HH:mm');
			const birthDate = moment(personDate.data, 'DD-MM-YYYY').format('YYYY-MM-DD');

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

					return fetch(`${ Config.DATABASE_MOON_DAY_URL }?date=${ currentDate }&time=${ currentTime }&lat=${ currentLat }&lng=${ currentLng }&tz=${ currentTimezone }`);
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

					return fetch(`${ Config.DATABASE_BIRTH_DAY_URL }?date=${ birthDate }&time=${ personTime }&lat=${ birthLat }&lng=${ birthLng }`);
				})
				.then((response) => {
					if (!response.ok) {
						throw new Error('Не удалось получить данные о лунном дне при рождении');
					}

					return response.json();
				})
				.then((birthdayData) => {
					if (!Object.keys(birthdayData).length) {
						throw new Error(`Данных о лунном дне при рождении на сервере не обнаружено`);
					}

					setBirthdayMoon(birthdayData);
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
		if (!notesList.length && !Object.keys(birthdayMoon).length) return;

		return [notesList, birthdayMoon].every((object) => Object.keys(object).length);
	}, [notesList, birthdayMoon]);

	useEffect(() => {
		loadMoonData();
	}, []);

	useEffect(() => {
		if (!Object.keys(birthdayMoon).length) return;

		storagePersonData();
		storageNotesListData();
		storageBirthdayMoonData();
		storageBasicData();
	}, [birthdayMoon]);

	useEffect(() => {
		const progressId = setInterval(() => {
			setProgress((prevProgress) => {
				const counter = prevProgress < 100 ? prevProgress + 1 : 100;

				if (counter === 100) {
					clearInterval(progressId);
				}

				return counter;
			});
		}, time);

		return () => clearInterval(progressId);
	}, [readyData]);

	useEffect(() => {
		setSteps(steps.map((step) => {
			if (progress === step.level) {
				step.active = true;
			}

			return step;
		}));
	}, [progress]);

	useEffect(() => {
		if (progress === 100 && readyData) {
			navigation.navigate('moon');
		}
	}, [progress, readyData]);

	useEffect(() => {
		if (!settingsStatus) return;

		setSettings({
			...settings,
			notesList,
			birthdayMoon,
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

		setReadyData(true);
	}, [settingsStatus]);

	return (
		<Container>
			<Header />
			<View style={ styles.body }>
				<Text style={ styles.title }>{ title }</Text>
				<View style={ styles.wrap }>
					<Svg width={ width } height={ width } style={ styles.progress }>
						<Circle
							cx={ width/2 }
							cy={ width/2 }
							r={ radius }
							strokeWidth={ strokeWidth }
							style={ styles.circle }
						/>
						<Circle
							cx={ width/2 }
							cy={ width/2 }
							r={ radius }
							strokeWidth={ strokeWidth }
							strokeDasharray={ `${circumference} ${circumference}` }
							strokeDashoffset={ strokeDashoffset }
							style={ styles.circleFill }
						/>
					</Svg>
					<Text style={ styles.counter }>{ `${ progress }%` }</Text>
				</View>
				<View style={ styles.steps }>
					{ renderSteps }
				</View>
			</View>
		</Container>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1
	},
	title: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: '700',
		fontSize: 34,
		marginBottom: 35
	},
	wrap: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		height: 165,
		marginBottom: 35
	},
	progress: {
		marginLeft: 'auto',
		marginRight: 'auto',
		transform: [{ rotate: '-90deg' }],
	},
	counter: {
		position: 'absolute',
		fontSize: 34,
		fontWeight: '700',
		color: '#fff',
	},
	circle: {
		stroke: 'rgba(255, 255, 255, .12)',
		fill: 'none'
	},
	circleFill: {
		stroke: '#fff',
		fill: 'none'
	},
	steps: {
		rowGap: 25
	},
	step: {
		display: 'flex',
		flexDirection: 'row',
		columnGap: 15,
		opacity: .4
	},
	iconWrap: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 32,
		height: 32,
		borderRadius: 32/2,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	checkIcon: {
		width: 14,
		height: 11
	},
	text: {
		fontWeight: '400',
		color: '#FFF',
		fontSize: 20,
		lineHeight: 26
	},
	active: {
		opacity: 1
	}
});
