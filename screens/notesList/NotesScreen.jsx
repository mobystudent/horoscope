import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Dimensions, Modal, Alert } from 'react-native';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Note from '../../components/Note';
import { SettingsContext } from '../../contexts/settings';

import notesStore from '../../stores/notes.store';

import { arrowSvg, filter } from '../../components/SvgSprite';

export default function Notes({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ notesArr, setNotesArr ] = useState(notesStore.notes);
	const [ heightModal, setHeightModal ] = useState(0);
	const title = 'Все заметки';
	// const todayMoonDay = 2;
	const windowHeight = Dimensions.get('window').height;
	const sortBtns = [
		{
			title: 'Сначала новые',
			type: 'new'
		},
		{
			title: 'Сначала старые',
			type: 'old'
		},
		{
			title: 'По возрастанию',
			type: 'asc'
		},
		{
			title: 'По убыванию',
			type: 'desc'
		},
	];
	const leftButton = {
		link: 'account',
		icon: arrowSvg('#fff', 1)
	};
	const rightButton = {
		btn: 'filter',
		icon: filter('#fff', 1)
	};
	const notesArray = notesArr.map((note, i) => {
		return <Note navigation={ navigation } key={ i } note={ note } />
	});
	const sortBtnsArray = sortBtns.map((button, i) => {
		const style = !i ? styles.button : [ styles.button, styles.buttonLine ];

		return (
			<Pressable style={ style } key={ i } onPress={ () => sortNotes(button.type) }>
				<Text style={ styles.text }>{ button.title }</Text>
			</Pressable>
		);
	});
	const sortNotes = (type) => {
		let createdNotes = [];
		let emptyNotes = [];

		switch(type) {
			case 'new':
				for(const note of notesArr) {
					if (note.date) {
						createdNotes.push(note);
					} else {
						emptyNotes.push(note);
					}
				}
				createdNotes.sort((a, b) => {
					const dateA = new Date(`20${a.date.split('.').reverse().join('-')}`);
					const dateB = new Date(`20${b.date.split('.').reverse().join('-')}`);

					return dateA - dateB;
				});
				emptyNotes.sort((a, b) => a.day - b.day);
				setNotesArr(createdNotes.concat(emptyNotes));
				break;
			case 'old':
				for(const note of notesArr) {
					if (note.date) {
						createdNotes.push(note);
					} else {
						emptyNotes.push(note);
					}
				}
				createdNotes.sort((a, b) => {
					const dateA = new Date(`20${a.date.split('.').reverse().join('-')}`);
					const dateB = new Date(`20${b.date.split('.').reverse().join('-')}`);

					return dateB - dateA;
				});
				emptyNotes.sort((a, b) => b.day - a.day);
				setNotesArr(createdNotes.concat(emptyNotes));
				break;
			case 'asc':
				setNotesArr(notesArr.sort((a, b) => a.day - b.day));
				break;
			case 'desc':
				setNotesArr(notesArr.sort((a, b) => b.day - a.day));
				break;
		}

		setSettings({
			...settings,
			noteFilter: false
		});
	};
	const onLayout = ({ nativeEvent }) => {
		setHeightModal(windowHeight - nativeEvent.layout.height);
	};

	// useEffect(() => {
	// 	setNotesArr(notesArr.sort((a, b) => {
	// 		if (a.day === todayMoonDay) return -1;
	// 		if (b.day === todayMoonDay) return 1;
	//
	// 		else return a.day - b.day;
	// 	}));
	// 	console.log('SORT');
	// }, []);

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ title }
				leftButton={ leftButton }
				rightButton={ rightButton }
			/>
			<ScrollView showsVerticalScrollIndicator={ false }>
				<View style={ styles.list }>
					{ notesArray }
				</View>
			</ScrollView>
			{ settings.noteFilter && <Modal
				animationType="slide"
				transparent={ true }
				visible={ true }
				onRequestClose={ () => {
					Alert.alert("Модальное окно с фильтром будет закрыто");
					setSettings({
						...settings,
						noteFilter: false
					});
				} }
			>
				<Pressable style={ styles.background } onPress={ () => {
					setSettings({
						...settings,
						noteFilter: false
					});
				} }>
					<View style={{ top: heightModal }} onLayout={ onLayout }>
						<View style={ styles.groupData }>
							{ sortBtnsArray }
						</View>
					</View>
				</Pressable>
			</Modal> }
		</Container>
	);
}

const styles = StyleSheet.create({
	list: {
		rowGap: 10
	},
	background: {
		flex: 1,
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, .5)'
	},
	groupData: {
		borderTopLeftRadius: 17,
		borderTopRightRadius: 17,
		backgroundColor: '#83645C'
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
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
});
