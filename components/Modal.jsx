import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { SettingsContext } from '../contexts/settings';

export default function ModalComponent() {
	const {
		settings: {
			modal: {
				visible = false,
				status = '',
				title = '',
				message = ''
			}
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const [ visibleModal, setVisibleModal ] = useState(visible);
	const hideModal = () => {
		setVisibleModal(false);
		setSettings({
			...settings,
			modal: {
				visible: false,
				status: '',
				title: '',
				message: ''
			}
		});
	};

	console.log('visibleModal +++++++++++++++++++++++++++++++++++++++++++');
	console.log(visible);
	console.log(visibleModal);
	console.log('visibleModal +++++++++++++++++++++++++++++++++++++++++++');

	useEffect(() => {
		console.log('RECALL MADAL');
		if (!visible) return;

		setVisibleModal(visible);
	}, [visible]);

	return (
		<Modal
			isVisible={ visibleModal }
			avoidKeyboard={ true }
			style={ styles.component }
		>
			{ status === 'error' &&
				<View style={ styles.modal }>
					<Text style={ styles.title }>{ title }</Text>
					<Text style={ styles.message }>{ message }</Text>
					<Pressable style={ styles.button } onPress={ () => hideModal() }>
						<Text style={ styles.text }>OK</Text>
					</Pressable>
				</View>
			}
		</Modal>
	);
}

const styles = StyleSheet.create({
	component: {
		paddingHorizontal: 10
	},
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
		rowGap: 10,
		minHeight: 180,
		padding: 15,
		borderRadius: 16,
		backgroundColor: '#fff'
	},
	title: {
		fontWeight: '700',
		fontSize: 18,
		lineHeight: 22,
		textAlign: 'center'
	},
	message: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		marginBottom: 10
	},
	button: {
		justifyContent: 'center',
		paddingVertical: 5,
		paddingHorizontal: 10,
		width: 180,
		borderRadius: 20,
		backgroundColor: '#ccc'
	},
	text: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		color: '#000',
	}
});
