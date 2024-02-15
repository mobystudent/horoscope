import * as React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';

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
			icon: iconRight = '',
			btn: typeBtn = '',
			params = null
		} = {}
	} = props;
	console.log(params);
	// const actionBtn = linkRight ? navigation.navigate(linkRight, { ...params }) : navigation.navigate(linkRight, { ...params });

	return (
		<View style={ styles.header }>
			{ Object.keys(props).length !== 0 && <>
					<Pressable style={ styles.btn } onPress={ () => navigation.navigate(linkLeft) }>
						{ iconLeft }
					</Pressable>
					<View>
						<Text style={ styles.title }>{ title }</Text>
						{ subtitle && <Text style={ styles.subtitle }>{ subtitle }</Text>}
					</View>
					<Pressable style={ styles.btn } onPress={ () => navigation.navigate(linkRight, { ...params }) }>
						{ iconRight }
					</Pressable>
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
	title: {
		// fontFamily: 'SFBold',
		color: '#fff',
		textAlign: 'center',
		fontSize: 17,
		letterSpacing: -.1,
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
