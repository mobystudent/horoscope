import { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, Pressable, View, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Container from '../../components/Container';
import Header from '../../components/Header';
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
	const {
		settings: {
			noteMode = '',
			currentNote = {},
			notesList = [],
			modal: {
				type: modalType = ''
			} = {}
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ description, setDescription ] = useState('');
	console.log('settings -----------------------------');
	console.log(currentNote);
	console.log(notesList);
	console.log('settings -----------------------------');
	const [ pointer, setPointer ] = useState(0);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ contentActive, setContentActive ] = useState('');
	const descriptionRef = useRef(null);
	const leftButton = {
		screenLink: page,
		btnAction: 'back',
		type: 'back'
	};
	const rightButton = {
		btnAction: 'note',
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
		const updatedNotesList = notesList.map((noteItem) => {
			return noteItem.day === currentNote.day ? {
				day: currentNote.day,
				date: description && moment().format("DD.MM.YYYY"),
				description
			} : noteItem;
		});

		try {
			const notesString = JSON.stringify(updatedNotesList);

			await AsyncStorage.setItem('notesList', notesString);

			navigation.navigate(page);
			setSettings({
				...settings,
				notesList: updatedNotesList,
				currentNote: {}
			});
			setDescription('');
		} catch (error) {
			setSettings({
				...settings,
				modal: {
					visible: true,
					status: 'error',
					title: 'Ошибка сохраненния списка заметок',
					message: `Проблема с записью в хранилище. ${ error }, попробуйте перезагрузить приложение`
				}
			});

			return;
		}
	};
	const header = noteMode === 'new' ? 'Новая заметка' : `Заметка от ${ currentNote.date }`;
	const btnText = 'Сохранить';
	const changeNote = (type) => {
		setSettings({
			...settings,
			noteMode: type,
			modal: {}
		});

		if (type === 'clear') {
			setDescription('');
			setDisabledBtn(false);
		}
	};

	useEffect(() => {
		if (noteMode === 'edit') {
			setTimeout(() => {
				descriptionRef.current.focus();
			}, 0);
		}
	}, [noteMode]);

	useEffect(() => {
		setDescription(currentNote.description || '');
	}, [currentNote]);

	useEffect(() => {
		if (modalType !== 'note') return;

		setSettings({
			...settings,
			modal: {
				visible: true,
				status: 'filter',
				type: 'note',
				handler: (type) => changeNote(type)
			}
		});
	}, [modalType]);

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ header }
				leftButton={ leftButton }
				rightButton={ (noteMode === 'view' || noteMode === 'edit') && rightButton }
			/>
			<KeyboardAvoidingView style={[ styles.content, contentActive ]} behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } >
				<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
					<Text style={ styles.title }>{ currentNote.day }-й лунный день</Text>
					<View style={ styles.textareaWrap }>
						<TextInput
							multiline
							style={ styles.inputDescription }
							placeholder="Начните свою запись или вставьте текст"
							placeholderTextColor="rgba(255, 255, 255, .5)"
							value={ description }
							editable={ noteMode !== 'view' }
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
		fontWeight: '600',
		fontSize: 34,
		lineHeight: 40,
		marginBottom: 15
	},
	textareaWrap: {
		flex: 1
	},
	inputDescription: {
		color: '#fff',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 24,
	},
	saveButton: {
		borderRadius: 17,
		backgroundColor: '#F2F2F3',
	},
	buttonText: {
		fontWeight: '600',
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
