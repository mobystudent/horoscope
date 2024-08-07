import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonTemplate from '../../components/PersonTemplate';
import { SettingsContext } from '../../contexts/settings';

export default function NameScreen({ navigation }) {
	const {
		settings: {
			registered,
			person: {
				name: personName = ''
			}
		},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ name, setName ] = useState(personName);
	const [ pointer, setPointer ] = useState(0);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ focusedInput, setFocusedInput ] = useState(false);
	const maxLengthName = 16;
	const [ countInputWords, setCountInputWords ] = useState(maxLengthName);
	const checkText = ({ nativeEvent: { key } }) => {
		if (!name) return;

		const regex = new RegExp('[а-яА-Я\-Backspace ]');
		const check = regex.test(key);
		const nameChars = key === 'Backspace'
			? name.slice(0, pointer - 1) + name.slice(pointer)
			: name.slice(0, pointer) + key + name.slice(pointer);
		const exceptionLetters = ['k', 'e', 'p', 'c', 'a', 's'];

		if(!check || exceptionLetters.includes(key)) {
			Alert.alert('Не корректный символ', 'Имя должно содержать только буквенные символы кириллицы или дефис!', [{
				text: 'OK',
				onPress: () => setName(name),
				style: 'cancel',
			}]);
		} else {
			setDisabledBtn(nameChars.length > 1 ? false : true);
		}
	};
	const checkNameLength = (name) => {
		if (name.length > maxLengthName) return;

		if (pointer + 2 <= name.length) {
			const lastChar = name[name.length - 1];
			const nameWithoutSpace = lastChar === ' ' ? name.slice(0, name.length - 1) : name;

			setName(nameWithoutSpace);
			setCountInputWords(maxLengthName - nameWithoutSpace.length);
		} else {
			setName(name);
			setCountInputWords(maxLengthName - name.length);
		}
	};
	const changeSelection = ({ nativeEvent: { selection: { start } } }) => {
		setPointer(start);
	};
	const nextStep = async () => {
		if (disabledBtn) return;

		const userData = {
			...settings.person,
			name
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
						title: 'Ошибка сохранения имени',
						message: `Проблема с записью в хранилище. ${ error }, попробуйте удалить и ввести имя снова`
					}
				});

				return;
			}

			navigation.navigate('account');
		} else {
			navigation.navigate('city');
		}
	}
	const title = 'Как вас зовут?';
	const description = 'Введите своё имя, чтобы создать персональный профиль и получать индивидуальные рекомендации лунного календаря';
	const btnText = registered ? 'Сохранить' : 'Далее';

	useEffect(() => {
		if (name !== personName) {
			setName(personName);
		}
	}, [settings]);

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
						placeholder="Имя…"
						placeholderTextColor="rgba(255, 255, 255, .5)"
						value={ name }
						onChangeText={ (name) => checkNameLength(name) }
						onKeyPress={ (event) => checkText(event) }
						onSelectionChange={ changeSelection }
						onFocus={ () => setFocusedInput(true) }
						onBlur={ () => setFocusedInput(false) }
					/>
					<Text style={ styles.hint }>Осталось { countInputWords } символов</Text>
				</View>
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
	hint: {
		color: '#fff',
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 14,
		marginTop: 5
	},
});
