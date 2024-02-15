import * as React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export default function Note(props) {
	const {
		navigation,
		note
	} = props;
	const titleLimit = (title) => title.length > 45 ? `${title.slice(0, 35)}...` : title;
	const descLimit = (desc) => desc.length > 60 ? `${desc.slice(0, 50)}...` : desc;
	const mode = note.date ? 'view' : 'new';

	return (
		<Pressable
			style={ styles.note }
			onPress={ () => navigation.navigate('createNote', {
				note,
				mode: mode,
				page: 'account'
			})
		}>
			<Text style={ styles.title }>{ titleLimit(note.title) }</Text>
			<Text style={ styles.date }>{ note.date }</Text>
			<Text style={ styles.desc }>{ descLimit(note.description) }</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	note: {
		padding: 15,
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	title: {
		// fontFamily: 'SFBold',
		fontSize: 20,
		lineHeight: 26,
		color: '#fff',
		marginBottom: 5
	},
	date: {
		// fontFamily: 'SFReg',
		fontSize: 13,
		lineHeight: 16,
		color: 'rgba(255, 255, 255, .5)',
		marginBottom: 15
	},
	desc: {
		marginTop: 'auto',
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 22,
		color: '#fff'
	},
});
