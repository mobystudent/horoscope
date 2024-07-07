import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../Navigation';
import Modal from './Modal';
import { SettingsContext } from '../contexts/settings';

export default function Loading() {
	const {
		settings: {
			modal = {}
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ firstScreen, setFirstScreen ] = useState('');
	const [ visibleModal, setVisibleModal ] = useState(false);

	useEffect(() => {
		const storagePersonData = async () => {
			try {
				const person = await AsyncStorage.getItem('person');

				setFirstScreen(person === null ? 'name' : 'start');
			} catch(error) {
				setSettings({
					...settings,
					modal: {
						visible: true,
						status: 'error',
						title: 'Ошибка загрузки данных о пользователе',
						message: `Проблема с ответом хранилища. ${ error }, попробуйте перезагрузить приложение`
					}
				});

				return;
			}
		};

		storagePersonData();
	}, []);

	useEffect(() => {
		// if (!Object.keys(modal).length) return;

		setVisibleModal(modal.visible);
	}, [Object.keys(modal).length, modal.visible]);

	return <>
		<Navigation screen={ firstScreen } />
		{ visibleModal && <Modal /> }
	</>;
};
