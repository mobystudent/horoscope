import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle } from 'react-native-svg';
import Container from '../components/Container';
import Header from '../components/Header';
import { SettingsContext } from '../contexts/settings';

import { checkIcon } from '../icons/elements';

export default function Processing({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ steps, setSteps ] = useState([
		{ id: 0, level: 20, title: 'Анализируем данные', active: false },
		{ id: 1, level: 35, title: 'Адаптируем лунные события', active: false },
		{ id: 2, level: 55, title: 'Учитываем влияние фаз', active: false },
		{ id: 3, level: 75, title: 'Согласуем с биоритмами', active: false },
		{ id: 4, level: 90, title: 'Составляем прогноз', active: false }
	]);
	const [ progress, setProgress ] = useState(0);
	const title = 'Создаем ваш профиль';
	const renderItem = (({ item }) => (
		<View style={ [ styles.item, item.active && styles.active ] }>
			<View style={ styles.iconWrap }>
				<View style={ styles.checkIcon }>
					{ checkIcon('#fff') }
				</View>
			</View>
			<Text style={ styles.text }>{ item.title }</Text>
		</View>
	));
	const gap = 25;
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
	console.log(progress);
	const strokeDashoffset = circumference - progress / 100 * circumference;

	useEffect(() => {
			setSteps((prevSteps) => prevSteps.map((step) => progress === step.level ? { ...step, active: true } : step));
	}, [progress]);

	useEffect(() => {
		const progressId = setInterval(() => {
			setProgress((prevProgress) => {
				const newProgress = prevProgress < 100 ? prevProgress + 1 : 100;

				if (newProgress === 100) {
					clearInterval(progressId);
					navigation.navigate('moon');
				}

				return newProgress;
			});
		}, time);

		return () => clearInterval(progressId);
	}, []);

	useEffect(() => {
		const setNotesList = async () => {
			const notesArray = [];

			for (let i = 0; i < 30; i++) {
				notesArray.push({
					day: i + 1,
					date: '',
					description: ''
				});
			}

			const moonDay = {
				phase: 'firstQuarter',
				details: {
					moonDay: {
						day: '5',
						percent: '33',
						period: '01:53 20.05 - 23:03 21.05'
					},
					moonSign: 'libra'
				},
				content: {
					symbol: 'единорог',
					title: 'Хороший день для занятия спорта',
					description: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
				}
			};

			setSettings({
				...settings,
				notesList: notesArray,
				birthdayMoon: moonDay,
				registered: true
			});

			try {
				const personString = JSON.stringify(settings.person);
				const notesString = JSON.stringify(notesArray);
				const birthdayString = JSON.stringify(moonDay);

				await AsyncStorage.setItem('person', personString);
				await AsyncStorage.setItem('notesArray', notesString);
				await AsyncStorage.setItem('birthdayMoon', birthdayString);
			} catch (e) {
				console.error(e);
			}
		};

		setNotesList();
	}, []);

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
				<FlatList
					data={ steps }
					renderItem={ renderItem }
					keyExtractor={ item => item.id }
					style={ styles.list }
					contentContainerStyle={{ gap }}
				/>
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
		fontFamily: 'SFBold',
		fontSize: 34,
		marginBottom: 15
	},
	wrap: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		height: 165,
		marginBottom: 65
	},
	progress: {
		marginLeft: 'auto',
		marginRight: 'auto',
		transform: [{ rotate: '-90deg' }],
	},
	counter: {
		position: 'absolute',
		fontSize: 34,
		fontFamily: 'SFBold',
		color: '#fff',
	},
	circle: {
		stroke: "rgba(255, 255, 255, .12)",
		fill: 'none'
	},
	circleFill: {
		stroke: '#fff',
		fill: 'none'
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		columnGap: 15,
		opacity: 0.4
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
		fontFamily: 'SFReg',
		color: '#FFF',
		fontSize: 20,
		lineHeight: 26
	},
	active: {
		opacity: 1
	}
});
