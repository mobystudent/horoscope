import { useState } from 'react';
import { StyleSheet, FlatList, TextInput, Pressable, Text, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';

export default function CityScreen(props) {
	const { getData } = props;
	const data = [
		{ title: 'Париж' },
		{ title: 'Марсель' },
		{ title: 'Лион' },
		{ title: 'Тулуза' },
		{ title: 'Ницца' },
		{ title: 'Нант' },
		{ title: 'Страсбург' },
		{ title: 'Монпелье' },
		{ title: 'Бордо' },
		{ title: 'Лилль' },
		{ title: 'Рейн' },
		{ title: 'Реймс' },
		{ title: 'Рубе' },
		{ title: 'Туркуэн' }
	];
	const [ city, setCity ] = useState('');
	const [ suggestion, setSuggestion ] = useState([]);
	const selectItem = (item) => {
		setCity(item);
		setSuggestion([]);
		getData(item);
		Keyboard.dismiss();
	};
	const emptyFilter = ({ nativeEvent }) => {
		const regex = new RegExp('[а-яА-Я\-Backspace]');
		const check = regex.test(nativeEvent.key);
		const cityChars = nativeEvent.key === 'Backspace' ? city.slice(0, city.length - 1) : `${ city }${ nativeEvent.key }`;

		if (check) {
			if (cityChars.length > 2) {
				const newSugges = data.filter((item) => item.title.startsWith(cityChars));
				const filteredCity = data.find((item) => item.title.toLowerCase() === cityChars.toLowerCase());

				if (nativeEvent.key !== 'Backspace') {
					filteredCity && Keyboard.dismiss();
				}

				setSuggestion(newSugges);
			} else if (cityChars.length < 3 && nativeEvent.key === 'Backspace') {
				setSuggestion([]);
			}
		} else {
			Alert.alert('Не корректный символ', 'Название должно содержать только буквенные символы кириллицы или дефис', [{
					text: 'OK',
					onPress: () => setCity(city),
					style: 'cancel',
				}]
			);
		}

		getData(false);
	};
	const renderItem = (({ item }) => (
		<Pressable onPress={ () => selectItem(item.title) }>
			<Text style={ styles.item }>{item.title}</Text>
		</Pressable>
	));

	return (
		<KeyboardAvoidingView style={ styles.wrap } behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } >
			<Pressable style={ styles.inputWrap }>
				<TextInput
					style={ styles.input }
					placeholder="Ввести город..."
					placeholderTextColor="rgba(255, 255, 255, 0.5)"
					value={ city }
					onChangeText={ setCity }
					onKeyPress={ (press) => emptyFilter(press) }
				/>
			</Pressable>
			<FlatList
				data={ suggestion }
				renderItem={ renderItem }
				keyExtractor={ item => item.title }
				style={ styles.list }
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	wrap: {
		rowGap: 25
	},
	inputWrap: {
		flexShrink: 0,
	},
	input: {
		borderRadius: 17,
		paddingHorizontal: 16,
		paddingVertical: 12,
		color: '#fff',
		fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		textAlignVertical: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.12)'
	},
	item: {
		borderRadius: 17,
		paddingHorizontal: 16,
		paddingVertical: 12,
		color: '#fff',
		fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		marginVertical: 3,
		backgroundColor: 'rgba(255, 255, 255, 0.12)'
	}
});
