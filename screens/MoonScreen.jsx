import { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import MoonInfo from '../components/MoonInfo';
import MoonDetails from '../components/MoonDetails';
import MoonCalendar from '../components/MoonCalendar';
import { SettingsContext } from '../contexts/settings';

import { personIcon } from '../icons/elements';

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
				<MoonCalendar type="day" />
				<View style={ styles.slogan }>
					<View style={ styles.personIcon }>
						{ personIcon('#fff', .5) }
					</View>
					<Text style={ styles.sloganText }>{ settings.currentMoonDay.slogan }</Text>
				</View>
				<MoonDetails type="day" />
				<MoonInfo />
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		paddingTop: 15,
		paddingBottom: 45
	},
	slogan: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginBottom: 30,
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	personIcon: {
		width: 28,
		height: 25
	},
	sloganText: {
		flex: 1,
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
		letterSpacing: -.1
	}
});
