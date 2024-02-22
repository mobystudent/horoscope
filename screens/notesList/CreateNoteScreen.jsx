import { useState, useContext } from 'react';
import { StyleSheet, Text, Pressable, View, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import moment from 'moment';
import Container from '../../components/Container';
import Header from '../../components/Header';
import ModalSettings from '../../components/ModalSettings';
import { SettingsContext } from '../../contexts/settings';

import { observer } from 'mobx-react-lite';
import notesStore from '../../stores/notes.store';

import { arrowSvg, more } from '../../components/SvgSprite';

const CreateNote = observer((props) => {
	const {
		navigation,
		route: {
			params: {
				page = null,
				note: {
					day = null,
					headerTitle = '',
					title = '',
					date = '',
					description = ''
				} = {}
			} = {}
		} = {}
	} = props;
	const { settings, setSettings } = useContext(SettingsContext);
	const [ notes, setNotes ] = useState({
		title: title,
		date: date,
		description: description
	});
	const [ pointer, setPointer ] = useState(0);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const maxLengthTitle = 80;
	const [ countInputWords, setCountInputWords ] = useState(maxLengthTitle);
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
		link: page,
		icon: arrowSvg('#fff', 1)
	};
	const rightButton = {
		btn: 'more',
		icon: more('#fff', 1),
		params: {
			title: title,
			description: description
		}
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
	const save = () => {
		setNotes({
			...notes,
			date: moment().format("DD.MM.YYYY")
		});

		notesStore.add(notes);
	};
	const header = settings.noteMode === 'new' ? 'Новая заметка' : `${headerTitle} ${date}`;
	const readOnly = settings.noteMode === 'view' ? true : false;
	const btnText = 'Сохранить';

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ header }
				leftButton={ leftButton }
				rightButton={ settings.noteMode === 'view' && rightButton }
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
							readOnly={ readOnly }
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
							readOnly={ readOnly }
							onChangeText={ (description) => setDescription(description) }
							onKeyPress={ (event) => checkText(event, 'description') }
							onSelectionChange={ changeSelection }
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
				settingsFunc={ (type) => sortNotes(type) }
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
