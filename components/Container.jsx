import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Container({ children }) {
	return (
		<LinearGradient
			colors={ ['#100E24', '#1A162A', '#231D30', '#2C2436', '#3A2F3E', '#83645C'] }
			locations={ [0, 0.0892, 0.1744, 0.2796, 0.3633, 1] }
			style={ styles.linearGradient }
		>
			<Pressable style={ styles.wrapper } onPress={ () => Keyboard.dismiss() }>
				<StatusBar style="auto" />
				<SafeAreaView style={ styles.container } >
					{ children }
				</SafeAreaView>
			</Pressable>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
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
