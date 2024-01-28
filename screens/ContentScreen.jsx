import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import { arrowSvg } from '../components/SvgSprite';

export default function Content(props) {
	const {
		navigation,
		route: {
			params: {
				title = '',
				date = '',
				description = ''
			} = {}
		}
	} = props;
	const titleNote = date ? `Заметка от ${date}` : title;
	const leftButton = {
		link: 'account',
		icon: arrowSvg('#fff', .5)
	};

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ titleNote }
				leftButton={ leftButton }
			/>
			<ScrollView showsVerticalScrollIndicator={ false }>
				<Text style={ styles.title }>{ title }</Text>
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
	}
});
