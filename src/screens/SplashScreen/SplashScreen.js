import Splash from 'assets/splash.png';
import {useNavigation} from '@react-navigation/native';
import {Box, Image, StatusBar} from 'native-base';
import React, {useEffect} from 'react';
import {SCREEN_NAMES} from 'screens/screenNames';
const SplashScreen = () => {
  const {navigate} = useNavigation();
  useEffect(() => {
    let x = setTimeout(() => {
      navigate(SCREEN_NAMES.AUTH);
    }, 3000);
    return () => {
      clearTimeout(x);
    };
  }, [navigate]);
  return (
    <Box>
      {/* <StatusBar hidden /> */}
      <Image source={Splash} width="100%" height="100%" alt="Splash Screen" />
    </Box>
  );
};

export default SplashScreen;
