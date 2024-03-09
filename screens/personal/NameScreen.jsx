import { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonTemplate from '../../components/PersonTemplate';
import { SettingsContext } from '../../contexts/settings';

export default function NameScreen({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ name, setName ] = useState(settings.person.name);
	const [ pointer, setPointer ] = useState(0);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
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

		setName(name);
		setCountInputWords(maxLengthName - name.length);
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

		if (settings.registered) {
			try {
				const personString = JSON.stringify(userData);

				await AsyncStorage.setItem('person', personString);
			} catch (e) {
				console.error(e);
			}

			navigation.navigate('account');
		} else {
			navigation.navigate('time');
		}
	}
	const title = 'Как вас зовут?';
	const description = 'Введите своё имя, чтобы создать персональный профиль и получать индивидуальные рекомендации лунного календаря';
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
						placeholder="Имя…"
						placeholderTextColor="rgba(255, 255, 255, .5)"
						value={ name }
						onChangeText={ (name) => checkNameLength(name) }
						onKeyPress={ (event) => checkText(event) }
						onSelectionChange={ changeSelection }
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
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		textAlignVertical: 'center',
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	hint: {
		color: '#fff',
		// fontFamily: 'SFReg',
		fontSize: 12,
		lineHeight: 14,
		marginTop: 5
	},
});
