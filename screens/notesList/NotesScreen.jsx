import { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Note from '../../components/Note';
import { SettingsContext } from '../../contexts/settings';

export default function Notes({ navigation }) {
	const {
		settings: {
			notesList = {},
			modal: {
				type: modalType = ''
			} = {}
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ list, setList ] = useState(notesList);
	const title = 'Все заметки';
	const leftButton = {
		screenLink: 'account',
		type: 'back'
	};
	const rightButton = {
		btnAction: 'sort',
		type: 'filter'
	};
	const sortNotes = (type) => {
		let filledNotes = [];
		let emptyNotes = [];

		switch(type) {
			case 'new':
				for(const note of notesList) {
					if (note.date) {
						filledNotes.push(note);
					} else {
						emptyNotes.push(note);
					}
				}
				filledNotes.sort((a, b) => {
					const dateA = new Date(`20${a.date.split('.').reverse().join('-')}`);
					const dateB = new Date(`20${b.date.split('.').reverse().join('-')}`);

					return dateA - dateB;
				});
				emptyNotes.sort((a, b) => a.day - b.day);
				setList([...filledNotes, ...emptyNotes]);
				break;
			case 'old':
				for(const note of notesList) {
					if (note.date) {
						filledNotes.push(note);
					} else {
						emptyNotes.push(note);
					}
				}
				filledNotes.sort((a, b) => {
					const dateA = new Date(`20${a.date.split('.').reverse().join('-')}`);
					const dateB = new Date(`20${b.date.split('.').reverse().join('-')}`);

					return dateB - dateA;
				});
				emptyNotes.sort((a, b) => b.day - a.day);
				setList([...filledNotes, ...emptyNotes]);
				break;
			case 'asc':
				setList([...notesList].sort((a, b) => a.day - b.day));
				break;
			case 'desc':
				setList([...notesList].sort((a, b) => b.day - a.day));
				break;
		}

		setSettings({
			...settings,
			modal: {}
		});
	};
	const allNotes = useMemo(() => {
		return list.map((note) => {
			return <Note navigation={ navigation } key={ note.day } note={ note } />
		});
	}, [list]);

	useEffect(() => {
		if (modalType !== 'sort') return;

		setSettings({
			...settings,
			modal: {
				visible: true,
				status: 'filter',
				type: 'sort',
				handler: (type) => sortNotes(type)
			}
		});
	}, [modalType]);

	useEffect(() => {
		setList(notesList);
		sortNotes('new');
	}, [notesList]);

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
					{ allNotes }
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
