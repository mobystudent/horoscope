import * as React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import { arrowSvg } from '../components/SvgSprite';

export default function Content(props) {
	const {
		navigation,
		route: {
			params: {
				day = null,
				headerTitle = '',
				title = '',
				symbol = '',
				description = ''
			} = {}
		}
	} = props;
	const header = day ? `${ day }-й ${ headerTitle }` : headerTitle;
	const leftButton = {
		link: 'account',
		icon: arrowSvg('#fff', .5)
	};

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ header }
				leftButton={ leftButton }
			/>
			<ScrollView showsVerticalScrollIndicator={ false }>
				{ symbol && <Text style={ styles.symbol }>{ `Символ дня: ${ symbol }` }</Text> }
				{ title && <Text style={ styles.title }>{ title }</Text> }
				<Text style={ styles.description }>{ description }</Text>
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		color: '#fff',
		// fontFamily: 'SFBold',
		fontSize: 20,
		lineHeight: 24,
		marginBottom: 15
	},
	description: {
		color: '#fff',
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 24
	},
	symbol: {
		color: "rgba(255, 255, 255, .5)",
		fontSize: 12,
		marginBottom: 15,
		textTransform: 'uppercase'
	}
});
