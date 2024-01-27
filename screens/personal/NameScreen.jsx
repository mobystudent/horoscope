import { useState } from 'react';
import { StyleSheet, TextInput, View, KeyboardAvoidingView, Alert } from 'react-native';
import PersonalTemplate from '../../components/PersonalTemplate';

export default function NameScreen({ navigation }) {
	const [ name, setName ] = useState('');
	const [ pointer, setPointer ] = useState(0);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const checkText = ({ nativeEvent: { key } }) => {
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
	const changeSelection = ({ nativeEvent: { selection: { start } } }) => {
		setPointer(start);
	};
	const nextStep = () => {
		if (!disabledBtn) {
			navigation.navigate('time');
		}
	}
	const title = 'Как вас зовут?';
	const description = 'Введите своё имя, чтобы создать персональный профиль и получать индивидуальные рекомендации лунного календаря';
	const btnText = 'Далее';

	return (
		<PersonalTemplate
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
						placeholderTextColor="rgba(255, 255, 255, 0.5)"
						value={ name }
						onChangeText={ setName }
						onKeyPress={ (press) => checkText(press) }
						onSelectionChange={ changeSelection }
					/>
				</View>
			</KeyboardAvoidingView>
		</PersonalTemplate>
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
		backgroundColor: 'rgba(255, 255, 255, 0.12)'
	},
});
