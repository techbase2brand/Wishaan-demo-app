import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReelScreen from '../Reels';
import HomeScreen from '../HomeScreen';
import ChatScreen from '../ChatScreen';
import UserListScreen from '../UserListScreen ';


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home"  component={HomeScreen} options={{headerShown:false}} />
      <Stack.Screen name="ReelScreen" component={ReelScreen} options={{headerShown:false}} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown:false}} />
      <Stack.Screen name="UserListScreen" component={UserListScreen} options={{headerShown:false}} />

    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator