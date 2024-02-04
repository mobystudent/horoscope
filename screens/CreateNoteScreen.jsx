import { useState } from 'react';
import { StyleSheet, Text, Pressable, View, TextInput, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';

import { observer } from 'mobx-react-lite';
import notesStore from '../stores/notes.store';
import { arrowSvg } from '../components/SvgSprite';

const CreateNote = observer(({ navigation }) => {
	const [ notes, setNotes ] = useState({
		title: '',
		date: '',
		description: ''
	});
	const [ pointer, setPointer ] = useState(0);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const maxLengthTitle = 80;
	const [ countInputWords, setCountInputWords ] = useState(maxLengthTitle);
	const leftButton = {
		link: 'moon',
		icon: arrowSvg('#fff', 1)
	};
	const checkText = ({ nativeEvent: { key } }, field) => {
		const regex = new RegExp('[а-яА-Я\-Backspace ]');
		const check = regex.test(key);
		const nameChars = key === 'Backspace'
			? notes[field].slice(0, pointer - 1) + notes[field].slice(pointer)
			: notes[field].slice(0, pointer) + key + notes[field].slice(pointer);
		const exceptionLetters = ['k', 'e', 'p', 'c', 'a', 's'];

		if(!check || exceptionLetters.includes(key)) {
			// Alert.alert('Не корректный символ', 'Заголовок должен содержать только буквенные символы кириллицы или дефис!', [{
			// 	text: 'OK',
			// 	onPress: () => setNotes({
			// 		...notes,
			// 		[field]: notes[field]
			// 	}),
			// 	style: 'cancel',
			// }]);
		} else {
			setDisabledBtn(nameChars.length > 1 ? false : true);
		}
	};
	const checkTitleLength = (title) => {
		if (title.length > maxLengthTitle) return;

		setNotes({
			...notes,
			title: title
		});
		setCountInputWords(maxLengthTitle - title.length);
	};
	const setDescription = (description) => {
		setNotes({
			...notes,
			description: description
		});
	};
	const changeSelection = ({ nativeEvent: { selection: { start } } }) => {
		setPointer(start);
	};
	const getDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return `${day}.${month}.${year}`;
	};
	const save = () => {
		setNotes({
			...notes,
			date: getDate()
		});

		notesStore.add(notes);
	};
	const title = 'Новая заметка';
	const btnText = 'Сохранить';

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ title }
				leftButton={ leftButton }
			/>
			<KeyboardAvoidingView style={ styles.content } behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } >
				<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
					<View style={ styles.inputWrap }>
						<TextInput
							multiline
							style={ styles.inputTitle }
							placeholder="Здесь может быть заголовок"
							placeholderTextColor="rgba(255, 255, 255, .5)"
							value={ notes.title }
							onChangeText={ (title) => checkTitleLength(title) }
							onKeyPress={ (event) => checkText(event, 'title') }
							onSelectionChange={ changeSelection }
						/>
						<Text style={ styles.hint }>Осталось { countInputWords } символов</Text>
					</View>
					<View style={ styles.textareaWrap }>
						<TextInput
							multiline
							style={ styles.inputDescription }
							placeholder="Начните свою запись или вставьте текст"
							placeholderTextColor="rgba(255, 255, 255, .5)"
							value={ notes.description }
							onChangeText={ (description) => setDescription(description) }
							onKeyPress={ (event) => checkText(event, 'description') }
							onSelectionChange={ changeSelection }
						/>
					</View>
				</ScrollView>
				<Pressable
					style={[ styles.button, disabledBtn && styles.disabledButton ]}
					onPress={ () => save() }
					disabled={ disabledBtn }
				>
					<Text style={[ styles.buttonText, disabledBtn && styles.disabledText ]}>{ btnText }</Text>
				</Pressable>
			</KeyboardAvoidingView>
		</Container>
	);
});

export default CreateNote;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		rowGap: 15,
		paddingVertical: 15
	},
	body: {
		flex: 1,
	},
	inputWrap: {
		flexShrink: 0,
		marginBottom: 15
	},
	inputTitle: {
		color: '#fff',
		// fontFamily: 'SFBold',
		fontSize: 20,
		lineHeight: 24,
	},
	hint: {
		color: '#fff',
		// fontFamily: 'SFReg',
		fontSize: 12,
		lineHeight: 14,
		marginTop: 5
	},
	textareaWrap: {
		flex: 1
	},
	inputDescription: {
		color: '#fff',
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 24,
	},
	button: {
		borderRadius: 17,
		backgroundColor: '#F2F2F3',
	},
	buttonText: {
		// fontFamily: 'SFSbold',
		textAlign: 'center',
		fontSize: 17,
		color: '#1A1E2C',
		paddingVertical: 20,
		paddingHorizontal: 65,
	},
	disabledButton: {
		backgroundColor: "rgba(255, 255, 255, .12)"
	},
	disabledText: {
		color: "#fff",
		opacity: .5
	}
});
