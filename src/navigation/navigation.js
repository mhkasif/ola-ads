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
import {headerOptions} from '@utils/helpers';
import CustomHeader from '@components/CustomHeader/CustomHeader';
import PostScreen from 'screens/PostScreen/PostScreen';
import {useSelector} from 'react-redux';
import OnBoardingScreen from 'screens/OnBoardingScreen/OnBoardingScreen';
const header = ({route: {name}, ...props}) => (
  <CustomHeader title={name} {...props} />
);

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  const {user} = useSelector(state => state.auth);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAMES.SPLASH}
        component={SplashScreen}
        options={{headerShown: false}}
      />

      {user && (
        <Stack.Screen
          name={SCREEN_NAMES.ONBOARDING}
          component={OnBoardingScreen}
          options={{headerShown: false}}
        />
      )}

      {!user ? (
        <>
          <Stack.Screen
            name={SCREEN_NAMES.AUTH}
            component={AuthStackNavigator}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={SCREEN_NAMES.MAIN}
            component={BottomTabNavigator}
            options={{headerShown: false}}
            // initialParams={{route}}
          />
          <Stack.Screen
            name={SCREEN_NAMES.CREATE_AD}
            component={CreatePost}
            options={{
              header,
            }}
          />

          <Stack.Screen
            name={SCREEN_NAMES.POST_DETAILS}
            component={PostScreen}
            options={{
              header,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
