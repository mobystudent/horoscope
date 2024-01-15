import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Navigation from './Navigation';

export default function App() {
	const [ appIsReady, setAppIsReady ] = useState(false);

	useEffect(() => {
		const loadFonts = async () => {
			await SplashScreen.preventAutoHideAsync();
			await Font.loadAsync({
				'SFBold': require('./assets/fonts/SFProDisplay-Bold.ttf'),
				'SFMed': require('./assets/fonts/SFProDisplay-Medium.ttf'),
				'SFReg': require('./assets/fonts/SFProDisplay-Regular.ttf'),
				'SFSbold': require('./assets/fonts/SFProDisplay-Semibold.ttf')
			});
			setAppIsReady(true);
			await SplashScreen.hideAsync();
		};

		loadFonts();
	}, []);

	if (!appIsReady) {
		return null;
	}

	return (
		<Navigation />
	);
}
