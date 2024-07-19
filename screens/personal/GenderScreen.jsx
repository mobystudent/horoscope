import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonTemplate from '../../components/PersonTemplate';
import { SettingsContext } from '../../contexts/settings';

import { maleIcon, femaleIcon } from '../../icons/elements';

export default function GenderScreen({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ gender, setGender ] = useState(settings.person.gender);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const genderBtns = [
		{
			title: 'Мужской',
			icon: maleIcon,
			style: 'maleIcon'
		},
		{
			title: 'Женский',
			icon: femaleIcon,
			style: 'femaleIcon'
		}
	];
	const activeGender = (genderActive) => {
		setGender(genderActive);
		setDisabledBtn(false);
	};
	const nextStep = async () => {
		if (disabledBtn) return;

		const userData = {
			...settings.person,
			gender
		};

		setSettings({
			...settings,
			person: {
				...userData
			}
		});

		if (settings.registered) {
			try {
				const personString = JSON.stringify(userData);

				await AsyncStorage.setItem('person', personString);
			} catch (error) {
				setSettings({
					...settings,
					modal: {
						visible: true,
						status: 'error',
						title: 'Ошибка сохранения пола',
						message: `Проблема с записью в хранилище. ${ error }, попробуйте выбрать пол снова`
					}
				});

				return;
			}

			navigation.navigate('account');
		} else {
			navigation.navigate('processing');
		}
	}
	const title = 'Ваш пол:';
	const description = 'Мы настроем персональные рекомендации лунного календаря, учитывая влияние лунных фаз на биоритмы';
	const btnText = 'Сохранить';
	const genderBlocks = genderBtns.map(({ title, icon, style }) => {
		return (
			<View style={ styles.block } key={ title }>
				<Pressable style={ [styles.square, gender === title && styles.active] } onPress={ () => activeGender(title) }>
					<View style={ styles[style] }>
						{ icon('#fff') }
					</View>
				</Pressable>
				<Text style={ styles.text }>{ title }</Text>
			</View>
		);
	});

	useEffect(() => {
		if (gender !== settings.person.gender) {
			setGender(settings.person.gender);
		}
	}, [settings]);

	return (
		<PersonTemplate
			navigation={ navigation }
			title={ title }
			description={ description }
			btnText={ btnText }
			disabledBtn={ disabledBtn }
			nextStep={ nextStep }
		>
			<View style={ styles.content }>
				{ genderBlocks }
			</View>
		</PersonTemplate>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'row',
		columnGap: 10
	},
	block: {
		flex: 1,
		alignContent: 'center'
	},
	square: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		maxWidth: 210,
		maxHeight: 165,
		borderWidth: 1,
		borderColor: 'transparent',
		borderRadius: 17,
		marginBottom: 10,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	maleIcon: {
		width: 43,
		height: 42
	},
	femaleIcon: {
		width: 31,
		height: 49
	},
	text: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		color: '#fff'
	},
	active: {
		borderColor: '#fff'
	}
});
