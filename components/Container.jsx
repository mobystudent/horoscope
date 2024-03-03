import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SettingsContext } from '../contexts/settings';

import starsBackground from '../assets/images/starsBackground.png';
import halfMoonBg from '../assets/images/halfMoonBg.png';

export default function Container({ children }) {
	const { settings } = useContext(SettingsContext);
	const windowHeight = Dimensions.get('window').height;
	const starsHeignt = (windowHeight / 100) * 46;
	const backgrounds = [
		{
			type: 'main',
			upperBackground: '#100e24',
			imageBgSource: starsBackground,
			imageBgHeight: starsHeignt,
			gradientArray: ['rgba(16, 14, 36, .7)', 'rgba(26, 22, 42, .8)', 'rgba(35, 29, 48, .9)', '#2C2436', '#3A2F3E', '#83645C'],
			locations: [0, 0.09, 0.17, 0.28, 0.36, 1],
			start: {x: 1, y: 0},
			end: {x: 1, y: 1}
		},
		{
			type: 'premium',
			upperBackground: '#e19c8b',
			imageBgSource: halfMoonBg,
			imageBgHeight: 375,
			gradientArray: ['#695EAB', 'rgba(225, 156, 139, 0)'],
			locations: [0.09, 1],
			start: {x: 0, y: 1},
			end: {x: 0.05, y: -0.9}
		},
	];
	const activeBackground = backgrounds.find((bgItem) => bgItem.type === settings.background);

	return (
		<View style={ [styles.upperBackground, { backgroundColor: activeBackground.upperBackground }] }>
			<Image source={ activeBackground.imageBgSource } resizeMode="contain" style={ [ styles.backgroundWrapper, { height: activeBackground.imageBgHeight } ] }>
			</Image>
			<LinearGradient
				colors={ activeBackground.gradientArray }
				locations={ activeBackground.locations }
				start={ activeBackground.start }
				end={ activeBackground.end }
				style={ styles.linearGradient }
			>
				<View style={ styles.wrapper }>
					<StatusBar style="auto" />
					<SafeAreaView style={ styles.container } >
						{ children }
					</SafeAreaView>
				</View>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	upperBackground: {
		flex: 1
	},
	backgroundWrapper: {
		position: 'absolute',
		top: -125,
		left: 0,
		width: '100%'
	},
	linearGradient: {
		flex: 1
	},
	wrapper: {
		flex: 1,
		paddingHorizontal: 15
	},
	container: {
		flex: 1
	},
});
