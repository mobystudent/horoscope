import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import starsBackground from '../assets/images/starsBackground.png';

export default function Container({ children }) {
	const windowHeight = Dimensions.get('window').height;
	const starsHeignt = (windowHeight / 100) * 46;

	return (
		<View style={ styles.upperBackground }>
			<ImageBackground source={ starsBackground } resizeMode="contain" style={ [ styles.backgroundWrapper, { height: starsHeignt } ] }>
				<LinearGradient
					colors={ [ 'rgba(16, 14, 36, .7)', 'rgba(26, 22, 42, .8)', 'rgba(35, 29, 48, .9)', '#2C2436', '#3A2F3E', '#83645C'] }
					locations={ [ 0, 0.09, 0.17, 0.28, 0.36, 1 ] }
					style={ styles.linearGradient }
				>
					<View style={ styles.wrapper }>
						<StatusBar style="auto" />
						<SafeAreaView style={ styles.container } >
							{ children }
						</SafeAreaView>
					</View>
				</LinearGradient>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	upperBackground: {
		flex: 1,
		backgroundColor: '#100e24'
	},
	backgroundWrapper: {
		flex: 1,
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
