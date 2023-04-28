import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from 'screens/LoginScreen/LoginScreen';
import OtpScreen from 'screens/OTPScreen/OTPScreen';
import SignupScreen from 'screens/SignupScreen/SignupScreen';
import {SCREEN_NAMES} from 'screens/screenNames';

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREEN_NAMES.SIGNUP} component={SignupScreen} />
      <Stack.Screen name={SCREEN_NAMES.OTP} component={OtpScreen} />
    </Stack.Navigator>
  );
};
export default AuthStackNavigator;
