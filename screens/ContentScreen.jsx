import { useContext } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import { SettingsContext } from '../contexts/settings';

export default function Content({ navigation }) {
	const {
		settings: {
			displayDocument: {
				header = '',
				title = '',
				symbol = '',
				description = ''
			} = {}
		} = {}
	} = useContext(SettingsContext);
	const leftButton = {
		screenLink: 'account',
		type: 'back'
	};

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ header }
				leftButton={ leftButton }
			/>
			<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
				{ symbol && <Text style={ styles.symbol }>{ `Символ дня: ${ symbol }` }</Text> }
				{ title && <Text style={ styles.title }>{ title }</Text> }
				<Text style={ styles.description }>{ description }</Text>
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		paddingTop: 15,
		paddingBottom: 45
	},
	title: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 34,
		lineHeight: 40,
		marginBottom: 15
	},
	description: {
		color: '#fff',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 24
	},
	symbol: {
		color: 'rgba(255, 255, 255, .5)',
		fontWeight: '400',
		fontSize: 12,
		letterSpacing: -.075,
		textTransform: 'uppercase',
		marginBottom: 15
	}
});
