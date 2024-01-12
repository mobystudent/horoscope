import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import PersonalScreen from './screens/PersonalScreen';

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
		<LinearGradient
			colors={ ['#100E24', '#1A162A', '#231D30', '#2C2436', '#3A2F3E', '#83645C'] }
			locations={ [0, 0.0892, 0.1744, 0.2796, 0.3633, 1] }
			style={ styles.linearGradient }
		>
			<Pressable style={ styles.wrapper } onPress={ () => Keyboard.dismiss() }>
				<StatusBar style="auto" />
				<SafeAreaView style={ styles.container } >
					<View style={ styles.header }></View>
					<PersonalScreen />
				</SafeAreaView>
			</Pressable>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1
	},
	wrapper: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 45
	},
	container: {
		flex: 1
	},
	header: {
		height: 90
	}
});
