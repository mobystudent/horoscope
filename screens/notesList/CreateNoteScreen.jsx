import { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, Pressable, View, TextInput, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import moment from 'moment';
import Container from '../../components/Container';
import Header from '../../components/Header';
import ModalSettings from '../../components/ModalSettings';
import { SettingsContext } from '../../contexts/settings';

import { observer } from 'mobx-react-lite';
import notesStore from '../../stores/notes.store';

const CreateNote = observer((props) => {
	const {
		navigation,
		route: {
			params: {
				page = null,
				note: {
					day,
					date = '',
					description = ''
				} = {}
			} = {}
		} = {}
	} = props;
	const { settings, setSettings } = useContext(SettingsContext);
	const [ noteElem, setNoteElem ] = useState({
		date: date,
		description: description
	});
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
		screenLink: page,
		type: 'back'
	};
	const rightButton = {
		btnAction: 'more',
		type: 'more',
		params: {
			description: description
		}
	};
	const checkText = ({ nativeEvent: { key } }) => {
		const regex = new RegExp('[а-яА-Я\-Backspace ]');
		const check = regex.test(key);
		const nameChars = key === 'Backspace'
			? noteElem.description.slice(0, pointer - 1) + noteElem.description.slice(pointer)
			: noteElem.description.slice(0, pointer) + key + noteElem.description.slice(pointer);
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
	const setDescription = (description) => {
		setNoteElem({
			...noteElem,
			description: description
		});
	};
	const changeSelection = ({ nativeEvent: { selection: { start } } }) => {
		setPointer(start);
	};
	const checkFocus = () => setContentActive(styles.contentActive);
	const checkBlur = () => setContentActive('');
	const save = () => {
		setNoteElem({
			...noteElem,
			date: moment().format("DD.MM.YYYY")
		});

		notesStore.add(noteElem);
	};
	const header = settings.noteMode === 'new' || settings.noteMode === 'clear' ? 'Новая заметка' : `Заметка от ${date}`;
	const btnText = 'Сохранить';
	const changeNote = (type) => {
		setSettings({
			...settings,
			noteMode: type,
			noteSettings: false
		});

		if (type === 'clear') {
			setNoteElem({
				...noteElem,
				description: ''
			});
			setDisabledBtn(false);
		}
	};

	useEffect(() => {
		if (settings.noteMode === 'edit') {
			descriptionRef.current.focus();
		}
	}, [settings.noteMode]);

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
					<Text style={ styles.title }>{ day }-й лунный день</Text>
					<View style={ styles.textareaWrap }>
						<TextInput
							multiline
							style={ styles.inputDescription }
							placeholder="Начните свою запись или вставьте текст"
							placeholderTextColor="rgba(255, 255, 255, .5)"
							value={ noteElem.description }
							readOnly={ settings.noteMode === 'view' }
							onChangeText={ (description) => setDescription(description) }
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
});

export default CreateNote;

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
