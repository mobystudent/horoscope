import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Container from '../../components/Container';
import Header from '../../components/Header';
import ModalSettings from '../../components/ModalSettings';
import { SettingsContext } from '../../contexts/settings';

import { photoIcon } from '../../icons/elements';

export default ({ navigation }) => {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ typeLoad, setTypeLoad ] = useState(null);
	const [ selectedImage, setSelectedImage ] = useState(null);
	const windowHeight = Dimensions.get('window').height;
	const windowWidth = Dimensions.get('window').width;
	const settingsBtns = [
		// {
		// 	title: 'Редактировать',
		// 	type: 'edit'
		// },
		{
			title: 'Загрузить из альбомов',
			type: 'library'
		},
		{
			title: 'Сделать селфи',
			type: 'selfie'
		},
		{
			title: 'Удалить',
			type: 'delete'
		},
	];
	const leftButton = {
		screenLink: 'account',
		type: 'back'
	};
	const rightButton = {
		btnAction: 'photo',
		type: 'more',
	};
	const changePhoto = async (type) => {
		const permissionsOptions = {
			canAskAgain: true
		};

		if (type === 'library') {
			const options = {
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1
			}

			// try {
			// 	const accessLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync(permissionsOptions);
			// 	console.log(accessLibrary);
			// 	// Ваш код, который должен выполняться после успешного разрешения
			// } catch (error) {
			// 	console.error("Ошибка при запросе разрешений на медиабиблиотеку:", error);
			// 	// Обработка ошибки, если это необходимо
			// }

			const accessLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync(permissionsOptions);
			const extraAccessLibrary = await ImagePicker.getMediaLibraryPermissionsAsync(permissionsOptions);
			console.log('START ACCESS');
			console.log(accessLibrary);
			console.log(extraAccessLibrary);
			console.log('END ACCESS');

			// ExponentImagePicker.requestMediaLibraryPermissionsAsync()
			// 	.then(() => {
			// 		console.log('Here Lam');
			// 		// Ваш код, который должен выполняться после успешного разрешения
			// 	})
			// 	.catch((error) => {
			// 		console.error("Ошибка при запросе разрешений на медиабиблиотеку:", error);
			// 		// Обработка ошибки, если это необходимо
			// 	});


			if (accessLibrary.granted && extraAccessLibrary.granted) {
				const libraryImage = await ImagePicker.launchImageLibraryAsync(options);
				console.log(libraryImage);

				if (libraryImage.canceled) {
					console.log('CANCEL');
				} else {
					setSelectedImage(libraryImage.assets[0].uri);
					console.log(libraryImage);
				}
			}
		} else if (type === 'selfie') {
			const options = {
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				cameraType: 'front',
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1
			}
			const accessCamera = await ImagePicker.requestCameraPermissionsAsync(permissionsOptions);
			const extraAccessCamera = await ImagePicker.getCameraPermissionsAsync(permissionsOptions);

			if (accessCamera.granted && extraAccessCamera.granted) {
				const selfieImage = await ImagePicker.launchCameraAsync(options);
				console.log(selfieImage);

				if (selfieImage.canceled) {
					console.log('CANCEL');
				} else {
					setSelectedImage(selfieImage.assets[0].uri);
					console.log(selfieImage);
				}
			}
		} else if (type === 'delete') {
			setSelectedImage('');
		}

		setSettings({
			...settings,
			photoSettings: false
		});
	}
	const openModalSettins = () => {
		setSettings({
			...settings,
			photoSettings: true
		});
	};

	return (
		<Container>
			<Header
				navigation={ navigation }
				leftButton={ leftButton }
				rightButton={ rightButton }
			/>
			<View style={ styles.body }>
				<Pressable onPress={ () => openModalSettins() }>
					{ selectedImage ?
						<View style={ styles.background }>
							<Image style={[ styles.photo, { width: windowWidth, height: windowHeight - 135 }]} source={{ uri: selectedImage }} resizeMode="contain" />
						</View>
						: <>
							<View style={ [styles.circle, { width: windowWidth - 30, height: windowWidth - 30 }] }>
								<View style={ styles.photoIcon }>
									{ photoIcon('#fff') }
								</View>
							</View>
							<Text style={ styles.hint }>Кликни чтобы загрузить</Text>
						</>
					}
				</Pressable>
			</View>
			<ModalSettings
				buttons={ settingsBtns }
				settingsFunc={ (type) => changePhoto(type) }
				settingsProp="photoSettings"
				alertMess="Модальное окно с настройками будет закрыто"
			/>
		</Container>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000'
	},
	circle: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 395,
		height: 395,
		borderRadius: 395/2,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	photoIcon: {
		width: 140,
		height: 112
	},
	hint: {
		textAlign: 'center',
		color: '#fff',
		// fontFamily: 'SFReg',
		fontSize: 12,
		lineHeight: 14,
		marginTop: 5
	}
});
