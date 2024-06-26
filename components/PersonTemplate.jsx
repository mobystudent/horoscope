import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View, Keyboard, ScrollView } from 'react-native';
import Container from './Container';
import Header from './Header';
import { SettingsContext } from '../contexts/settings';

export default function PersonTemplate(props) {
	const {
		navigation,
		children,
		title,
		description,
		btnText,
		disabledBtn,
		nextStep
	} = props;
	const { settings } = useContext(SettingsContext);
	const leftButton = {
		screenLink: 'account',
		type: 'back'
	};

	return (
		<Container>
			<Header
				navigation={ settings.registered && navigation }
				leftButton={ settings.registered && leftButton }
			/>
			<Pressable style={ styles.body } onPress={ () => Keyboard.dismiss() }>
				<ScrollView contentContainerStyle={ styles.bodyWrapper } showsVerticalScrollIndicator={ false }>
					<View style={ styles.header }>
						<Text style={ styles.title }>{ title }</Text>
						<Text style={ styles.description }>{ description }</Text>
					</View>
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
				</ScrollView>
			</Pressable>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		paddingTop: 15,
		paddingBottom: 45
	},
	bodyWrapper: {
		flex: 1
	},
	header: {
		minHeight: 165,
		marginBottom: 25
	},
	wrap: {
		flex: 1,
		marginBottom: 40,
		minHeight: 120
	},
	title: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: '700',
		fontSize: 34,
		marginBottom: 15
	},
	description: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20
	},
	button: {
		borderRadius: 17,
		backgroundColor: '#F2F2F3',
	},
	buttonText: {
		fontWeight: '600',
		textAlign: 'center',
		fontSize: 17,
		color: '#1A1E2C',
		paddingVertical: 20,
		paddingHorizontal: 65,
	},
	disabledButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.12)'
	},
	disabledText: {
		color: "#fff",
		opacity: 0.5
	}
});
