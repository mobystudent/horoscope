import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Container from './Container';

export default function GenderScreen({ navigation }) {
	const [ gender, setGender ] = useState(null);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const activeGender = (genderActive) => {
		setGender(genderActive);
		setDisabledBtn(false);
	};
	const nextStep = () => {
		if (gender) {
			navigation.navigate('processing');
		}
	}
	const title = 'Ваш пол:';
	const description = 'Мы настроем персональные рекомендации лунного календаря, учитывая влияние лунных фаз на биоритмы';
	const btnText = 'Сохранить';

	return (
		<Container>
			<View style={ styles.header }></View>
			<View style={ styles.body }>
				<Text style={ styles.title }>{ title }</Text>
				<Text style={ styles.description }>{ description }</Text>
				<View style={ styles.wrap }>
					<View style={ styles.content }>
						<View style={ styles.block }>
							<Pressable style={ [styles.square, gender === 'male' && styles.active] } onPress={ () => activeGender('male') }>
								<Image
									style={ styles.image }
									source={ require('../assets/images/male.png') }
								/>
							</Pressable>
							<Text style={ styles.text }>Male</Text>
						</View>
						<View style={ styles.block }>
							<Pressable style={ [styles.square, gender === 'female' && styles.active] } onPress={ () => activeGender('female') }>
								<Image
									style={ styles.image }
									source={ require('../assets/images/female.png') }
								/>
							</Pressable>
							<Text style={ styles.text }>Female</Text>
						</View>
					</View>
				</View>
				<Pressable
					style={[ styles.button, disabledBtn && styles.disabledButton ]}
					onPress={ () => nextStep() }
					disabled={ disabledBtn }
				>
					<Text style={[ styles.buttonText, disabledBtn && styles.disabledText ]}>{ btnText }</Text>
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
	description: {
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
	},

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
		backgroundColor: 'rgba(255, 255, 255, 0.12)'
	},
	image: {
		width: 50,
		height: 50
	},
	text: {
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		color: '#fff'
	},
	active: {
		borderColor: '#fff'
	}
});
