import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { SettingsContext } from '../contexts/settings';

export default function Header(props) {
	const {
		navigation = {},
		title = '',
		subtitle = '',
		leftButton: {
			link: linkLeft = '',
			icon: iconLeft = ''
		} = {},
		rightButton: {
			btn: btnRight = '',
			link: linkRight = '',
			icon: iconRight = '',
			params = null
		} = {}
	} = props;
	const { settings, setSettings } = useContext(SettingsContext);
	console.log(iconRight);

	const checkTypeRightButton = () => {
		if (btnRight === 'more') {
			setSettings({
				...settings,
				noteSettings: true
			});
		} else if (btnRight === 'filter') {
			setSettings({
				...settings,
				noteFilter: true
			});
		}

		// navigation.navigate(linkRight, { ...params });
	}

	return (
		<View style={ styles.header }>
			{ Object.keys(props).length !== 0 && <>
				<Pressable style={ styles.btn } onPress={ () => navigation.navigate(linkLeft) }>
					{ iconLeft }
				</Pressable>
				<View>
					<Text style={ styles.title }>{ title }</Text>
					{ subtitle && <Text style={ styles.subtitle }>{ subtitle }</Text>}
				</View>
				<Pressable style={ styles.btn } onPress={ () => checkTypeRightButton() }>
					<View style={ styles.icon }>
						{ iconRight }
					</View>
				</Pressable>
			</> }
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 50,
		marginTop: 30,
		marginBottom: 10
	},
	title: {
		// fontFamily: 'SFBold',
		color: '#fff',
		textAlign: 'center',
		fontSize: 17,
		letterSpacing: -.1,
		marginBottom: 5
	},
	subtitle: {
		// fontFamily: 'SFReg',
		color: 'rgba(255, 255, 255, .5)',
		textAlign: 'center',
		fontSize: 12
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 32,
		height: 32
	},
	icon: {
		width: 26,
		height: 26
	}
});
