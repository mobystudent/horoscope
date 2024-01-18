import * as React from 'react';
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';

export default function Header({ navigation }) {
	console.log(navigation);
	return (
		<View style={ styles.header }>
			<Pressable style={ styles.btn }>
				<Image
					style={ styles.image }
					source={ require('../assets/images/account.png') }
				/>
			</Pressable>
			<View>
				<Text style={ styles.title }>Растущая луна</Text>
				<Text style={ styles.subtitle }>I Фаза</Text>
			</View>
			<Pressable onPress={ () => navigation.navigate('edit') } style={ styles.btn }>
				<Image
					style={ styles.image }
					source={ require('../assets/images/edit.png') }
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 30,
		marginBottom: 10
	},
	image: {
		width: 24,
		height: 24
	},
	title: {
		// fontFamily: 'SFBold',
		color: '#fff',
		textAlign: 'center',
		fontSize: 17,
		letterSpacing: -0.1,
		marginBottom: 5
	},
	subtitle: {
		// fontFamily: 'SFReg',
		color: 'rgba(255, 255, 255, .5)',
		textAlign: 'center',
		fontSize: 12
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 32,
		height: 32
	}
});
