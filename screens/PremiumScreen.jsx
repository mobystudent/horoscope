import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';

import { chartIcon, personIcon, reportIcon } from '../icons/elements';

export default function Premium({ navigation }) {
	const [ rate, setRate ] = useState('Weekly');
	const [ buttonText, setButtonText ] = useState('');
	const leftButton = {
		screenLink: 'account',
		type: 'back'
	};
	const advantages = [
		{
			id: 1,
			icon: chartIcon('#fff'),
			style: 'chartIcon',
			text: 'Full birth chart interpretations'
		},
		{
			id: 2,
			icon: personIcon('#fff'),
			style: 'personIcon',
			text: 'Hyper-personalized horoscopes'
		},
		{
			id: 3,
			icon: reportIcon('#fff'),
			style: 'reportIcon',
			text: 'Love and compatibility reports'
		}
	];
	const rates = [
		{
			name: 'Weekly',
			period: 'week',
			price: '$4.99'
		},
		{
			name: 'Lifetime',
			period: 'lifetime',
			price: '$29.99'
		}
	];
	const subscribe = () => {
		console.log('Subscribe');
	};
	const advantagesList = advantages.map((advant) => (
		<View style={ styles.advantage } key={ advant.id }>
			<View style={ styles.iconWrap }>
				<View style={ styles[advant.style] }>
					{ advant.icon }
				</View>
			</View>
			<Text style={ styles.text }>{ advant.text }</Text>
		</View>
	));
	const ratesList = rates.map((rateItem) => (
		<Pressable style={ [ styles.rate, rate === rateItem.name && styles.activeRate ] } onPress={ () => setRate(rateItem.name) } key={ rateItem.name }>
			<Text style={ styles.rateText }>{ rateItem.name }</Text>
			<Text style={ styles.rateText }>{ rateItem.price }</Text>
		</Pressable>
	));

	useEffect(() => {
		const activeRateItem = rates.find((rateItem) => rate === rateItem.name);

		setButtonText(`${ activeRateItem.price }/${ activeRateItem.period }`);
	}, [rate]);

	return (
		<Container>
			<Header
				navigation={ navigation }
				leftButton={ leftButton }
			/>
			<ScrollView contentContainerStyle={ styles.body } showsVerticalScrollIndicator={ false }>
				<Text style={ styles.title }>MoonMinder +</Text>
				<Text style={ styles.subtitle }>Ваш личный лунный спутник</Text>
				<View style={ styles.list }>
					{ advantagesList }
				</View>
				<View style={ styles.rateList }>
					{ ratesList }
				</View>
				<Pressable style={ styles.btn } onPress={ subscribe }>
					<Text style={ styles.btnText }>Subscribe for { buttonText }</Text>
				</Pressable>
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		paddingTop: 80,
		paddingBottom: 45
	},
	title: {
		color: '#fff',
		// fontFamily: 'SFSbold',
		fontSize: 42,
		lineHeight: 50,
		textAlign: 'center',
		marginBottom: 10
	},
	subtitle: {
		color: '#fff',
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		marginBottom: 30
	},
	advantage: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 10
	},
	iconWrap: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 30,
		height: 30,
		borderRadius: 30/2,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	list: {
		rowGap: 25,
		marginBottom: 65
	},
	text: {
		color: '#fff',
		// fontFamily: 'SFMed',
		fontSize: 20,
		lineHeight: 24
	},
	chartIcon: {
		width: 16,
		height: 16
	},
	personIcon: {
		width: 18,
		height: 15
	},
	reportIcon: {
		width: 14,
		height: 18
	},
	rateList: {
		rowGap: 10,
		marginBottom: 30
	},
	rate: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		borderWidth: 1,
		borderColor: 'transparent',
		borderRadius: 17,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	activeRate: {
		borderColor: '#fff',
	},
	rateText: {
		color: '#fff',
		// fontFamily: 'SFBold',
		fontSize: 17,
		lineHeight: 19,
		letterSpacing: -.186
	},
	btn: {
		borderRadius: 17,
		backgroundColor: '#F2F2F3',
		padding: 20,
		marginBottom: 15
	},
	btnText: {
		color: '#1A1E2C',
		// fontFamily: 'SFBold',
		fontSize: 17,
		lineHeight: 19,
		textAlign: 'center'
	}
});
