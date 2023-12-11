import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import PersonalScreen from './screens/PersonalScreen';

export default function App() {
	const [fontsLoaded] = useFonts({
		'SFBold': require('./assets/fonts/SFProDisplay-Bold.ttf'),
		'SFMed': require('./assets/fonts/SFProDisplay-Medium.ttf'),
		'SFReg': require('./assets/fonts/SFProDisplay-Regular.ttf'),
		'SFSbold': require('./assets/fonts/SFProDisplay-Semibold.ttf')
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<LinearGradient
			colors={ ['#100E24', '#1A162A', '#231D30', '#2C2436', '#3A2F3E', '#83645C'] }
			locations={ [0, 0.0892, 0.1744, 0.2796, 0.3633, 1] }
			style={ styles.linearGradient }
		>
			<StatusBar style="auto" />
			<SafeAreaView style={ styles.container }>
				<View style={ styles.header }></View>
				<PersonalScreen />
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 45
	},
	container: {
		flex: 1,
	},
	header: {
		height: 90
	}
});
