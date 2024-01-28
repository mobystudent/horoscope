import * as React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';

import account from '../assets/images/account.png';
import edit from '../assets/images/edit.png';

export default function Moon({ navigation }) {
	const title = 'Растущая луна';
	const subtitle = 'I Фаза';
	const leftButton = {
		link: 'account',
		icon: account
	};
	const rightButton = {
		link: 'edit',
		icon: edit
	};

	return (
		<Container>
			<Header
				navigation={ navigation }
				title={ title }
				subtitle={ subtitle }
				leftButton={ leftButton }
				rightButton={ rightButton }
			/>
		</Container>
	);
}

const styles = StyleSheet.create({

});
