import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Note from '../../components/Note';
import { SettingsContext } from '../../contexts/settings';

export default function Notes({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ notesArr, setNotesArr ] = useState(settings.notesList);
	const title = 'Все заметки';
	const leftButton = {
		screenLink: 'account',
		type: 'back'
	};
	const rightButton = {
		btnAction: 'sort',
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
			modal: {}
		});
	};

	useEffect(() => {
		if (settings.modal.type !== 'sort') return;

		setSettings({
			...settings,
			modal: {
				visible: true,
				status: 'filter',
				type: 'sort',
				handler: (type) => sortNotes(type)
			}
		});
	}, [settings.modal.type]);

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
			<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
				<View style={ styles.list }>
					{ notesArray }
				</View>
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		paddingTop: 15,
		paddingBottom: 45
	},
	list: {
		rowGap: 10
	}
});
