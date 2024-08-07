import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NameScreen from './screens/personal/NameScreen';
import DateScreen from './screens/personal/DateScreen';
import TimeScreen from './screens/personal/TimeScreen';
import CityScreen from './screens/personal/CityScreen';
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
				<Stack.Screen name="name" component={ NameScreen } />
				<Stack.Screen name="date" component={ DateScreen } />
				<Stack.Screen name="time" component={ TimeScreen } />
				<Stack.Screen name="city" component={ CityScreen } />
				<Stack.Screen name="gender" component={ GenderScreen } />
				<Stack.Screen name="processing" component={ ProcessingScreen } />
				<Stack.Screen name="moon" component={ MoonScreen } />
				<Stack.Screen name="account" component={ AccountScreen } />
				<Stack.Screen name="content" component={ ContentScreen } />
				<Stack.Screen name="createNote" component={ CreateNoteScreen } />
				<Stack.Screen name="notes" component={ NotesScreen } />
				<Stack.Screen name="image" component={ ImageScreen } />
				<Stack.Screen name="premium" component={ PremiumScreen } />
				<Stack.Screen name="start" component={ StartScreen } />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
