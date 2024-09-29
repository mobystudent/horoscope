import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NameScreen from './screens/personal/NameScreen';
import CityScreen from './screens/basic/CityScreen';
import DateScreen from './screens/personal/DateScreen';
import TimeScreen from './screens/personal/TimeScreen';
import PlaceScreen from './screens/personal/PlaceScreen';
import GenderScreen from './screens/personal/GenderScreen';
import ImageScreen from './screens/personal/ImageScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import MoonScreen from './screens/MoonScreen';
import AccountScreen from './screens/AccountScreen';
import ContentScreen from './screens/ContentScreen';
import CreateNoteScreen from './screens/notesList/CreateNoteScreen';
import NotesScreen from './screens/notesList/NotesScreen';
import PremiumScreen from './screens/PremiumScreen';
import StartScreen from './screens/StartScreen';

const Stack = createStackNavigator();
const config = {
	animation: 'spring',
	config: {
		stiffness: 100,
		damping: 100,
		mass: 1,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01
	},
};

export default function Navigation({ screen }) {
	if (!screen) return;

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={ screen }
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen
					name="name"
					component={ NameScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="city"
					component={ CityScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="date"
					component={ DateScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="time"
					component={ TimeScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="place"
					component={ PlaceScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="gender"
					component={ GenderScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="processing"
					component={ ProcessingScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="moon"
					component={ MoonScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="account"
					component={ AccountScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="content"
					component={ ContentScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="createNote"
					component={ CreateNoteScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="notes"
					component={ NotesScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="image"
					component={ ImageScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="premium"
					component={ PremiumScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
				<Stack.Screen
					name="start"
					component={ StartScreen }
					options={{
						transitionSpec: {
							open: config,
							close: config
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
