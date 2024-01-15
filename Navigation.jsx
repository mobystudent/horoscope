import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalScreen from './screens/PersonalScreen';

const Stack = createStackNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Registration"
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name="Registration" component={ PersonalScreen } />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
