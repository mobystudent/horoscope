import { useState, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Note from '../../components/Note';
import ModalSettings from '../../components/ModalSettings';
import { SettingsContext } from '../../contexts/settings';

import notesStore from '../../stores/notes.store';

export default function Notes({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ notesArr, setNotesArr ] = useState(notesStore.notes);
	const title = 'Все заметки';
	// const todayMoonDay = 2;
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
		screenLink: 'account',
		type: 'back'
	};
	const rightButton = {
		btnAction: 'filter',
		type: 'filter'
	};
	const notesArray = notesArr.map((note, i) => {
		return <Note navigation={ navigation } key={ i } note={ note } />
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
			<ModalSettings
				buttons={ sortBtns }
				settingsFunc={ (type) => sortNotes(type) }
				settingsProp="noteFilter"
				alertMess="Модальное окно с фильтром будет закрыто"
			/>
		</Container>
	);
}

const styles = StyleSheet.create({
	list: {
		rowGap: 10
	}
});
