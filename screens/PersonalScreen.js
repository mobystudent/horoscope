import { useState, useEffect } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import NameScreen from './personal/NameScreen';
import TimeScreen from './personal/TimeScreen';
import CityScreen from './personal/CityScreen';
import GenderScreen from './personal/GenderScreen';
import Container from './Container';

export default function Personal({ navigation }) {
	const [ screen, setScreen ] = useState(2);
	const [ person, setPerson ] = useState({
		name: '',
		date: '',
		time: '12h00m',
		city: '',
		gender: ''
	});
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const content = [
		{
			title: 'Как вас зовут?',
			description: 'Введите своё имя, чтобы создать персональный профиль и получать индивидуальные рекомендации лунного календаря',
			btnText: 'Далее'
		},
		{
			title: 'Когда у вас день рождение?',
			description: 'Укажите дату своего рождения, чтобы получить доступ к астрологическому анализу и лунным фазам, влияющим на вас',
			btnText: 'Далее'
		},
		{
			title: 'Во сколько вы родились?',
			description: 'Введите время своего рождения, чтобы получить более точные прогнозы лунного влияния на различные сферы вашей жизни',
			btnText: 'Далее'
		},
		{
			title: 'Где вы родились?',
			description: 'Укажите место своего рождения, чтобы адаптировать календарь под ваш географический регион и лунные события',
			btnText: 'Далее'
		},
		{
			title: 'Ваш пол:',
			description: 'Мы настроем персональные рекомендации лунного календаря, учитывая влияние лунных фаз на биоритмы',
			btnText: 'Сохранить'
		},
	];
	const getData = ([ key, value ]) => {
		// console.log({ ...validValue })
		console.warn(key);
		console.error(value);
		if (value) {
			setPerson({
				...person,
				[key]: value
			});
		}

		setDisabledBtn(!value);
	};

	useEffect(() => {
	// 	// if (person )
	// 	// setPerson(person);
		console.log(screen);

	}, [screen]);

	return (
		<Container>
			<View style={ styles.header }></View>
			<View style={ styles.body }>
				<Text style={ styles.title }>{ content[screen].title }</Text>
				<Text style={ styles.text }>{ content[screen].description }</Text>
				<View style={ styles.wrap }>
					{ screen === 0 && <NameScreen getData={ (value) => getData(['name', value]) } /> }
					{ screen === 2 && <TimeScreen getData={ (value) => getData(['time', value]) } /> }
					{ screen === 3 && <CityScreen getData={ (value) => getData(['city', value]) } /> }
					{ screen === 4 && <GenderScreen getData={ (value) => getData(['gender', value]) } /> }
				</View>
				<Pressable
					style={[ styles.button, disabledBtn && styles.disabledButton ]}
					onPress={ () => setScreen(screen + 1) }
					disabled={ disabledBtn }
				>
					<Text style={[ styles.buttonText, disabledBtn && styles.disabledText ]}>{ content[screen].btnText }</Text>
				</Pressable>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	header: {
		height: 90
	},
	body: {
		flex: 1
	},
	wrap: {
		flex: 1,
		marginBottom: 100,
		minHeight: 120
	},
	title: {
		color: '#fff',
		textAlign: 'center',
		// fontFamily: 'SFBold',
		fontSize: 34,
		marginBottom: 15
	},
	text: {
		color: '#FFF',
		textAlign: 'center',
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		marginBottom: 65
	},
	button: {
		borderRadius: 17,
		backgroundColor: '#F2F2F3',
	},
	buttonText: {
		// fontFamily: 'SFSbold',
		textAlign: 'center',
		fontSize: 17,
		color: '#1A1E2C',
		paddingVertical: 20,
		paddingHorizontal: 65,
	},
	disabledButton: {
		backgroundColor: "rgba(255, 255, 255, 0.12)"
	},
	disabledText: {
		color: "#fff",
		opacity: 0.5
	}
});
