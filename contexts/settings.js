import { createContext, useState } from 'react';

export const SettingsContext = createContext();

export default function SettingsProvider({ children }) {
	const [ settings, setSettings ] = useState({
		noteMode: 'new',
		noteFilter: false,
		noteSettings: false,
		todayDayMoon: 5
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
