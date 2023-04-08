import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen/LoginScreen';
import SignupScreen from './SignupScreen/SignupScreen';
import {SCREEN_NAMES} from './screenNames';
import Toast from 'react-native-toast-message';
import ListOfGroups from './ListOfGroups/ListOfGroups';
const Stack = createNativeStackNavigator();

const MainScreen = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREEN_NAMES.SIGNUP} component={SignupScreen} />
        <Stack.Screen name={SCREEN_NAMES.LIST_OF_GROUPS} component={ListOfGroups} />
        {/* <VStack space={5} alignItems="center">

<Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
<Text>Hello</Text>
</Box>
<ThemeToggle />
</VStack> */}
      </Stack.Navigator>
      <Toast />
    </>
  );
};

export default MainScreen;
