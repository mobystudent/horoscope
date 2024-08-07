import { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, TextInput, View, Pressable, Text, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config';
import PersonTemplate from '../../components/PersonTemplate';
import { SettingsContext } from '../../contexts/settings';
import axios from 'axios';

import { closeIcon } from '../../icons/elements';

export default function CityScreen({ navigation }) {
	const {
		settings: {
			registered,
			basic: {
				city: basicCity = {}
			}
		},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ city, setCity ] = useState(basicCity);
	const [ country, setCountry ] = useState({});
	const [ timezone, setTimezone ] = useState('');
	const [ availableItems, setAvailableItems ] = useState([]);
	const [ pointer, setPointer ] = useState(0);
	const [ suggestion, setSuggestion ] = useState([]);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ focusedInput, setFocusedInput ] = useState(false);
	const [ editableInput, setEditableInput ] = useState(true);
	const selectItem = (item) => {
		const setStateField = !('id' in country) ? setCountry : setCity;

		Keyboard.dismiss();
		setStateField(item);
		setSuggestion([]);
	};
	const checkPress = ({ nativeEvent: { key } }) => {
		const field = !('id' in country) ? country : city;
		if (!field.value) return;

		const regex = new RegExp('[а-яА-Я\-Backspace ]');
		const check = regex.test(key);
		const fieldChars = key === 'Backspace'
			? field.value.slice(0, pointer - 1) + field.value.slice(pointer)
			: field.value.slice(0, pointer) + key + field.value.slice(pointer);
		const exceptionLetters = ['k', 'e', 'p', 'c', 'a', 's'];

		if(!check || exceptionLetters.includes(key)) {
			const text = !('id' in country) ? 'Страна должна' : 'Город должен';
			const setStateField = !('id' in country) ? setCountry : setCity;

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
			if (('id' in country && editableInput) || ('id' in city && !disabledBtn)) return;

			const setStateField = !('id' in country) ? setCountry : setCity;

			setStateField({ value: name });
		}

	};
	const changeSelection = ({ nativeEvent: { selection: { start } } }) => {
		setPointer(start);
	};
	const setSelectItem = (item) => {
		selectItem(item);
		!('id' in country) ? getCities(item) : getTimezone(item);
	};
	const getCountries = async () => {
		try {
			fetch(`https://api-moon.digitalynx.org/api/country/`)
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
			fetch(`https://api-moon.digitalynx.org/api/city/${ item.id }`)
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
	const getTimezone = async ({ lat, lng }) => {
		const timestamp = Math.floor(Date.now() / 1000);

		try {
			axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${ lat },${ lng }&timestamp=${ timestamp }&key=${ Config.GOOGLE_MAPS_API_KEY }`)
				.then((response) => {
					if (!response.data.status === 'OK') {
						throw new Error('Не удалось получить таймзону введенного города от сервера');
					}

					return response.data.timeZoneId;
				})
				.then((timezoneData) => {
					if (!timezoneData) {
						throw new Error(`Данных о таймзоне на сервере не обнаружено`);
					}

					setTimezone(timezoneData);
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
		setCity({});
		getCountries();
	};
	const nextStep = async () => {
		if (disabledBtn) return;

		const basicData = {
			...settings.basic,
			city
		};

		setSettings({
			...settings,
			basic: {
				...basicData
			}
		});

		if (registered) {
			try {
				const basicString = JSON.stringify(basicData);

				await AsyncStorage.setItem('basic', basicString);
			} catch (error) {
				setSettings({
					...settings,
					modal: {
						visible: true,
						status: 'error',
						title: 'Ошибка сохранения города проживания',
						message: `Проблема с записью в хранилище. ${ error }, попробуйте удалить и ввести город снова`
					}
				});

				return;
			}

			navigation.navigate('account');
		} else {
			navigation.navigate('date');
		}
	}
	const title = 'Где вы проживаете?';
	const description = 'Укажите город вашего проживания, чтобы получать актуальные лунные события под ваше нынешнее место нахождение';
	const btnText = registered ? 'Сохранить' : 'Далее';

	useEffect(() => {
		getCountries();
	}, []);

	useEffect(() => {
		if (!city.id || !timezone) return;

		setCity({ ...city, timezone: timezone });
		setDisabledBtn(false);
	}, [city.id, timezone]);

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
									{ closeIcon('#f00') }
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
								value={ city.value }
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
		flexShrink: 0,
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
