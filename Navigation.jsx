import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalScreen from './screens/PersonalScreen';
import ProcessingScreen from './screens/ProcessingScreen';

const Stack = createStackNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="registration"
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name="registration" component={ PersonalScreen } />
				<Stack.Screen name="processing" component={ ProcessingScreen } />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
