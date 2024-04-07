import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import Navigation from '../Navigation';

export default function Loading() {
	const [ readyData, setReadyData ] = useState(false);
	const [ firstScreen, setFirstScreen ] = useState('');

	useEffect(() => {
		const loadData = async () => {
			const storagePersonString = await AsyncStorage.getItem('person');

			await Font.loadAsync({
				'SFBold': require('../assets/fonts/SFProDisplay-Bold.ttf'),
				'SFMed': require('../assets/fonts/SFProDisplay-Medium.ttf'),
				'SFReg': require('../assets/fonts/SFProDisplay-Regular.ttf'),
				'SFSbold': require('../assets/fonts/SFProDisplay-Semibold.ttf')
			});

			setFirstScreen(Boolean(storagePersonString) ? 'start' : 'name');
			setReadyData(true);
		};

		loadData();
	}, []);
	if (!readyData) return;

	return <Navigation screen={ firstScreen } />;
};
