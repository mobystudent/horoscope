import { useState, useContext } from 'react';
import { StyleSheet, Text, Pressable, View, Dimensions, Modal, Alert } from 'react-native';
import { SettingsContext } from '../contexts/settings';

export default function ModalSettings(props) {
	const {
		buttons = [],
		settingsFunc,
		settingsProp = '',
		alertMess = ''
	} = props;
	const { settings, setSettings } = useContext(SettingsContext);
	const [ heightModal, setHeightModal ] = useState(0);
	const windowHeight = Dimensions.get('window').height;
	const settingsButtons = buttons.map((button, i) => {
		const style = !i ? styles.button : [ styles.button, styles.buttonLine ];

		return (
			<Pressable style={ style } key={ i } onPress={ () => settingsFunc(button.type) }>
				<Text style={ styles.text }>{ button.title }</Text>
			</Pressable>
		);
	});
	const onLayout = ({ nativeEvent }) => {
		setHeightModal(windowHeight - nativeEvent.layout.height);
	};

	return (
		settings[settingsProp] && <Modal
			animationType="slide"
			transparent={ true }
			visible={ true }
			onRequestClose={ () => {
				Alert.alert(alertMess);
				setSettings({
					...settings,
					[settingsProp]: false
				});
			} }
		>
			<Pressable style={ styles.background } onPress={ () => {
				setSettings({
					...settings,
					[settingsProp]: false
				});
			} }>
				<View style={{ top: heightModal }} onLayout={ onLayout }>
					<View style={ styles.groupData }>
						{ settingsButtons }
					</View>
				</View>
			</Pressable>
		</Modal>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, .5)'
	},
	groupData: {
		borderTopLeftRadius: 17,
		borderTopRightRadius: 17,
		backgroundColor: '#83645C'
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		columnGap: 40,
		paddingHorizontal: 15,
		paddingVertical: 12
	},
	buttonLine: {
		borderTopWidth: 1,
		borderTopColor: 'rgba(255, 255, 255, .1)'
	},
	text: {
		fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
	}
});
