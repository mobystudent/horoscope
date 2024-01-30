import * as React from 'react';
import { StyleSheet, Text, Pressable, View, Image, ScrollView } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import Note from '../components/Note';
import { arrowSvg } from '../components/SvgSprite';

import edit from '../assets/images/edit.png';

export default function Account({ navigation }) {
	const title = 'Мой профиль';
	const leftButton = {
		link: 'moon',
		icon: arrowSvg('#fff', 1)
	};
	const rightButton = {
		link: 'edit',
		icon: edit
	};
	const userData = [
		{
			title: 'Дата',
			value: '15.07.1999'
		},
		{
			title: 'Время',
			value: '19:30'
		},
		{
			title: 'Город',
			value: 'Париж'
		},
		{
			title: 'Пол',
			value: 'Женский'
		}
	];
	const moonDay = {
		day: 29,
		title: 'Лунный день',
		startPeriod: {
			time: '23:26',
			day: '15.07'
		},
		endPeriod: {
			time: '00:26',
			day: '15.07'
		}
	};
	const notes = [
		{
			id: 1,
			title: 'Моя заметка',
			date: '15.07.2023',
			description: 'Once it smiled a silent dell Where the people did not dwell; They had gone unto the wars, Trusting to the mild-eyed stars, Nightly, from their azure towers, To keep watch above the flowers, In the midst of which all day The red sun-light lazily lay. Now each visiter shall confess The sad valley\'s restlessness. Nothing there is motionless— Nothing save the airs that brood Over the magic solitude. Ah, by no wind are stirred those trees That palpitate like the chill seas Around the misty Hebrides! Ah, by no wind those clouds are driven That rustle through the unquiet Heaven Uneasily, from mom till even, Over the violets there that lie In myriad types of the human eye — Over the lilies there that wave And weep above a nameless grave! They wave:—from out their fragrant tops Eternal dews come down in drops. They weep:—from off their delicate stems Perennial tears descend in gems. Now each visiter shall confess The sad valley\'s restlessness. Nothing there is motionless— Nothing save the airs that brood Over the magic solitude. Ah, by no wind are stirred those trees That palpitate like the chill seas Around the misty Hebrides! Ah, by no wind those clouds are driven That rustle through the unquiet Heaven Uneasily, from mom till even, Over the violets there that lie In myriad types of the human eye — Over the lilies there that wave And weep above a nameless grave! They wave:—from out their fragrant tops Eternal dews come down in drops. They weep:—from off their delicate stems Perennial tears descend in gems.'
		},
		{
			id: 2,
			title: '5-й лунный день начинается в 07:43',
			date: '15.07.2023',
			description: 'В 13 день лунного календаря не следует начинать новые дела. Стоит выполнять текущие задачи. Желательно работать не в одиночку. Шансы на успех в деле повышаются при коллективной работе. День подходит для любого общения, в том числе для серьезного разговора с начальством. Для смены места работы это не лучшее время. В этот период разрешается проводить любые финансовые операции. Не рекомендуется работать по дому. От путешествий лучше воздержаться.'
		}
	];
	const documents = [
		{
			title: 'Помощь + поддержка',
			description: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
		},
		{
			title: 'Privacy Policy',
			description: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
		},
		{
			title: 'Terms of Use',
			description: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
		}
	];
	const userDataArray = userData.map((data, i) => {
		const style = !i ? styles.button : [ styles.button, styles.buttonLine ];

		return <View style={ style }>
			<Text style={ styles.text }>{ data.title }</Text>
			<Text style={ styles.text }>{ data.value }</Text>
		</View>;
	});
	const notesArray = notes.map((note) => {
		return <Note navigation={ navigation } key={ note.id } note={ note } />
	});
	const documentsArray = documents.map((document, i) => {
		const style = !i ? styles.button : [ styles.button, styles.buttonLine ];

		return <Pressable style={ style } key={ i } onPress={ () => navigation.navigate('content', document) }>
			<Text style={ styles.text }>{ document.title }</Text>
			<View style={ styles.svg }>
				{ arrowSvg('#fff', .5) }
			</View>
		</Pressable>;
	});

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ title }
				leftButton={ leftButton }
				rightButton={ rightButton }
			/>
			<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
				<View style={ styles.block }>
					<View style={ styles.photo }>
						<Image
							style={ styles.image }
							source={ require('../assets/images/photo.png') }
						/>
					</View>
					<Text style={ styles.name }>Valentina, 28</Text>
				</View>
				<View style={ styles.block }>
					<Text style={ styles.title }>День рождения</Text>
					<View style={ styles.groupData }>
						{ userDataArray }
					</View>
				</View>
				<View style={ styles.block }>
					<Text style={ styles.title }>Луна при рождении</Text>
					<View style={ styles.moonContent }>
						<Pressable style={ styles.largeButton } onPress={ () => navigation.navigate('moon') }>
							<View style={ styles.moonDayWrap }>
								<Text style={ styles.moonDay }>{ moonDay.day }</Text>
							</View>
							<View style={ styles.moonWrap }>
								<Text style={ styles.moonTitle }>{ moonDay.title }</Text>
								<View style={ styles.dataMoon }>
									<Text style={ styles.moonText }>{ moonDay.startPeriod.day }</Text>
									<Text style={ [ styles.moonText, styles.moonMark ] }>{ `${moonDay.startPeriod.time}-${moonDay.endPeriod.time}` }</Text>
									<Text style={ styles.moonText }>{ moonDay.endPeriod.day }</Text>
								</View>
							</View>
							<View style={ styles.svg }>
								{ arrowSvg('#fff', .5) }
							</View>
						</Pressable>
						<Pressable style={ styles.largeButton } onPress={ () => navigation.navigate('moon') }>
							<View style={ styles.moonDayWrap }>
								<Text style={ styles.moonDay }>29</Text>
							</View>
							<View style={ styles.moonWrap }>
								<Text style={ styles.moonTitle }>Убывающая луна</Text>
								<Text style={ styles.moonText }>4-фаза</Text>
							</View>
							<Image
								style={ styles.moonImage }
								source={ require('../assets/images/libra.png') }
							/>
						</Pressable>
					</View>
				</View>
				<View style={ styles.block }>
					<Text style={ styles.title }>Мои заметки</Text>
					<ScrollView horizontal={ true }>
						<View style={ styles.noteWrap }>
							{ notesArray }
						</View>
					</ScrollView>
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
		paddingTop: 30
	},
	photo: {
		width: 95,
		height: 95,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 10,
		borderRadius: 95/2
	},
	image: {
		flex: 1,
		width: 95
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
	moonContent: {
		rowGap: 10
	},
	moonDayWrap: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
		borderRadius: 40/2,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	moonDay: {
		// fontFamily: 'SFMed',
		fontSize: 20,
		lineHeight: 26,
		color: '#fff',
	},
	largeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 15,
		paddingHorizontal: 15,
		paddingVertical: 12,
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	moonWrap: {
		flex: 1,
	},
	dataMoon: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		columnGap: 5
	},
	moonTitle: {
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		letterSpacing: -.1,
		color: 'rgba(255, 255, 255, .5)'
	},
	moonText: {
		// fontFamily: 'SFReg',
		fontSize: 14,
		lineHeight: 20,
		color: 'rgba(255, 255, 255, .5)'
	},
	moonMark: {
		color: '#fff'
	},
	moonImage: {
		width: 32,
		height: 32
	},
	noteWrap: {
		flexDirection: 'row',
		columnGap: 10
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
	svg: {
		alignItems: 'center',
		width: 32
	}
});
