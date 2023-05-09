import CustomHeader from '@components/CustomHeader/CustomHeader';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback} from 'react';
import ForgotPassword from 'screens/ForgotPasswordScreen/ForgotPasswordScreen';
import LoginScreen from 'screens/LoginScreen/LoginScreen';
import OtpScreen from 'screens/OTPScreen/OTPScreen';
import PaymentScreen from 'screens/PaymentScreen/PaymentScreen';
import SignupScreen from 'screens/SignupScreen/SignupScreen';
import {SCREEN_NAMES} from 'screens/screenNames';

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const header = useCallback(
    ({route: {name}, ...props}) => <CustomHeader title={name} {...props} />,
    [],
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREEN_NAMES.SIGNUP} component={SignupScreen} />
      <Stack.Screen name={SCREEN_NAMES.OTP} component={OtpScreen} />
      <Stack.Screen name={SCREEN_NAMES.PAYMENT} component={PaymentScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{
          headerShown: true,
          header,
        }}
      />
    </Stack.Navigator>
  );
};
export default AuthStackNavigator;
