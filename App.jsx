import * as React from 'react';
import SettingsProvider from './contexts/settings';
import Navigation from './Navigation';
import Loading from './components/Loading';

export default function App() {
	return (
		<SettingsProvider>
			<Loading />
			<Navigation />
		</SettingsProvider>
	);
}
