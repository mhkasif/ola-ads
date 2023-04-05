import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import {SCREEN_NAMES} from './screenNames';
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();

const MainScreen = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREEN_NAMES.SIGNUP} component={SignupScreen} />
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
