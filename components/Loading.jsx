import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../Navigation';

export default function Loading() {
	const [ readyData, setReadyData ] = useState(false);
	const [ firstScreen, setFirstScreen ] = useState('');

	useEffect(() => {
		const loadData = async () => {
			const storagePersonString = await AsyncStorage.getItem('person');

			setFirstScreen(Boolean(storagePersonString) ? 'start' : 'name');
			setReadyData(true);
		};

		loadData();
	}, []);

	if (!readyData) return;

	return <Navigation screen={ firstScreen } />;
};
