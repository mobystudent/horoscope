import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

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
		<StatusBar style="auto" />
	);
}

const styles = StyleSheet.create({
});
