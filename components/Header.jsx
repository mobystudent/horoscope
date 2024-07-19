import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View, Keyboard } from 'react-native';
import { SettingsContext } from '../contexts/settings';

import * as svg from '../icons/elements';

export default function Header(props) {
	const {
		navigation = {},
		title = '',
		subtitle = '',
		leftButton: {
			screenLink: screenLinkLeft = '',
			btnAction: btnActionLeft = '',
			type: typeLeft = ''
		} = {},
		rightButton: {
			screenLink: screenLinkRight = '',
			btnAction: btnActionRight = '',
			type: typeRight = ''
		} = {}
	} = props;
	const {
		settings: {
			currentMoonDay: {
				phase = '',
				details: {
					moonDay: {
						day = ''
					} = {}
				} = {}
			} = {},
			notesList = []
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const iconTypes = [
		{
			type: 'back',
			icon: svg.arrowLeftIcon,
			style: 'arrowLeftIcon'
		},
		{
			type: 'account',
			icon: svg.accountIcon,
			style: 'accountIcon'
		},
		{
			type: 'filter',
			icon: svg.filterIcon,
			style: 'filterIcon'
		},
		{
			type: 'more',
			icon: svg.moreIcon,
			style: 'moreIcon'
		},
		{
			type: 'note',
			icon: svg.noteIcon,
			style: 'noteIcon'
		}
	];
	const showIcon = (searchType) => {
		for (const { type, icon, style } of iconTypes) {
			if (searchType === type) {
				return (
					<View style={ styles[style] }>
						{ icon('#fff', 1) }
					</View>
				);
			}
		}
	};

	const checkTypeLeftButton = () => {
		if (btnActionLeft) {
			if (btnActionLeft === 'premium') {
				setSettings({
					...settings,
					background: 'main'
				});
			} else if (btnActionLeft === 'back') {
				Keyboard.dismiss();
				setSettings({
					...settings,
					currentNote: {}
				});
			}
		}

		setSettings({
			...settings,
			background: screenLinkLeft === 'moon' ? phase : 'main'
		});

		navigation.navigate(screenLinkLeft);
	};

	const checkTypeRightButton = () => {
		if (btnActionRight) {
			if (btnActionRight === 'add') {
				setSettings({
					...settings,
					currentNote: notesList[day - 1],
					background: 'main'
				});

				navigation.navigate(screenLinkRight, { page: 'moon' });
			} else {
				setSettings({
					...settings,
					modal: {
						type: btnActionRight
					}
				});
			}
		} else {
			navigation.navigate(screenLinkRight);
		}
	}

	return (
		<View style={ styles.header }>
			{ Boolean(Object.keys(props).length) && <>
				<Pressable style={ styles.btn } onPress={ () => checkTypeLeftButton() }>
					{ showIcon(typeLeft) }
				</Pressable>
				<View style={ styles.wrap }>
					<Text style={ styles.title }>{ title }</Text>
					{ subtitle && <Text style={ styles.subtitle }>{ subtitle }</Text>}
				</View>
				<Pressable style={ styles.btn } onPress={ () => checkTypeRightButton() }>
					{ showIcon(typeRight) }
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
	wrap: {
		rowGap: 5
	},
	title: {
		fontWeight: '700',
		color: '#fff',
		textAlign: 'center',
		fontSize: 17,
		lineHeight: 20,
		letterSpacing: -.1
	},
	subtitle: {
		fontWeight: '400',
		color: 'rgba(255, 255, 255, .5)',
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 14
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
