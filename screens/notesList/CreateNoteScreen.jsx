import { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, Pressable, View, TextInput, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Container from '../../components/Container';
import Header from '../../components/Header';
import ModalSettings from '../../components/ModalSettings';
import { SettingsContext } from '../../contexts/settings';

export default function CreateNote (props) {
	const {
		navigation,
		route: {
			params: {
				page = null
			} = {}
		} = {}
	} = props;
	const { settings, setSettings } = useContext(SettingsContext);
	const [ description, setDescription ] = useState('');
	console.log('settings -----------------------------');
	console.log(settings.currentNote);
	console.log(settings.notesList);
	console.log('settings -----------------------------');
	const [ pointer, setPointer ] = useState(0);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ contentActive, setContentActive ] = useState('');
	const descriptionRef = useRef(null);
	const settingsBtns = [
		{
			title: 'Редактировать',
			type: 'edit'
		},
		{
			title: 'Очистить',
			type: 'clear'
		}
	];
	const leftButton = {
		btnAction: 'back',
		screenLink: page,
		type: 'back'
	};
	const rightButton = {
		btnAction: 'more',
		type: 'more'
	};
	const checkText = ({ nativeEvent: { key } }) => {
		const regex = new RegExp('[а-яА-Я\-Backspace ]');
		const check = regex.test(key);
		const nameChars = key === 'Backspace'
			? description.slice(0, pointer - 1) + description.slice(pointer)
			: description.slice(0, pointer) + key + description.slice(pointer);
		const exceptionLetters = ['k', 'e', 'p', 'c', 'a', 's'];

		if(!check || exceptionLetters.includes(key)) {
			// Alert.alert('Не корректный символ', 'Заголовок должен содержать только буквенные символы кириллицы или дефис!', [{
			// 	text: 'OK',
			// 	onPress: () => setNoteElem({
			// 		...noteElem,
			// 		[field]: noteElem[field]
			// 	}),
			// 	style: 'cancel',
			// }]);
		} else {
			setDisabledBtn(nameChars.length > 1 ? false : true);
		}
	};
	const changeSelection = ({ nativeEvent: { selection: { start } } }) => {
		setPointer(start);
	};
	const checkFocus = () => setContentActive(styles.contentActive);
	const checkBlur = () => setContentActive('');
	const save = async () => {
		const updatedNotesList = settings.notesList.map((noteItem) => {
			return noteItem.day === settings.currentNote.day ? {
				day: settings.currentNote.day,
				date: settings.noteMode !== 'clear' && moment().format("DD.MM.YYYY"),
				description
			} : noteItem;
		});

		console.log('updatedNotesList ==========================');
		console.log(updatedNotesList);
		console.log('updatedNotesList ==========================');

		try {
			const notesString = JSON.stringify(updatedNotesList);

			await AsyncStorage.setItem('notesArray', notesString);

			navigation.navigate(page);
			setSettings({
				...settings,
				notesList: updatedNotesList,
				currentNote: {}
			});
			setDescription('');
		} catch (e) {
			console.error(e);
		}
	};
	const header = settings.noteMode === 'new' || settings.noteMode === 'clear' ? 'Новая заметка' : `Заметка от ${settings.currentNote.date}`;
	const btnText = 'Сохранить';
	const changeNote = (type) => {
		setSettings({
			...settings,
			noteMode: type,
			noteSettings: false
		});

		if (type === 'clear') {
			setDescription('');
			setDisabledBtn(false);
		}
	};

	useEffect(() => {
		if (settings.noteMode === 'edit') {
			descriptionRef.current.focus();
		}
	}, [settings.noteMode]);

	useEffect(() => {
		setDescription(settings.currentNote.description || '');
	}, [settings.currentNote]);

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ header }
				leftButton={ leftButton }
				rightButton={ settings.noteMode === 'view' && rightButton }
			/>
			<KeyboardAvoidingView style={[ styles.content, contentActive ]} behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } >
				<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
					<Text style={ styles.title }>{ settings.currentNote.day }-й лунный день</Text>
					<View style={ styles.textareaWrap }>
						<TextInput
							multiline
							style={ styles.inputDescription }
							placeholder="Начните свою запись или вставьте текст"
							placeholderTextColor="rgba(255, 255, 255, .5)"
							value={ description }
							readOnly={ settings.noteMode === 'view' }
							onChangeText={ (text) => setDescription(text) }
							onKeyPress={ (event) => checkText(event) }
							onSelectionChange={ (event) => changeSelection(event) }
							onFocus={ () => checkFocus() }
							onBlur={ () => checkBlur() }
							ref={ descriptionRef }
						/>
					</View>
				</ScrollView>
				<Pressable
					style={[ styles.saveButton, disabledBtn && styles.disabledButton ]}
					onPress={ () => save() }
					disabled={ disabledBtn }
				>
					<Text style={[ styles.buttonText, disabledBtn && styles.disabledText ]}>{ btnText }</Text>
				</Pressable>
			</KeyboardAvoidingView>
			<ModalSettings
				buttons={ settingsBtns }
				settingsFunc={ (type) => changeNote(type) }
				settingsProp="noteSettings"
				alertMess="Модальное окно с настройками будет закрыто"
			/>
		</Container>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		rowGap: 15,
		paddingTop: 15,
		paddingBottom: 45
	},
	contentActive: {
		paddingBottom: 15
	},
	body: {
		flex: 1
	},
	title: {
		color: '#fff',
		// fontFamily: 'SFSBold',
		fontSize: 34,
		lineHeight: 40,
		marginBottom: 15
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
	saveButton: {
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
