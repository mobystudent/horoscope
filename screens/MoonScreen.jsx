import * as React from 'react';
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import Container from './Container';
import Header from '../components/Header';

export default function Moon({ navigation }) {
	return (
		<Container>
			<Header navigation={ navigation } />
		</Container>
	);
}

const styles = StyleSheet.create({

});
