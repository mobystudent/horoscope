import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { SettingsContext } from '../contexts/settings';

import { arrowLeftIcon, filterIcon, moreIcon, accountIcon, noteIcon } from './SvgSprite';
// import * as svg from './SvgSprite';

export default function Header(props) {
	const {
		navigation = {},
		title = '',
		subtitle = '',
		leftButton: {
			screenLink: screenLinkLeft = '',
			type: typeLeft = ''
		} = {},
		rightButton: {
			screenLink: screenLinkRight = '',
			btnAction: btnActionRight = '',
			type: typeRight = '',
			params = null
		} = {}
	} = props;
	const { settings, setSettings } = useContext(SettingsContext);
	const iconLeftButton = (typeLeft) => {
		if (typeLeft === 'back') {
			return (
				<View style={ styles.arrowLeftIcon }>
					{ arrowLeftIcon('#fff', 1) }
				</View>
			);
		} else if (typeLeft === 'account') {
			return (
				<View style={ styles.accountIcon }>
					{ accountIcon('#fff') }
				</View>
			);
		}
	};
	const iconRightButton = (typeRight) => {
		if (typeRight === 'filter') {
			return (
				<View style={ styles.filterIcon }>
					{ filterIcon('#fff') }
				</View>
			);
		} else if (typeRight === 'more') {
			return (
				<View style={ styles.moreIcon }>
					{ moreIcon('#fff') }
				</View>
			);
		} else if (typeRight === 'note') {
			return (
				<View style={ styles.noteIcon }>
					{ noteIcon('#fff') }
				</View>
			);
		}
	};
	console.log(iconLeftButton);

	const checkTypeRightButton = () => {
		if (btnActionRight) {
			if (btnActionRight === 'more') {
				setSettings({
					...settings,
					noteSettings: true
				});
			} else if (btnActionRight === 'filter') {
				setSettings({
					...settings,
					noteFilter: true
				});
			}
		} else {
			return navigation.navigate(screenLinkRight, { ...params });
		}
	}

	return (
		<View style={ styles.header }>
			{ Object.keys(props).length !== 0 && <>
				<Pressable style={ styles.btn } onPress={ () => navigation.navigate(screenLinkLeft) }>
					{ iconLeftButton(typeLeft) }
				</Pressable>
				<View>
					<Text style={ styles.title }>{ title }</Text>
					{ subtitle && <Text style={ styles.subtitle }>{ subtitle }</Text>}
				</View>
				<Pressable style={ styles.btn } onPress={ () => checkTypeRightButton() }>
					{ iconRightButton(typeRight) }
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
		marginTop: 30
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
	arrowLeftIcon: {
		width: 11,
		height: 18
	},
	filterIcon: {
		width: 26,
		height: 26
	},
	moreIcon: {
		width: 26
	},
	accountIcon: {
		width: 26
	},
	noteIcon: {
		width: 26
	}
});
