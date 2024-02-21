import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Note from '../../components/Note';

import notesStore from '../../stores/notes.store';

import { arrowSvg } from '../../components/SvgSprite';

export default function Notes({ navigation }) {
	const title = 'Все заметки';
	const todayMoonDay = 25;
	const leftButton = {
		link: 'account',
		icon: arrowSvg('#fff', 1)
	};
	const notesArray = notesStore.notes.map((note, i) => {
		return <Note navigation={ navigation } key={ i } note={ note } />
	});
	notesStore.notes.sort((a, b) => {
		if (a.day === todayMoonDay) return -1;
		else return a.day - b.day;
	});

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ title }
				leftButton={ leftButton }
			/>
			<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
				<View style={ styles.noteWrap }>
					{ notesArray }
				</View>
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	noteWrap: {
		rowGap: 10
	},
});
