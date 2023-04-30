/* eslint-disable react-hooks/exhaustive-deps */
import {StackActions, useNavigation} from '@react-navigation/native';
import Splash from 'assets/splash.png';
import {Box, Image} from 'native-base';
import React, {useEffect} from 'react';
import {SCREEN_NAMES} from 'screens/screenNames';
const SplashScreen = () => {
  const navigate = useNavigation();
  const resetAction = StackActions.replace(SCREEN_NAMES.AUTH);

  useEffect(() => {
    let x = setTimeout(() => {
      navigate.dispatch(resetAction);
    }, 3000);

    return () => {
      clearTimeout(x);
    };
  }, []);

  return (
    <Box>
      <Image source={Splash} width="100%" height="100%" alt="Splash Screen" />
    </Box>
  );
};

export default SplashScreen;
