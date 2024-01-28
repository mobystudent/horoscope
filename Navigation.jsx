import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NameScreen from './screens/personal/NameScreen';
import TimeScreen from './screens/personal/TimeScreen';
import CityScreen from './screens/personal/CityScreen';
import GenderScreen from './screens/personal/GenderScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import MoonScreen from './screens/MoonScreen';
import EditScreen from './screens/EditScreen';
import AccountScreen from './screens/AccountScreen';
import ContentScreen from './screens/ContentScreen';

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
				<Stack.Screen name="name" component={ NameScreen } />
				<Stack.Screen name="time" component={ TimeScreen } />
				<Stack.Screen name="city" component={ CityScreen } />
				<Stack.Screen name="gender" component={ GenderScreen } />
				<Stack.Screen name="processing" component={ ProcessingScreen } />
				<Stack.Screen name="moon" component={ MoonScreen } />
				<Stack.Screen name="edit" component={ EditScreen } />
				<Stack.Screen name="account" component={ AccountScreen } />
				<Stack.Screen name="content" component={ ContentScreen } />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
