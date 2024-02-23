import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import PersonalTemplate from '../../components/PersonalTemplate';
import { SettingsContext } from '../../contexts/settings';

import { maleIcon, femaleIcon } from '../../components/SvgSprite';

export default function GenderScreen(props) {
	const {
		navigation,
		route: {
			params: {
				value = null
			} = {}
		} = {}
	} = props;
	const { settings } = useContext(SettingsContext);
	const [ gender, setGender ] = useState(value);
	const [ disabledBtn, setDisabledBtn ] = useState(true);
	const activeGender = (genderActive) => {
		setGender(genderActive);
		setDisabledBtn(false);
	};
	const nextStep = () => {
		if (!disabledBtn && settings.personalMode === 'edit') {
			navigation.navigate('processing');
		} else {
			navigation.navigate('account');
		}
	}
	const title = 'Ваш пол:';
	const description = 'Мы настроем персональные рекомендации лунного календаря, учитывая влияние лунных фаз на биоритмы';
	const btnText = 'Сохранить';

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
				<View style={ styles.block }>
					<Pressable style={ [styles.square, gender === 'Мужской' && styles.active] } onPress={ () => activeGender('Мужской') }>
						<View style={ styles.maleIcon }>
							{ maleIcon('#fff') }
						</View>
					</Pressable>
					<Text style={ styles.text }>Мужской</Text>
				</View>
				<View style={ styles.block }>
					<Pressable style={ [styles.square, gender === 'Женский' && styles.active] } onPress={ () => activeGender('Женский') }>
						<View style={ styles.femaleIcon }>
							{ femaleIcon('#fff') }
						</View>
					</Pressable>
					<Text style={ styles.text }>Женский</Text>
				</View>
			</View>
		</PersonalTemplate>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'row',
		columnGap: 10
	},
	block: {
		flex: 1,
		alignContent: 'center'
	},
	square: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		maxWidth: 210,
		maxHeight: 165,
		borderWidth: 1,
		borderColor: 'transparent',
		borderRadius: 17,
		marginBottom: 10,
		backgroundColor: 'rgba(255, 255, 255, .12)'
	},
	maleIcon: {
		width: 43,
		height: 42
	},
	femaleIcon: {
		width: 31,
		height: 49
	},
	text: {
		// fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		color: '#fff'
	},
	active: {
		borderColor: '#fff'
	}
});
