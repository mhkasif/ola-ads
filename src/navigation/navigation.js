import CustomHeader from '@components/CustomHeader/CustomHeader';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';
import CreatePost from 'screens/CreatePost/CreatePost';
import OnBoardingScreen from 'screens/OnBoardingScreen/OnBoardingScreen';
import PostScreen from 'screens/PostScreen/PostScreen';
import {SCREEN_NAMES} from 'screens/screenNames';
import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import ContactUs from 'screens/ContactUs/ContactUs';
import TermsAndCondition from 'screens/TermsAndCondition/TermsAndCondition';
const header = ({route: {name}, ...props}) => (
  <CustomHeader title={name} {...props} />
);

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  const {user} = useSelector(state => state.auth);
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name={SCREEN_NAMES.SPLASH}
        component={SplashScreen}
        options={{headerShown: false}}
      /> */}

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
            name={SCREEN_NAMES.ONBOARDING}
            component={OnBoardingScreen}
            options={{headerShown: false}}
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
      <Stack.Screen
        name={SCREEN_NAMES.CONTACT}
        component={ContactUs}
        options={{
          header,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.Terms}
        component={TermsAndCondition}
        options={{header}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
