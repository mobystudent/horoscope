import { createContext, useState } from 'react';

export const SettingsContext = createContext();

export default function SettingsProvider({ children }) {
	const [ settings, setSettings ] = useState({
		noteMode: 'new', // new, edit, view, clear
		noteFilter: false, // показывание модального окна с фильтрами на странице всех заметок NotesScreen
		noteSettings: false, // показывание модального окна с настройками на странице выбранной заметки CreateNoteScreen
		currentDayMoon: 5, // сегодняшний лунный день
		personalMode: 'new', // new, edit
		photoSettings: false, // показывание модального окна с настройками на странице загрузки аватара пользователя
		premium: false // показывает активным/неактивным блок MoonMinder+
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
