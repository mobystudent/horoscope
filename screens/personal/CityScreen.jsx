import { useState, useContext } from 'react';
import { StyleSheet, FlatList, TextInput, View, Pressable, Text, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonTemplate from '../../components/PersonTemplate';
import { SettingsContext } from '../../contexts/settings';

export default function CityScreen({ navigation }) {
	const data = [
		{ title: 'Париж' },
		{ title: 'Марсель' },
		{ title: 'Лион' },
		{ title: 'Тулуза' },
		{ title: 'Ницца' },
		{ title: 'Нант' },
		{ title: 'Страсбург' },
		{ title: 'Монпелье' },
		{ title: 'Бордо' },
		{ title: 'Лилль' },
		{ title: 'Рейн' },
		{ title: 'Реймс' },
		{ title: 'Рубе' },
		{ title: 'Туркуэн' }
	];
	const { settings, setSettings } = useContext(SettingsContext);
	const [ city, setCity ] = useState(settings.person.city);
	const [ pointer, setPointer ] = useState(0);
	const [ suggestion, setSuggestion ] = useState([]);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const selectItem = (item) => {
		setCity(item);
		setSuggestion([]);
		setDisabledBtn(false);
		Keyboard.dismiss();
	};
	const emptyFilter = ({ nativeEvent: { key } }) => {
		if (!city) return;

		const regex = new RegExp('[а-яА-Я\-Backspace ]');
		const check = regex.test(key);
		const cityChars = key === 'Backspace'
			? city.slice(0, pointer - 1) + city.slice(pointer)
			: city.slice(0, pointer) + key + city.slice(pointer);
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
				const newSugges = data.filter((item) => item.title.startsWith(cityChars));
				const filteredCity = data.find((item) => item.title.toLowerCase() === cityChars.toLowerCase());

				if (key !== 'Backspace') {
					filteredCity && Keyboard.dismiss();
				}

				setSuggestion(newSugges);
			} else if (cityChars.length < 3 && key === 'Backspace') {
				setSuggestion([]);
			}
		}
	};
	const changeSelection = ({ nativeEvent: { selection: { start } } }) => {
		setPointer(start);
	};
	const renderItem = (({ item }) => (
		<Pressable onPress={ () => selectItem(item.title) }>
			<Text style={ styles.item }>{item.title}</Text>
		</Pressable>
	));
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

	return (
		<PersonTemplate
			navigation={ navigation }
			title={ title }
			description={ description }
			btnText={ btnText }
			disabledBtn={ disabledBtn }
			nextStep={ nextStep }
		>
			<KeyboardAvoidingView style={ styles.content } behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } >
				<View style={ styles.inputWrap }>
					<TextInput
						style={ styles.input }
						placeholder="Ввести город..."
						placeholderTextColor="rgba(255, 255, 255, 0.5)"
						value={ city }
						onChangeText={ setCity }
						onKeyPress={ (press) => emptyFilter(press) }
						onSelectionChange={ changeSelection }
					/>
				</View>
				<FlatList
					data={ suggestion }
					renderItem={ renderItem }
					keyExtractor={ item => item.title }
					style={ styles.list }
				/>
			</KeyboardAvoidingView>
		</PersonTemplate>
	);
}

const styles = StyleSheet.create({
	content: {
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
