import { useState } from 'react';
import { StyleSheet, TextInput, View, KeyboardAvoidingView, Alert } from 'react-native';

export default function NameScreen(props) {
	const { getData } = props;
	const [ name, setName ] = useState('');
	const [ pointer, setPointer ] = useState(0);
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
			if (nameChars.length > 1) {
				getData(nameChars);
			} else {
				getData(false);
			}
		}
	};
	const changeSelection = ({ nativeEvent: { selection: { start } } }) => {
		setPointer(start);
	};

	return (
		<KeyboardAvoidingView style={ styles.wrap } behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } >
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
	);
}

const styles = StyleSheet.create({
	wrap: {
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
