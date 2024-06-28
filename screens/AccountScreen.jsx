import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView, Image } from 'react-native';
import moment from 'moment';
import Container from '../components/Container';
import Header from '../components/Header';
import MoonBirthday from '../components/MoonBirthday';
import Note from '../components/Note';
import MoonMinder from '../components/MoonMinder';
import { SettingsContext } from '../contexts/settings';

import { arrowRightIcon, photoIcon } from '../icons/elements';

export default function Account({ navigation }) {
	const {
		settings: {
			currentMoonDay: {
				details: {
					moonDay: {
						day: moonDay = ''
					} = {},
				} = {}
			} = {},
			notesList = {},
			person = {}
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const title = 'Мой профиль';
	const leftButton = {
		screenLink: 'moon',
		type: 'back'
	};
	const userData = [
		{
			title: 'Дата',
			screen: 'date'
		},
		{
			title: 'Время',
			screen: 'time'
		},
		{
			title: 'Город',
			screen: 'city'
		},
		{
			title: 'Пол',
			screen: 'gender'
		}
	];
	const documents = {
		help: 'Помощь + поддержка',
		policy: 'Privacy Policy',
		terms: 'Terms of Use'
	};
	const openContent = (key) => {
		// Здесь будет запрос по ключу key на сервер, а полученные данные будут сохраняться в displayDocument
		const document = 'Text';

		setSettings({
			...settings,
			displayDocument: {
				header: documents[key],
				description: document
			}
		});

		navigation.navigate('content');
	};
	const userDataArray = userData.map((data, i) => {
		const style = !i ? styles.button : [ styles.button, styles.buttonLine ];
		const personValue = person[data.screen].value || person[data.screen];

		return (
			<Pressable style={ style } key={ i } onPress={ () => navigation.navigate(data.screen) }>
				<Text style={ styles.text }>{ data.title }</Text>
				<Text style={ styles.text }>{ personValue }</Text>
			</Pressable>
		);
	});
	const documentsArray = Object.keys(documents).map((key, i) => {
		const style = !i ? styles.button : [ styles.button, styles.buttonLine ];

		return <Pressable style={ style } key={ key } onPress={ () => openContent(key) }>
			<Text style={ styles.text }>{ documents[key] }</Text>
			<View style={ styles.iconWrap }>
				<View style={ styles.arrowRightIcon }>
					{ arrowRightIcon('#fff', .5) }
				</View>
			</View>
		</Pressable>;
	});
	const lastNotes = () => {
		const filledNotes = [];
		const components = [];

		for (const note of notesList) {
			if (note.day === moonDay) {
				components.push(<Note navigation={ navigation } key={ note.day } note={ note } />);
			} else if (note.date) {
				filledNotes.push(note);
			}
		}

		filledNotes.sort((a, b) => {
			const dateA = new Date(`20${a.date.split('.').reverse().join('-')}`);
			const dateB = new Date(`20${b.date.split('.').reverse().join('-')}`);

			return dateA - dateB;
		});

		for (const note of filledNotes.slice(0, 2)) {
			components.push(<Note navigation={ navigation } key={ note.day } note={ note } />);
		}

		return components;
	};
	const countAge = () => {
		const birthday = moment(person.date.data, "DD-MM-YYYY");

		return moment().diff(birthday, 'years');
	};

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ title }
				leftButton={ leftButton }
			/>
			<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
				<View style={ styles.block }>
					<Pressable style={ styles.circle } onPress={ () => navigation.navigate('image') }>
						{ person.image ?
							<Image style={ styles.photo } source={{ uri: person.image }} />
							: <View style={ styles.photoIcon }>
								{ photoIcon('#fff') }
							</View>
						}
					</Pressable>
					<Pressable onPress={ () => navigation.navigate('name') }>
						<Text style={ styles.name }>{ person.name }, { countAge() }</Text>
					</Pressable>
				</View>
				<MoonMinder navigation={ navigation } />
				<View style={ styles.block }>
					<Text style={ styles.title }>День рождения</Text>
					<View style={ styles.groupData }>
						{ userDataArray }
					</View>
				</View>
				<View style={ styles.block }>
					<Text style={ styles.title }>Луна при рождении</Text>
					<MoonBirthday navigation={ navigation } />
				</View>
				<View style={ styles.block }>
					<Text style={ styles.title }>Мои заметки</Text>
					<View style={ styles.list }>
						{ lastNotes() }
					</View>
					<View style={ styles.groupData }>
						<Pressable style={ [styles.button, styles.buttonAll] } onPress={ () => navigation.navigate('notes') }>
							<Text style={ styles.text }>Смотреть все</Text>
						</Pressable>
					</View>
				</View>
				<View style={ styles.block }>
					<Text style={ styles.title }>Дополнительно</Text>
					<View style={ styles.groupData }>
						{ documentsArray }
					</View>
				</View>
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		flexDirection: 'column',
		alignItems: 'center',
		rowGap: 30,
		paddingTop: 30,
		paddingBottom: 45
	},
	circle: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 95,
		height: 95,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 10,
		borderRadius: 95/2,
		backgroundColor: 'rgba(255, 255, 255, .12)',
		overflow: 'hidden'
	},
	photo: {
		width: 95,
		height: 95
	},
	photoIcon: {
		width: 35,
		height: 28
	},
	name: {
		fontWeight: '700',
		fontSize: 20,
		lineHeight: 24,
		color: '#fff',
		textAlign: 'center'
	},
	block: {
		width: '100%'
	},
	title: {
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 16,
		color: 'rgba(255, 255, 255, .5)',
		textTransform: 'uppercase',
		marginBottom: 10
	},
	groupData: {
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		columnGap: 40,
		paddingHorizontal: 15,
		paddingVertical: 12
	},
	buttonLine: {
		borderTopWidth: 1,
		borderTopColor: 'rgba(255, 255, 255, .1)'
	},
	text: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
	},
	iconWrap: {
		justifyContent: 'center',
		width: 16
	},
	arrowRightIcon: {
		width: 9,
		height: 14
	},
	list: {
		rowGap: 10,
		marginBottom: 10
	},
	buttonAll: {
		justifyContent: 'center'
	}
});
