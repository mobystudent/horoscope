import * as React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';

import notesStore from '../stores/notes.store';

import { arrowSvg } from '../components/SvgSprite';

export default function Moon({ navigation }) {
	const title = 'Растущая луна';
	const subtitle = 'I Фаза';
	const moonToday = 15;
	const noteToday = notesStore.notes.filter((note) => note.day === moonToday);
	const leftButton = {
		link: 'account',
		icon: arrowSvg('#fff', 1)
	};
	const rightButton = {
		link: 'createNote',
		icon: arrowSvg('#fff', 1),
		params: { noteToday, page: 'moon' }
	};

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ title }
				subtitle={ subtitle }
				leftButton={ leftButton }
				rightButton={ rightButton }
			/>
		</Container>
	);
}

const styles = StyleSheet.create({

});
