/* eslint-disable react-hooks/exhaustive-deps */
import {StackActions, useNavigation} from '@react-navigation/native';
import RootNavigator from 'navigation/navigation';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {SCREEN_NAMES} from './screenNames';
const MainScreen = () => {
  const {user} = useSelector(state => state.auth);
  const navigate = useNavigation();

  // const resetAction = StackActions.replace(SCREEN_NAMES.ONBOARDING);

  useEffect(() => {
    let resetAction = '';
    if (user?.isNew) {
      resetAction = StackActions.replace(SCREEN_NAMES.ONBOARDING);
    } else {
      resetAction = StackActions.replace(
        user ? SCREEN_NAMES.MAIN : SCREEN_NAMES.AUTH,
      );
    }
    let x = setTimeout(() => {
      SplashScreen.hide();
      navigate.dispatch(resetAction);
    }, 2000);

    return () => {
      clearTimeout(x);
    };
  }, []);
  return (
    <>
      <RootNavigator />
      <Toast />
    </>
  );
};
export default MainScreen;
