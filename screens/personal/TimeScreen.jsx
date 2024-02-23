import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import PersonalTemplate from '../../components/PersonalTemplate';
import { SettingsContext } from '../../contexts/settings';
// import DateTimePicker from 'react-native-ui-datepicker';
// import dayjs from 'dayjs';

export default function TimeScreen(props) {
	const {
		navigation,
		route: {
			params: {
				value = '12h00m'
			} = {}
		} = {}
	} = props;
	const { settings } = useContext(SettingsContext);
	const [ time, setTime ] = useState(value);
	// const date = new Date();
	// const noon = date.setHours(12, 0, 0, 0);
	// const [value, setValue] = useState(dayjs());
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const hours = Array.from({ length: 12 }, (_, i) => {
		i++;

		return {
			id: `h${i}`,
			type: 'hours',
			title: i,
			value: `${i < 10 ? '0' : ''}${i}`
		};
	});
	const minutes = Array.from({ length: 12 }, (_, i) => {
		return {
			id: `m${i}`,
			type: 'minutes',
			title: `${i * 5 < 10 ? '0' : ''}${i * 5}`,
			value: `${i * 5 < 10 ? '0' : ''}${i * 5}`
		};
	});
	const midday = [
		{
			id: 'am',
			type: 'midday',
			title: 'am',
			value: 'am'
		},
		{
			id: 'pm',
			type: 'midday',
			title: 'pm',
			value: 'pm'
		}
	];
	const selectItem = ((value, type) => {
		let timeLine = '';

		if (type === 'hours') {
			timeLine = `${value}${time.slice(2)}`;
		} else if (type === 'minutes') {
			timeLine = time.slice(0, 3) + value + time.slice(5);
		} else if (type === 'midday') {
			const hoursValue = +time.slice(0, 2);

			if (value === 'pm') {
				if (hoursValue > 12 || hoursValue < 1) return;

				timeLine = `${hoursValue === 12 ? '00' : hoursValue + 12}${time.slice(2)}`;
			} else {
				if (hoursValue < 13 && hoursValue > 0) return;

				if (hoursValue === 0) {
					timeLine = `12${time.slice(2)}`;
				} else {
					timeLine = `${hoursValue - 12 < 10 ? '0' : ''}${hoursValue - 12}${time.slice(2)}`;
				}
			}
		}

		setTime(timeLine);
		setDisabledBtn(false);
	});
	const renderItem = (({ item }) => (
		<Pressable onPress={ () => selectItem(item.value, item.type) }>
			<Text style={ styles.num }>{ item.title }</Text>
		</Pressable>
	));
	const nextStep = () => {
		if (!disabledBtn && settings.personalMode === 'edit') {
			navigation.navigate('city');
		} else {
			navigation.navigate('account');
		}
	}
	const title = 'Во сколько вы родились?';
	const description = 'Введите время своего рождения, чтобы получить более точные прогнозы лунного влияния на различные сферы вашей жизни';
	const btnText = 'Далее';

	return (
		<PersonalTemplate
			navigation={ navigation }
			title={ title }
			description={ description }
			btnText={ btnText }
			disabledBtn={ disabledBtn }
			nextStep={ nextStep }
		>
			<View style={ styles.content }>
				<View style={ styles.wrap }>
					<FlatList
						data={ hours }
						renderItem={ renderItem }
						keyExtractor={ item => item.id }
						style={ styles.list }
					/>
					<FlatList
						data={ minutes }
						renderItem={ renderItem }
						keyExtractor={ item => item.id }
						style={ styles.list }
					/>
					<FlatList
						data={ midday }
						renderItem={ renderItem }
						keyExtractor={ item => item.id }
						style={ styles.list }
					/>
					<View style={ styles.activeLine }></View>
				</View>
			</View>
		</PersonalTemplate>
	);
	// <DateTimePicker
	// 	mode="time"
	// 	value={value}
	// 	onValueChange={(date) => setValue(date)}
	// 	style={ styles.clockItem }
	// />
}

const styles = StyleSheet.create({
	content: {
		position: 'relative',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrap: {
		position: 'relative',
		// flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 200,
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginBottom: 'auto',
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)',
	},
	clockItem: {
		position: 'static'
	},
	num: {
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
		paddingHorizontal: 5,
		paddingVertical: 4
	},
	list: {
		textAlign: 'center',
		maxWidth: 65,
		paddingHorizontal: 15
	},
	activeLine: {
		position: 'absolute',
		left: 10,
		width: '100%',
		height: 32,
		borderRadius: 7,
		backgroundColor: 'rgba(255, 255, 255, .08)',
		zIndex: -1
	}
});
