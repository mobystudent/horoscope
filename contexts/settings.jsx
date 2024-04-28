import { createContext, useState } from 'react';

export const SettingsContext = createContext();

export default function SettingsProvider({ children }) {
	const [ settings, setSettings ] = useState({
		noteMode: 'new', // new, edit, view, clear
		currentMoonDay: {}, // сегодняшний лунный день
		registered: false, // проверка первый раз пользователь настраивает приложение или нет (при очистке всех данных будет снова первый раз)
		premium: false, // показывает активным/неактивным блок MoonMinder+
		background: 'main', // 'main', 'premium'
		notesList: [], // список всех заметок, нужен для удобной работы с заметками из хранилища
		currentNote: {}, // заметка с которой сейчас работает пользователь
		person: {}, // личные данные пользователя: имя, дата рождения, время, город, пол и фотография
		birthdayMoon: {}, // Данные о луне при рождении заполняются при регистрации и хранятся в ассинхронном хранилище
		displayDocument: {}, // Данные о документе который будет отображен в ContentScreen
		monthsRange: {}, // Данные для отображения дней в календаре (число, знак зодиака и фаза луны)
		modal: {} // Хранит в себе настройки модального окна которое будет отображаться
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
