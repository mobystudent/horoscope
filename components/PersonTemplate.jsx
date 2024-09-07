import { useEffect, useContext } from 'react';
import { StyleSheet, Text, Pressable, View, Keyboard, ScrollView, BackHandler } from 'react-native';
import { useRoute } from '@react-navigation/native';
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
		nextStep,
		focusedInput = false
	} = props;
	const {
		settings: {
			registered = false
		}
	} = useContext(SettingsContext);
	const leftButton = {
		screenLink: 'account',
		btnAction: 'back',
		type: 'back'
	};
	const screenName = useRoute().name;
	const inputPages = ['name', 'place', 'city'];
	const pageBody = () => (
		<>
			<Text style={[ styles.title, focusedInput && styles.titleFocused ]}>{ title }</Text>
			{ screenName === 'date'
				? (
					<ScrollView showsVerticalScrollIndicator={ false }>
						{ !focusedInput && <Text style={ styles.description }>{ description }</Text> }
						{ children }
					</ScrollView>
				) : (
					<View style={ styles.wrap }>
						{ !focusedInput && <Text style={ styles.description }>{ description }</Text> }
						{ children }
					</View>
				)
			}
			<Pressable
				style={[ styles.button, disabledBtn && styles.disabledButton ]}
				onPress={ () => nextStep() }
				disabled={ disabledBtn }
			>
				<Text style={[ styles.buttonText, disabledBtn && styles.disabledText ]}>{ btnText }</Text>
			</Pressable>
		</>
	);

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);

		return () => backHandler.remove();
	}, []);

	return (
		<Container>
			<Header
				navigation={ registered && navigation }
				leftButton={ registered && leftButton }
			/>
			{ !!inputPages.includes(screenName)
				?
					<Pressable
						style={[ styles.body, focusedInput && styles.bodyFocused ]}
						onPress={ () => Keyboard.dismiss() }
					>
						{ pageBody() }
					</Pressable>
				:
					<View style={[ styles.body, focusedInput && styles.bodyFocused ]}>
						{ pageBody() }
					</View>
			}
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		paddingTop: 15,
		paddingBottom: 45
	},
	bodyFocused: {
		paddingTop: 0,
		paddingBottom: 15
	},
	wrap: {
		flex: 1
	},
	title: {
		minHeight: 85,
		color: '#fff',
		textAlign: 'center',
		fontWeight: '700',
		fontSize: 34,
		marginBottom: 15
	},
	titleFocused: {
		minHeight: 'inherit'
	},
	description: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		marginBottom: 25
	},
	button: {
		marginTop: 25,
		borderRadius: 17,
		backgroundColor: '#F2F2F3'
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
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	disabledText: {
		color: "#fff",
		opacity: .5
	}
});
