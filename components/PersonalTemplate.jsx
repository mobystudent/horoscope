import * as React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import Container from '../screens/Container';

export default function PersonalTemplate(props) {
	const {
		children,
		title,
		description,
		btnText,
		disabledBtn,
		nextStep
	} = props;

	return (
		<Container>
			<View style={ styles.header }></View>
			<View style={ styles.body }>
				<Text style={ styles.title }>{ title }</Text>
				<Text style={ styles.description }>{ description }</Text>
				<View style={ styles.wrap }>
					{ children }
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
		color: '#fff',
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
	}
});
