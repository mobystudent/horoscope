import * as React from 'react';
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';

export default function Header(props) {
	const {
		navigation = {},
		title = '',
		subtitle = '',
		leftButton: {
			link: linkLeft = '',
			icon: iconLeft = ''
		} = {},
		rightButton: {
			link: linkRight = '',
			icon: iconRight = ''
		} = {}
	} = props;
	const viewRightButton = linkRight ?
		<Pressable onPress={ () => navigation.navigate(linkRight) } style={ styles.btn }>
			<Image
				style={ styles.image }
				source={ iconRight }
			/>
		</Pressable>
		: <View style={ styles.btn }></View>;

	return (
		<View style={ styles.header }>
			{ Object.keys(props).length !== 0 && <>
					<Pressable onPress={ () => navigation.navigate(linkLeft) } style={ styles.btn }>
						<Image
							style={ styles.image }
							source={ iconLeft }
						/>
					</Pressable>
					<View>
						<Text style={ styles.title }>{ title }</Text>
						{ subtitle && <Text style={ styles.subtitle }>{ subtitle }</Text>}
					</View>
					{ viewRightButton}
				</>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 50,
		marginTop: 30,
		marginBottom: 10
	},
	image: {
		width: 24,
		height: 24
	},
	title: {
		// fontFamily: 'SFBold',
		color: '#fff',
		textAlign: 'center',
		fontSize: 17,
		letterSpacing: -0.1,
		marginBottom: 5
	},
	subtitle: {
		// fontFamily: 'SFReg',
		color: 'rgba(255, 255, 255, .5)',
		textAlign: 'center',
		fontSize: 12
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 32,
		height: 32
	}
});
