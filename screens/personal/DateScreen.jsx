import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonTemplate from '../../components/PersonTemplate';
import { SettingsContext } from '../../contexts/settings';
import moment from 'moment';

import lang from '../../languages/lang_ru.json';

import { arrowRightIcon, arrowLeftIcon } from '../../icons/elements';

export default function DateScreen({ navigation }) {
	const { settings, setSettings } = useContext(SettingsContext);
	const [ date, setDate ] = useState(settings.person.date);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const [ dayWidth, setDayWidth ] = useState(0);
	const parseLang = JSON.parse(JSON.stringify(lang));
	const dateCur = moment();
	const numberMonth = dateCur.month();
	const currentYear = dateCur.year();
	const calendarWidth = ({ nativeEvent: { layout } }) => {
		const columnGap = 4;
		const bodyWidth = layout.width - columnGap * 6;

		setDayWidth(bodyWidth / 7);
	};
	const nameDays = parseLang.week.map(({ cropName }) => {
		return <Text style={[ styles.day, { width: dayWidth } ]} key={ cropName }>{ cropName }</Text>;
	});
	const nextStep = async () => {
		if (disabledBtn) return;

		const userData = {
			...settings.person,
			date
		};

		setSettings({
			...settings,
			person: {
				...userData
			}
		});

		if (settings.registered) {
			try {
				const personString = JSON.stringify(userData);

				await AsyncStorage.setItem('person', personString);
			} catch (e) {
				console.error(e);
			}

			navigation.navigate('account');
		} else {
			navigation.navigate('time');
		}
	};
	const monthArray = () => {
		const daysList = [];
		const numberYear = dateCur.format('YY');
		const numberFirstDay = moment(`01-${ numberMonth + 1 }-${ numberYear }`, 'DD-MM-YY').isoWeekday();

		for (let i = 0; i < dateCur.daysInMonth(); i++) {
			daysList.push(
				<Pressable
					style={[
						styles.item,
						date === i + 1 && styles.itemActive,
						{ width: dayWidth, height: dayWidth, borderRadius: dayWidth / 2 },
						i + 1 === 1 && { marginLeft: (numberFirstDay - 1) * (dayWidth + 4) }
					]}
					key={ i }
					onPress={ () => checkDay(i + 1)
				}>
					<Text style={ styles.number }>{ i + 1 }</Text>
				</Pressable>
			);
		}

		return daysList;
	};
	const checkDay = (day) => {
		setDate(day);
	};
	const title = 'Когда у вас день рождение?';
	const description = 'Укажите дату своего рождения, чтобы получить доступ к астрологическому анализу и лунным фазам, влияющим на вас';
	const btnText = settings.registered ? 'Сохранить' : 'Далее';

	return (
		<PersonTemplate
			navigation={ navigation }
			title={ title }
			description={ description }
			btnText={ btnText }
			disabledBtn={ disabledBtn }
			nextStep={ nextStep }
		>
			<View style={ styles.content }>
				<View style={ styles.calendar }>
					<View style={ styles.header }>
						<Text style={ styles.month }>{ parseLang.months[numberMonth].nameNom }</Text>
						<Text style={ styles.year }>{ currentYear }</Text>
						<View style={ styles.control }>
							<Pressable style={ styles.button } onPress={ () => console.log('prev') }>
								<View style={ styles.arrowIcon }>
									{ arrowLeftIcon('#fff', .5) }
								</View>
							</Pressable>
							<Pressable style={ styles.button } onPress={ () => console.log('next') }>
								<View style={ styles.arrowIcon }>
									{ arrowRightIcon('#fff', .5) }
								</View>
							</Pressable>
						</View>
					</View>
					<View style={ styles.body } onLayout={ (event) => calendarWidth(event) }>
						{ nameDays }
						{ monthArray() }
					</View>
				</View>
			</View>
		</PersonTemplate>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1
	},
	calendar: {
		padding: 15,
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		columnGap: 10,
		marginBottom: 15
	},
	month: {
		fontFamily: 'SFBold',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff'
	},
	year: {
		flex: 1,
		fontFamily: 'SFBold',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
		textAlign: 'center'
	},
	control: {
		flexDirection: 'row',
		columnGap: 10
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 32,
		height: 32,
		borderRadius: 32/2
	},
	arrowIcon: {
		width: 11,
		height: 18
	},
	body: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		rowGap: 5,
		columnGap: 4
	},
	day: {
		fontFamily: 'SFBold',
		fontSize: 14,
		lineHeight: 16,
		color: 'rgba(255, 255, 255, .5)',
		textAlign: 'center'
	},
	item: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	itemActive: {
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	number: {
		fontFamily: 'SFMed',
		fontSize: 20,
		lineHeight: 24,
		color: '#fff'
	},
});
