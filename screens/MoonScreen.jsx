import { useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import { SettingsContext } from '../contexts/settings';

export default function Moon({ navigation }) {
	const { settings } = useContext(SettingsContext);
	const title = 'Растущая луна';
	const subtitle = 'I Фаза';
	const noteToday = settings.notesList.filter((note) => note.day === settings.currentDayMoon);
	const leftButton = {
		screenLink: 'account',
		type: 'account'
	};
	const rightButton = {
		screenLink: 'createNote',
		type: 'note',
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
			<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		paddingTop: 15,
		paddingBottom: 45
	},
});
