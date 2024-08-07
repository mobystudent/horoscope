import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Container from '../../components/Container';
import Header from '../../components/Header';
import { SettingsContext } from '../../contexts/settings';

import { photoIcon } from '../../icons/elements';

export default ({ navigation }) => {
	const {
		settings: {
			person: {
				image: personImage
			},
			modal: {
				type: modalType
			}
		},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ selectedImage, setSelectedImage ] = useState(personImage);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ heightArea, setHeightArea ] = useState(0);
	const windowWidth = Dimensions.get('window').width;
	const leftButton = {
		screenLink: 'account',
		type: 'back'
	};
	const rightButton = {
		btnAction: 'photo',
		type: 'more'
	};
	const changePhoto = async (type) => {
		if (type === 'library') {
			const options = {
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1
			};

			try {
				const accessLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();
				const extraAccessLibrary = await ImagePicker.getMediaLibraryPermissionsAsync();

				if (accessLibrary.granted && extraAccessLibrary.granted) {
					const libraryImage = await ImagePicker.launchImageLibraryAsync(options);

					if (!libraryImage.canceled) {
						setSelectedImage(libraryImage.assets[0].uri);
						setDisabledBtn(false);
					}
				} else {
					throw new Error('Нет прав доступа к медиабиблиотеке телефона');
				}
			} catch (error) {
				setSettings({
					...settings,
					modal: {
						visible: true,
						status: 'error',
						title: 'Ошибка подключения к медиабиблиотеке',
						message: `Проблема с доступом к медиабиблиотеке. ${ error }, проверьте настройки доступа к медиабиблиотеке телефона и перезагрузите приложение`
					}
				});

				return;
			}
		} else if (type === 'selfie') {
			const options = {
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				cameraType: 'front',
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1
			}

			try {
				const accessCamera = await ImagePicker.requestCameraPermissionsAsync();
				const extraAccessCamera = await ImagePicker.getCameraPermissionsAsync();

				if (accessCamera.granted && extraAccessCamera.granted) {
					const selfieImage = await ImagePicker.launchCameraAsync(options);

					if (!selfieImage.canceled) {
						setSelectedImage(selfieImage.assets[0].uri);
						setDisabledBtn(false);
					}
				} else {
					throw new Error('Нет прав доступа к фронтальной камере телефона');
				}
			} catch (error) {
				setSettings({
					...settings,
					modal: {
						visible: true,
						status: 'error',
						title: 'Ошибка подключения к камере',
						message: `Проблема с доступом к камере. ${ error }, проверьте настройки доступа к камере и перезагрузите приложение`
					}
				});

				return;
			}
		} else if (type === 'delete') {
			setSelectedImage('');
			setDisabledBtn(!selectedImage || false);
		}

		setSettings({
			...settings,
			modal: {}
		});
	};
	const openModal = () => {
		setSettings({
			...settings,
			modal: {
				type: 'photo'
			}
		});
	};
	const save = async () => {
		const userData = {
			...settings.person,
			image: selectedImage
		};

		setSettings({
			...settings,
			person: {
				...userData
			}
		});

		try {
			const personString = JSON.stringify(userData);

			await AsyncStorage.setItem('person', personString);
		} catch (error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка сохранения изображения',
					message: `Проблема с записью в хранилище. ${ error }, попробуйте удалить и выбрать изображение снова`
				}
			});

			return;
		}

		navigation.navigate('account');
	};
	const onLayout = ({ nativeEvent }) => {
		setHeightArea(nativeEvent.layout.height);
	};
	const btnText = 'Сохранить';

	useEffect(() => {
		if (modalType !== 'photo') return;

		setSettings({
			...settings,
			modal: {
				visible: true,
				status: 'filter',
				type: 'photo',
				handler: (type) => changePhoto(type)
			}
		});
	}, [modalType]);

	return (
		<Container>
			<Header
				navigation={ navigation }
				leftButton={ leftButton }
				rightButton={ rightButton }
			/>
			<View style={ styles.body }>
				<Pressable style={ styles.wrap } onPress={ () => openModal() }>
					{ selectedImage ?
						<View style={[ styles.background, { width: windowWidth } ]} onLayout={ onLayout }>
							<ImageBackground style={ styles.imageBackground } source={{ uri: selectedImage }} resizeMode="cover">
								<View style={[
										styles.cropArea,
										{
											width: windowWidth,
											height: windowWidth,
											borderRadius: windowWidth / 2
										}
									]}>
									<Image style={{ width: windowWidth, height: heightArea }} source={{ uri: selectedImage }} resizeMode="cover" />
								</View>
								<View style={ styles.cover }>
								</View>
							</ImageBackground>
						</View>
						: <>
							<View style={[
									styles.circle,
									{
										width: windowWidth - 30,
										height: windowWidth - 30,
										borderRadius: (windowWidth - 30) / 2
									}
								]}>
								<View style={ styles.photoIcon }>
									{ photoIcon('#fff') }
								</View>
							</View>
							<Text style={ styles.hint }>Кликни чтобы загрузить</Text>
						</>
					}
				</Pressable>
				<Pressable
					style={[ styles.button, disabledBtn && styles.disabledButton ]}
					onPress={ () => save() }
					disabled={ disabledBtn }
				>
					<Text style={[ styles.buttonText, disabledBtn && styles.disabledText ]}>{ btnText }</Text>
				</Pressable>
			</View>
		</Container>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 15
	},
	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000'
	},
	imageBackground: {
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	cover: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, .4)',
		zIndex: 1
	},
	circle: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	cropArea: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#F2F2F7',
		overflow: 'hidden',
		zIndex: 2
	},
	photoIcon: {
		width: 140,
		height: 112
	},
	hint: {
		textAlign: 'center',
		color: '#fff',
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 14,
		marginTop: 5
	},
	wrap: {
		flex: 1,
		justifyContent: 'center',
		paddingVertical: 15,
	},
	button: {
		width: '100%',
		borderRadius: 17,
		backgroundColor: '#F2F2F3'
	},
	buttonText: {
		fontWeight: '600',
		textAlign: 'center',
		fontSize: 17,
		color: '#1A1E2C',
		paddingVertical: 20,
		paddingHorizontal: 65,
	},
	disabledButton: {
		backgroundColor: "rgba(255, 255, 255, 0.12)"
	},
	disabledText: {
		color: "#fff",
		opacity: 0.5
	}
});
