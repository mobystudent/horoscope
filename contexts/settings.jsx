import { createContext, useState } from 'react';

export const SettingsContext = createContext();

export default function SettingsProvider({ children }) {
	const [ settings, setSettings ] = useState({
		noteMode: 'new', // new, edit, view, clear
		noteFilter: false, // показывание модального окна с фильтрами на странице всех заметок NotesScreen
		noteSettings: false, // показывание модального окна с настройками на странице выбранной заметки CreateNoteScreen
		currentMoonDay: {}, // сегодняшний лунный день
		registered: false, // проверка первый раз пользователь настраивает приложение или нет (при очистке всех данных будет снова первый раз)
		photoSettings: false, // показывание модального окна с настройками на странице загрузки аватара пользователя
		premium: false, // показывает активным/неактивным блок MoonMinder+
		background: 'main', // 'main', 'premium'
		notesList: [], // список всех заметок, нужен для удобной работы с заметками из хранилища
		currentNote: {}, // заметка с которой сейчас работает пользователь
		person: {
			name: '',
			date: '',
			time: '',
			city: '',
			gender: '',
			image: ''
		}, // личные данные пользователя: имя, дата рождения, время, город, пол и фотография
		birthdayMoon: {} // Данные о луне при рождении заполняются при регистрации и хранятся в ассинхронном хранилище
	});

	return (
		<SettingsContext.Provider
			value = {{
				settings,
				setSettings
			}}
		>
			{ children }
		</SettingsContext.Provider>
	);
};
