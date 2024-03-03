import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import MoonBirthday from '../components/MoonBirthday';
import Note from '../components/Note';
import MoonMinder from '../components/MoonMinder';
import { SettingsContext } from '../contexts/settings';

import notesStore from '../stores/notes.store';

import { arrowRightIcon, photoIcon } from '../icons/elements';

export default function Account({ navigation }) {
	const { settings } = useContext(SettingsContext);
	const title = 'Мой профиль';
	const leftButton = {
		screenLink: 'moon',
		type: 'back'
	};
	const userName = 'Valentina';
	const userData = [
		{
			title: 'Дата',
			value: '15.07.1999',
			screen: 'date'
		},
		{
			title: 'Время',
			value: '19:30',
			screen: 'time'
		},
		{
			title: 'Город',
			value: 'Париж',
			screen: 'city'
		},
		{
			title: 'Пол',
			value: 'Женский',
			screen: 'gender'
		}
	];
	const documents = [
		{
			headerTitle: 'Помощь + поддержка',
			description: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
		},
		{
			headerTitle: 'Privacy Policy',
			description: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
		},
		{
			headerTitle: 'Terms of Use',
			description: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
		}
	];
	const userDataArray = userData.map((data, i) => {
		const style = !i ? styles.button : [ styles.button, styles.buttonLine ];

		return <Pressable style={ style } key={ i } onPress={ () => navigation.navigate(data.screen, data) }>
			<Text style={ styles.text }>{ data.title }</Text>
			<Text style={ styles.text }>{ data.value }</Text>
		</Pressable>;
	});
	const documentsArray = documents.map((document, i) => {
		const style = !i ? styles.button : [ styles.button, styles.buttonLine ];

		return <Pressable style={ style } key={ i } onPress={ () => navigation.navigate('content', document) }>
			<Text style={ styles.text }>{ document.headerTitle }</Text>
			<View style={ styles.iconWrap }>
				<View style={ styles.arrowRightIcon }>
					{ arrowRightIcon('#fff', .5) }
				</View>
			</View>
		</Pressable>;
	});
	const lastNotes = () => {
		const createdArr = [];
		const components = [];

		for (const note of notesStore.notes) {
			if (note.day === settings.currentDayMoon) {
				components.push(<Note navigation={ navigation } key={ note.id } note={ note } />);
			} else if (note.date) {
				createdArr.push(note);
			}
		}

		createdArr.sort((a, b) => {
			const dateA = new Date(`20${a.date.split('.').reverse().join('-')}`);
			const dateB = new Date(`20${b.date.split('.').reverse().join('-')}`);

			return dateA - dateB;
		});

		for (const note of createdArr.slice(0, 2)) {
			components.push(<Note navigation={ navigation } key={ note.id } note={ note } />);
		}

		return components;
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
						<View style={ styles.photoIcon }>
							{ photoIcon('#fff') }
						</View>
					</Pressable>
					<Pressable onPress={ () => navigation.navigate('name', { value: userName }) }>
						<Text style={ styles.name }>{ userName }, 28</Text>
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
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	photoIcon: {
		width: 35,
		height: 28
	},
	name: {
		// fontFamily: 'SFBold',
		fontSize: 20,
		lineHeight: 24,
		color: '#fff',
		textAlign: 'center'
	},
	block: {
		width: '100%'
	},
	title: {
		// fontFamily: 'SFReg',
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
		// fontFamily: 'SFReg',
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
