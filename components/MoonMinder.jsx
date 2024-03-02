import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SettingsContext } from '../contexts/settings';

import newMoon from '../assets/images/lastQuarter.png';
// import { checkIcon } from '../icons/moon';

export default function MoonMinder() {
	const { settings } = useContext(SettingsContext);
	const description = settings.premium ? 'Вам доступны все приемущества' : 'Откройте для себя все приемущества Moonty';
	const Wrapper = ({ children }) => {
		if (settings.premium) {
			console.log('PREMIUN');
			return (
				<LinearGradient
					colors={ ['#695EAB', '#cd9290'] }
					locations={ [0.0992, 1] }
					start={ {x: 0, y: 1} }
					end={ {x: 0.05, y: -0.9} }
					style={ styles.block }
				>
					{ children }
				</LinearGradient>
			);
		} else {
			console.log('DEFAULT');
			return (
				<View style={ styles.block }>
					{ children }
				</View>
			);
		}
	};
	console.log(newMoon);
	// premium
	return (
		<Wrapper>
			<Text style={ styles.title }>MoonMinder +</Text>
			<Text style={ [ styles.desc, settings.premium || styles.descIndent ] }>{ description }</Text>
			{ settings.premium || <Pressable style={ styles.btn }>
				<Text style={ styles.btnText }>Начать</Text>
			</Pressable> }
			<View style={ settings.premium ? styles.activeMoonIcon : styles.moonIcon }>
				<Image style={{ width: '100%', height: '100%' }} source={ newMoon } />
			</View>
		</Wrapper>
	);
};
// background: linear-gradient(180deg, rgba(16, 14, 36, 0.70) 0%, rgba(26, 22, 42, 0.80) 19.31%, rgba(35, 29, 48, 0.90) 37.77%, #2C2436 60.55%, #3A2F3E 78.66%, #83645C 216.54%);
// background: linear-gradient(20deg, #695EAB 9.92%, #E19C8B 115.38%);
// { fullMoonIcon() }

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
	}
});
