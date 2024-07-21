import { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, TextInput, View, Pressable, Text, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonTemplate from '../../components/PersonTemplate';
import { SettingsContext } from '../../contexts/settings';

export default function CityScreen({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ city, setCity ] = useState(settings.person.city || { id: 0, value: '' });
	const [ availableCities, setAvailableCities ] = useState([]);
	const [ pointer, setPointer ] = useState(0);
	const [ suggestion, setSuggestion ] = useState([]);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ focusedInput, setFocusedInput ] = useState(false);
	const selectItem = ({ id, value, lat, lng }) => {
		setCity({ id, value });
		setSuggestion([]);
		setDisabledBtn(false);
		setSettings({
			...settings,
			cityCoords: {
				lat,
				lng
			}
		});
		Keyboard.dismiss();
	};
	const emptyFilter = ({ nativeEvent: { key } }) => {
		if (!city.value) return;

		const regex = new RegExp('[а-яА-Я\-Backspace ]');
		const check = regex.test(key);
		const cityChars = key === 'Backspace'
			? city.value.slice(0, pointer - 1) + city.value.slice(pointer)
			: city.value.slice(0, pointer) + key + city.value.slice(pointer);
		const exceptionLetters = ['k', 'e', 'p', 'c', 'a', 's'];

		if(!check || exceptionLetters.includes(key)) {
			Alert.alert('Не корректный символ', 'Город должен содержать только буквенные символы кириллицы или дефис!', [{
					text: 'OK',
					onPress: () => setCity(city),
					style: 'cancel',
				}]
			);
		} else {
			if (cityChars.length > 2) {
				const newSugges = availableCities.filter((obj) => obj.city_ru.startsWith(cityChars));
				const filteredCity = availableCities.find((obj) => obj.city_ru.toLowerCase() === cityChars.toLowerCase());

				if (key !== 'Backspace' && filteredCity) {
					const { city_ru: value } = filteredCity;

					Keyboard.dismiss();
					selectItem({ ...filteredCity, value });
				} else {
					setDisabledBtn(true);
				}

				filteredCity || setSuggestion(newSugges);
			} else if (cityChars.length < 3 && key === 'Backspace') {
				setSuggestion([]);
			}
		}
	};
	const checkPastedText = (name) => {
		if (pointer + 2 <= name.length) {
			const lastChar = name[name.length - 1];
			const nameWithoutSpace = lastChar === ' ' ? name.slice(0, name.length - 1) : name;
			const filteredCity = availableCities.find((obj) => obj.city_ru.toLowerCase() === nameWithoutSpace.toLowerCase());

			if (filteredCity) {
				const { city_ru: value } = filteredCity;

				selectItem({ ...filteredCity, value });
			}

			setCity({ ...city, value: nameWithoutSpace });
		} else {
			setCity({ ...city, value: name });
		}

	};
	const changeSelection = ({ nativeEvent: { selection: { start } } }) => {
		setPointer(start);
	};
	const getCountries = async () => {
		try {
			const countryCode = 19;

			fetch(`https://api-moon.digitalynx.org/api/city/${ countryCode }`)
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

					setAvailableCities(citiesData);
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
	const renderItem = (({ item }) => {
		const { city_ru: value } = item;

		return (
			<Pressable onPress={ () => selectItem({ ...item, value }) }>
				<Text style={ styles.item }>{ value }</Text>
			</Pressable>
		);
	});
	const nextStep = async () => {
		if (disabledBtn) return;

		const userData = {
			...settings.person,
			city
		};

		setSettings({
			...settings,
			person: {
				...userData
			}
		});

		if (settings.registered) {
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
	const btnText = settings.registered ? 'Сохранить' : 'Далее';

	useEffect(() => {
		getCountries();
	}, []);

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
				<View style={ styles.inputWrap }>
					<TextInput
						style={ styles.input }
						placeholder="Ввести город..."
						placeholderTextColor="rgba(255, 255, 255, 0.5)"
						value={ city.value }
						onChangeText={ (name) => checkPastedText(name) }
						onKeyPress={ (press) => emptyFilter(press) }
						onSelectionChange={ changeSelection }
						onFocus={ () => setFocusedInput(true) }
						onBlur={ () => setFocusedInput(false) }
					/>
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
	inputWrap: {
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
	}
});
