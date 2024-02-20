import { createContext, useState } from 'react';

export const SettingsContext = createContext();

export default function SettingsProvider({ children }) {
	const [ settings, setSettings ] = useState({
		noteMode: 'new'
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
