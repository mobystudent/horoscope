import { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, TextInput, View, Pressable, Text, KeyboardAvoidingView, Keyboard, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonTemplate from '../../components/PersonTemplate';
import Config from '../../config';
import { SettingsContext } from '../../contexts/settings';

import { closeIcon } from '../../icons/elements';

export default function PlaceScreen({ navigation }) {
	const {
		settings: {
			registered,
			person: {
				place: personPlace = {}
			}
		},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ place, setPlace ] = useState(personPlace);
	const [ country, setCountry ] = useState({});
	const [ availableItems, setAvailableItems ] = useState([]);
	const [ pointer, setPointer ] = useState(0);
	const [ suggestion, setSuggestion ] = useState([]);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ focusedInput, setFocusedInput ] = useState(false);
	const [ editableInput, setEditableInput ] = useState(true);
	const selectItem = (item) => {
		const setStateField = !('id' in country) ? setCountry : setPlace;

		Keyboard.dismiss();
		setStateField(item);
		setSuggestion([]);
	};
	const checkPress = ({ nativeEvent: { key } }) => {
		const field = !('id' in country) ? country : place;
		if (!field.value) return;

		const regex = new RegExp('[а-яА-Я\-Backspace ]');
		const check = regex.test(key);
		const fieldChars = key === 'Backspace'
			? field.value.slice(0, pointer - 1) + field.value.slice(pointer)
			: field.value.slice(0, pointer) + key + field.value.slice(pointer);
		const exceptionLetters = ['k', 'e', 'p', 'c', 'a', 's'];

		if(!check || exceptionLetters.includes(key)) {
			const text = !('id' in country) ? 'Страна должна' : 'Город должен';
			const setStateField = !('id' in country) ? setCountry : setPlace;

			Alert.alert('Не корректный символ', `${ text } содержать только буквенные символы кириллицы или дефис!`, [{
					text: 'OK',
					onPress: () => setStateField(field),
					style: 'cancel',
				}]
			);
		}

		if (fieldChars.length > 2) {
			const newSugges = availableItems.filter((obj) => obj.value.startsWith(fieldChars));
			const filteredItem = newSugges.find((obj) => obj.value.toLowerCase() === fieldChars.toLowerCase());

			if (filteredItem) {
				Keyboard.dismiss();
				setSelectItem(filteredItem);
			} else {
				setDisabledBtn(true);
			}

			filteredItem || setSuggestion(newSugges);
		} else if (fieldChars.length < 3 && key === 'Backspace') {
			setSuggestion([]);
		}
	};
	const checkPastedText = (name) => {
		if (pointer + 2 <= name.length) {
			const lastChar = name[name.length - 1];
			const nameWithoutSpace = lastChar === ' ' ? name.slice(0, name.length - 1) : name;
			const filteredItem = availableItems.find((obj) => obj.value.toLowerCase() === nameWithoutSpace.toLowerCase());

			if (!filteredItem) return;

			setSelectItem({ ...filteredItem, value: nameWithoutSpace });
		} else {
			if (('id' in country && editableInput) || ('id' in place && !disabledBtn)) return;

			const setStateField = !('id' in country) ? setCountry : setPlace;

			setStateField({ value: name });
		}

	};
	const changeSelection = ({ nativeEvent: { selection: { start } } }) => {
		setPointer(start);
	};
	const setSelectItem = (item) => {
		selectItem(item);
		!('id' in country) && getCities(item);
	};
	const getCountries = async () => {
		try {
			fetch(`${ Config.DATABASE_COUNTRIES_URL }`)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Не удалось получить список стран от сервера');
					}

					return response.json();
				})
				.then((countriesData) => {
					if (!Object.keys(countriesData).length) {
						throw new Error(`Данных о странах на сервере не обнаружено`);
					}

					const updatedCountriesData = countriesData.map((item) => {
						const { country_ru, ...rest } = item;

						return { ...rest, value: country_ru };
					});

					setAvailableItems(updatedCountriesData);
				})
				.catch((error) => {
					setSettings({
						...settings,
						modal: {
							visible: true,
							status: 'error',
							title: 'Ошибка загрузки данных',
							message: `Проблема с ответом от сети. ${ error }, попробуйте перезагрузить приложение`
						}
					});
				});
		} catch (error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка подключения к сети',
					message: `Не удалось подключиться к сети. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const getCities = async (item) => {
		try {
			fetch(`${ Config.DATABASE_CITIES_URL }${ item.id }`)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Не удалось получить список городов от сервера');
					}

					return response.json();
				})
				.then((citiesData) => {
					if (!Object.keys(citiesData).length) {
						throw new Error(`Данных о городах на сервере не обнаружено`);
					}

					const updatedCitiesData = citiesData.map((item) => {
						const { city_ru, ...rest } = item;

						return { ...rest, value: city_ru };
					});

					setEditableInput(false);
					setAvailableItems([ ...updatedCitiesData ]);
				})
				.catch((error) => {
					setSettings({
						...settings,
						modal: {
							visible: true,
							status: 'error',
							title: 'Ошибка загрузки данных',
							message: `Проблема с ответом от сети. ${ error }, попробуйте перезагрузить приложение`
						}
					});
				});
		} catch (error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка подключения к сети',
					message: `Не удалось подключиться к сети. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const renderItem = ({ item }) => {
		return (
			<Pressable onPress={ () => setSelectItem(item) }>
				<Text style={ styles.item }>{ item.value }</Text>
			</Pressable>
		);
	};
	const clearCountry = () => {
		setEditableInput(true);
		setCountry({});
		setPlace({});
		getCountries();
	};
	const nextStep = async () => {
		if (disabledBtn) return;

		const userData = {
			...settings.person,
			place
		};

		setSettings({
			...settings,
			person: {
				...userData
			}
		});

		if (registered) {
			try {
				const personString = JSON.stringify(userData);

				await AsyncStorage.setItem('person', personString);
			} catch (error) {
				setSettings({
					...settings,
					modal: {
						visible: true,
						status: 'error',
						title: 'Ошибка сохранения места рождения',
						message: `Проблема с записью в хранилище. ${ error }, попробуйте удалить и ввести город снова`
					}
				});

				return;
			}

			navigation.navigate('account');
		} else {
			navigation.navigate('gender');
		}
	}
	const title = 'Где вы родились?';
	const description = 'Укажите место своего рождения, чтобы адаптировать календарь под ваш географический регион и лунные события';
	const btnText = registered ? 'Сохранить' : 'Далее';

	useEffect(() => {
		getCountries();
	}, []);

	useEffect(() => {
		if (!place.id) return;

		setPlace(place);
		setDisabledBtn(false);
	}, [place.id]);

	return (
		<PersonTemplate
			navigation={ navigation }
			title={ title }
			description={ description }
			btnText={ btnText }
			disabledBtn={ disabledBtn }
			nextStep={ nextStep }
			focusedInput={ focusedInput }
		>
			<KeyboardAvoidingView style={ styles.content } behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } >
				<View style={ styles.wrap }>
					<View style={ styles.inputWrap }>
						<TextInput
							style={[ styles.input, editableInput || styles.inputDisabled ]}
							placeholder="Ввести страну..."
							placeholderTextColor="rgba(255, 255, 255, .5)"
							value={ country.value }
							onChangeText={ (name) => checkPastedText(name) }
							onKeyPress={ (press) => checkPress(press) }
							onSelectionChange={ changeSelection }
							onFocus={ () => setFocusedInput(true) }
							onBlur={ () => setFocusedInput(false) }
							editable={ editableInput }
						/>
						{ !editableInput &&
							<Pressable
								style={ styles.button }
								onPress={ () => clearCountry() }
							>
								<View style={ styles.closeIcon }>
									{ closeIcon('rgba(255, 255, 255, .5)') }
								</View>
							</Pressable>
						}
					</View>
					{ !editableInput &&
						<View style={ styles.inputWrap }>
							<TextInput
								style={ styles.input }
								placeholder="Ввести город..."
								placeholderTextColor="rgba(255, 255, 255, .5)"
								value={ place.value }
								onChangeText={ (name) => checkPastedText(name) }
								onKeyPress={ (press) => checkPress(press) }
								onSelectionChange={ changeSelection }
								onFocus={ () => setFocusedInput(true) }
								onBlur={ () => setFocusedInput(false) }
							/>
						</View>
					}
				</View>
				<FlatList
					data={ suggestion }
					renderItem={ renderItem }
					keyExtractor={ (item) => item.id }
				/>
			</KeyboardAvoidingView>
		</PersonTemplate>
	);
}

const styles = StyleSheet.create({
	content: {
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 'auto',
		rowGap: 25
	},
	wrap: {
		rowGap: 10
	},
	inputWrap: {
		position: 'relative',
		flexShrink: 0
	},
	input: {
		borderRadius: 17,
		paddingHorizontal: 16,
		paddingVertical: 12,
		color: '#fff',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		textAlignVertical: 'center',
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	inputDisabled: {
		paddingRight: 45,
		backgroundColor: 'rgba(255, 255, 255, .5)'
	},
	item: {
		borderRadius: 17,
		paddingHorizontal: 16,
		paddingVertical: 12,
		color: '#fff',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		marginVertical: 3,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	button: {
		position: 'absolute',
		top: 5,
		right: 5,
		width: 42,
		height: 42,
		padding: 10
	}
});
