import { useContext } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import { SettingsContext } from '../contexts/settings';

import * as zodiac from '../icons/zodiac';
import fullMoon from '../assets/images/fullMoon.png';

export default function Calender({ navigation }) {
	const { settings } = useContext(SettingsContext);
	const title = 'Календарь';
	const subtitle = '21 сентября';
	const details = [
		{
			title: 'Сегодня',
			day: '21',
			text: 'Июля 2023'
		},
		{
			title: 'Лунный день',
			day: settings.currentDayMoon,
			text: 'С 07:53 до 23:03'
		},
		{
			title: 'Солнце',
			sign: 'cancer',
			text: 'В Раке'
		}
	];
	const moonPhase = {
		title: 'Растущая луна',
		phase: 'I Фаза',
		image: fullMoon
	}
	const leftButton = {
		screenLink: 'account',
		type: 'account'
	};
	const rightButton = {
		screenLink: 'createNote',
		type: 'note',
		// params: { noteToday, page: 'moon' }
	};
	const detailsList = details.map((detail) => {
		return (
			<View style={ styles.detailItem } key={ styles.title }>
				<Text style={[ styles.detailTitle, styles.detailText ]}>{ detail.title }</Text>
				{
					detail.day ?
					<Text style={ styles.detailDay }>{ detail.day }</Text>
					: <View style={ styles.zodiac }>
						{ zodiac[detail.sign]('#fff') }
					</View>
				}
				<Text style={ styles.detailText }>{ detail.text }</Text>
			</View>
		);
	});

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ title }
				subtitle={ subtitle }
				leftButton={ leftButton }
				rightButton={ rightButton }
			/>
			<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
				<View style={ styles.period }>
					<Pressable style={ styles.periodButton } onPress={ () => navigation.navigate('moon') }>
						<Text style={ styles.periodText }>Сегодня</Text>
					</Pressable>
					<View style={ styles.periodButton }>
						<Text style={ styles.periodText }>Календарь</Text>
					</View>
				</View>
				<View style={ styles.moonPhase }>
					<View style={ styles.moonIcon }>
						<Image style={ styles.imageMoon } source={ moonPhase.image } />
					</View>
					<View style={ styles.moonWrap }>
						<Text style={ styles.moonTitle }>{ moonPhase.title }</Text>
						<Text style={ styles.moonText }>{ moonPhase.phase }</Text>
					</View>
				</View>
				<ScrollView contentContainerStyle={ styles.detailsScroll } horizontal={ true }>
					<View style={ styles.details }>
						{ detailsList }
					</View>
				</ScrollView>
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		paddingTop: 15,
		paddingBottom: 45
	},
	period: {
		flexDirection: 'row',
		marginBottom: 15
	},
	periodButton: {
		flexGrow: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	periodText: {
		// fontFamily: 'SFMed',
		fontSize: 14,
		lineHeight: 16,
		color: '#fff',
		textAlign: 'center'
	},
	detailsScroll: {
		marginBottom: 15
	},
	details: {
		flexDirection: 'row',
		columnGap: 10
	},
	detailItem: {
		rowGap: 15,
		width: 125,
		padding: 15,
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	detailTitle: {
		textTransform: 'uppercase',
		opacity: .5
	},
	detailDay: {
		// fontFamily: 'SFBold',
		fontSize: 34,
		lineHeight: 40,
		color: '#fff',
		letterSpacing: -.215
	},
	detailText: {
		// fontFamily: 'SFReg',
		fontSize: 12,
		lineHeight: 14,
		color: '#fff',
		letterSpacing: -.075
	},
	zodiac: {
		width: 40,
		height: 40
	},
	moonPhase: {
		flexDirection: 'row',
		columnGap: 15,
		marginBottom: 15
	},
	moonIcon: {
		width: 48,
		height: 48
	},
	imageMoon: {
		width: '100%',
		height: '100%'
	},
	moonTitle: {
		// fontFamily: 'SFBold',
		fontSize: 20,
		lineHeight: 24,
		color: '#fff',
		letterSpacing: -.125,
		marginBottom: 5
	},
	moonText: {
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		color: '#fff',
		letterSpacing: -.125,
		opacity: .5
	}
});
