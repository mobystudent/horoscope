import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import { SettingsContext } from '../contexts/settings';

import notesStore from '../stores/notes.store';

import { arrowSvg } from '../components/SvgSprite';

export default function Moon({ navigation }) {
	const { settings } = useContext(SettingsContext);
	const title = 'Растущая луна';
	const subtitle = 'I Фаза';
	const noteToday = notesStore.notes.filter((note) => note.day === settings.currentDayMoon);
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
