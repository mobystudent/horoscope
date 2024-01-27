import * as React from 'react';
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import Container from './Container';
import Header from '../components/Header';

export default function Edit({ navigation }) {
	return (
		<Container>
			<Header navigation={ navigation } />
			<View style={ styles.body }>
				<Pressable style={ styles.photo }>
					<Image
						style={ styles.image }
						source={ require('../assets/images/photo.png') }
					/>
				</Pressable>
				<View style={ styles.block }>
					<Text style={ styles.title }>Как вас зовут</Text>
					<View style={ styles.groupData }>
						<Pressable style={ styles.button }>
							<Text style={ styles.data }>Имя</Text>
							<Text style={ styles.data }>Олег</Text>
						</Pressable>
					</View>
				</View>
				<View style={ styles.block }>
					<Text style={ styles.title }>Информация о рождении</Text>
					<View style={ styles.groupData }>
						<Pressable style={ styles.button }>
							<Text style={ styles.data }>Дата</Text>
							<Text style={ styles.data }>12.05.1987</Text>
						</Pressable>
						<Pressable style={ [ styles.button, styles.buttonLine ] }>
							<Text style={ styles.data }>Время</Text>
							<Text style={ styles.data }>19:30</Text>
						</Pressable>
					</View>
				</View>
				<View style={ styles.block }>
					<Text style={ styles.title }>Место рождения</Text>
					<View style={ styles.groupData }>
						<Pressable style={ styles.button }>
							<Text style={ styles.data }>Город</Text>
							<Text style={ styles.data }>Париж</Text>
						</Pressable>
					</View>
				</View>
				<View style={ styles.block }>
					<Text style={ styles.title }>Личная информация</Text>
					<View style={ styles.groupData }>
						<Pressable style={ styles.button } onPress={ () => navigation.navigate('gender') }>
							<Text style={ styles.data }>Пол</Text>
							<Text style={ styles.data }>Мужской</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		flexDirection: 'column',
		alignItems: 'center',
		rowGap: 30,
		paddingTop: 30
	},
	photo: {
		width: 95,
		height: 95,
		borderRadius: 95/2
	},
	image: {
		flex: 1,
		width: 95
	},
	block: {
		width: '100%'
	},
	title: {
		// fontFamily: 'SFReg',
		fontSize: 12,
		lineHeight: 16,
		color: 'rgba(255, 255, 255, .5)',
		textTransform: 'uppercase',
		marginBottom: 10
	},
	groupData: {
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		columnGap: 40,
		paddingHorizontal: 15,
		paddingVertical: 12
	},
	buttonLine: {
		borderTopWidth: 1,
		borderTopColor: 'rgba(255, 255, 255, .1)'
	},
	data: {
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
	}
});
