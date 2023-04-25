import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CreatePost from 'screens/CreatePost/CreatePost';
import SplashScreen from 'screens/SplashScreen/SplashScreen';
import {SCREEN_NAMES} from 'screens/screenNames';
import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import ChangePasswordScreen from 'screens/ChangePasswordScreen/ChangePasswordScreen';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBackground from '@components/HeaderBackground/HeaderBackground';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAMES.SPLASH}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CHANGE_PASSWORD}
        component={ChangePasswordScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            height: 100,
            backgroundColor: 'transparent',
          },
          headerBackground: HeaderBackground,

          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name={SCREEN_NAMES.AUTH}
        component={AuthStackNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={SCREEN_NAMES.MAIN}
        component={BottomTabNavigator}
        options={{headerShown: false}}
        // initialParams={{route}}
      />

      <Stack.Screen
        name={SCREEN_NAMES.CREATE_POST}
        component={CreatePost}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
