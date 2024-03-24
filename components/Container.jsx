import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SettingsContext } from '../contexts/settings';

import { backgroundsList } from '../assets/elements/backgrounds';

export default function Container({ children }) {
	const {
		settings: {
			background = ''
		} = {}
	} = useContext(SettingsContext);
	const activeBackground = backgroundsList[background];

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
