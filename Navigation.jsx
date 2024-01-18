import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalScreen from './screens/PersonalScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import MoonScreen from './screens/MoonScreen';
import EditScreen from './screens/EditScreen';

const Stack = createStackNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="moon"
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name="registration" component={ PersonalScreen } />
				<Stack.Screen name="processing" component={ ProcessingScreen } />
				<Stack.Screen name="moon" component={ MoonScreen } />
				<Stack.Screen name="edit" component={ EditScreen } />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
