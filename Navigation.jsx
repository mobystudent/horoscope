import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalScreen from './screens/PersonalScreen';
import NameScreen from './screens/personal/NameScreen';
import TimeScreen from './screens/personal/TimeScreen';
import CityScreen from './screens/CityScreen';
import GenderScreen from './screens/GenderScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import MoonScreen from './screens/MoonScreen';
import EditScreen from './screens/EditScreen';

const Stack = createStackNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="name"
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name="registration" component={ PersonalScreen } />
				<Stack.Screen name="name" component={ NameScreen } />
				<Stack.Screen name="time" component={ TimeScreen } />
				<Stack.Screen name="city" component={ CityScreen } />
				<Stack.Screen name="gender" component={ GenderScreen } />
				<Stack.Screen name="processing" component={ ProcessingScreen } />
				<Stack.Screen name="moon" component={ MoonScreen } />
				<Stack.Screen name="edit" component={ EditScreen } />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
