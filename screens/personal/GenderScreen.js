import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

export default function GenderScreen(props) {
	const { getData } = props;
	const [ gender, setGender ] = useState(null);
	const activeGender = (genderActive) => {
		setGender(genderActive);
		getData(genderActive);
	}

	return (
		<View style={ styles.wrap }>
			<View style={ styles.block }>
				<Pressable style={ [styles.square, gender === 'male' && styles.active] } onPress={ () => activeGender('male') }>
					<Image
						style={ styles.image }
						source={ require('../../assets/images/male.png') }
					/>
				</Pressable>
				<Text style={ styles.text }>Male</Text>
			</View>
			<View style={ styles.block }>
				<Pressable style={ [styles.square, gender === 'female' && styles.active] } onPress={ () => activeGender('female') }>
					<Image
						style={ styles.image }
						source={ require('../../assets/images/female.png') }
					/>
				</Pressable>
				<Text style={ styles.text }>Female</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {
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
		backgroundColor: 'rgba(255, 255, 255, 0.12)'
	},
	image: {
		width: 50,
		height: 50
	},
	text: {
		fontFamily: 'SFReg',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		color: '#fff'
	},
	active: {
		borderColor: '#fff'
	}
});
