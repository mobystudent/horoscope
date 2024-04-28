import { useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { SettingsContext } from '../contexts/settings';

export default function ModalComponent() {
	const {
		settings: {
			modal: {
				visible = false,
				status = '',
				type = '',
				title = '',
				message = '',
				handler = null
			}
		} = {},
		settings,
		setSettings
	} = useContext(SettingsContext);
	const hideModal = () => {
		setSettings({
			...settings,
			modal: {}
		});
	};
	const typeBtns = {
		photo: [
			// {
			// 	title: 'Редактировать',
			// 	type: 'edit'
			// },
			{
				title: 'Загрузить из альбомов',
				type: 'library'
			},
			{
				title: 'Сделать селфи',
				type: 'selfie'
			},
			{
				title: 'Удалить',
				type: 'delete'
			},
		],
		sort: [
			{
				title: 'Сначала новые',
				type: 'new'
			},
			{
				title: 'Сначала старые',
				type: 'old'
			},
			{
				title: 'По возрастанию',
				type: 'asc'
			},
			{
				title: 'По убыванию',
				type: 'desc'
			},
		],
		note: [
			{
				title: 'Редактировать',
				type: 'edit'
			},
			{
				title: 'Очистить',
				type: 'clear'
			}
		]
	};
	const filterButtons = status === 'filter' && typeBtns[type].map((button, i) => {
		const style = !i ? styles.buttonFilter : [ styles.buttonFilter, styles.buttonLine ];

		return (
			<Pressable style={ style } key={ i } onPress={ () => handler(button.type) }>
				<Text style={[ styles.text, { color: '#fff' } ]}>{ button.title }</Text>
			</Pressable>
		);
	});

	return (
		<Modal
			isVisible={ visible }
			avoidKeyboard={ true }
			onBackdropPress={ () => hideModal() }
			style={ status === 'error' ? styles.componentError : styles.componentFilter }
		>
			{ status === 'error'
				? <View style={ styles.modal }>
					<Text style={ styles.title }>{ title }</Text>
					<Text style={ styles.message }>{ message }</Text>
					<Pressable style={ styles.button } onPress={ () => hideModal() }>
						<Text style={[ styles.text, { color: '#000' } ]}>OK</Text>
					</Pressable>
				</View>
				: <View style={ styles.filter }>
					{ filterButtons }
				</View>
			}
		</Modal>
	);
}

const styles = StyleSheet.create({
	componentError: {
		paddingHorizontal: 10
	},
	componentFilter: {
		position: 'absolute',
		left: -10,
		bottom: -10,
		width: '100%'
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
	filter: {
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		backgroundColor: '#5a4e59'
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
	buttonFilter: {
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 15
	},
	button: {
		justifyContent: 'center',
		paddingVertical: 5,
		paddingHorizontal: 10,
		width: 180,
		borderRadius: 20,
		backgroundColor: '#ccc'
	},
	buttonLine: {
		borderTopWidth: 1,
		borderTopColor: 'rgba(255, 255, 255, .1)'
	},
	text: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		color: '#000',
	}
});
