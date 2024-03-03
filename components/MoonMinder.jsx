import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SettingsContext } from '../contexts/settings';

import newMoonLight from '../assets/images/newMoonLight.png';
import fullMoon from '../assets/images/fullMoon.png';

export default function MoonMinder({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const description = settings.premium ? 'Вам доступны все приемущества' : 'Откройте для себя все приемущества Moonty';
	const imageMoon = settings.premium ? fullMoon : newMoonLight;
	const moonStyle = settings.premium ? styles.activeMoonIcon : styles.moonIcon;
	const Wrapper = ({ children }) => {
		return (
			settings.premium ?
				<LinearGradient
					colors={ ['#695EAB', '#E19C8B'] }
					locations={ [0.09, 1] }
					start={ {x: 0, y: 1} }
					end={ {x: 0.05, y: -0.9} }
					style={ styles.block }
				>
					{ children }
				</LinearGradient>
			:
				<View style={ styles.block }>
					{ children }
				</View>
		);
	};
	const openPremiumScreen = () => {
		navigation.navigate('premium');
		setSettings({
			...settings,
			background: 'premium'
		});
	};

	return (
		<Wrapper>
			<Text style={ styles.title }>MoonMinder +</Text>
			<Text style={ [ styles.desc, settings.premium || styles.descIndent ] }>{ description }</Text>
			{ settings.premium || <Pressable style={ styles.btn } onPress={ () => openPremiumScreen() }>
				<Text style={ styles.btnText }>Начать</Text>
			</Pressable> }
			<View style={ moonStyle }>
				<Image style={ styles.imageMoon } source={ imageMoon } />
			</View>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	block: {
		width: '100%',
		padding: 15,
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)',
		overflow: 'hidden'
	},
	title: {
		// fontFamily: 'SFBold',
		fontSize: 20,
		lineHeight: 26,
		color: '#fff',
		marginBottom: 5
	},
	desc: {
		// fontFamily: 'SFReg',
		fontSize: 14,
		lineHeight: 18,
		color: 'rgba(255, 255, 255, .5)',
		width: 180
	},
	descIndent: {
		marginBottom: 15
	},
	btn: {
		width: 120,
		borderRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 15,
		backgroundColor: '#fff'
	},
	btnText: {
		// fontFamily: 'SFMed',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		color: '#2C2C2E'
	},
	moonIcon: {
		position: 'absolute',
		top: -30,
		right: -100,
		width: 205,
		height: 205
	},
	activeMoonIcon: {
		position: 'absolute',
		top: -25,
		right: -15,
		width: 135,
		height: 135
	},
	imageMoon: {
		width: '100%',
		height: '100%'
	}
});
