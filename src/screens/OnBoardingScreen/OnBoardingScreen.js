/* eslint-disable react-hooks/exhaustive-deps */
import {StackActions, useNavigation} from '@react-navigation/native';
import {COLORS, linearGradient} from '@utils/colors';
import Image1 from 'assets/onboarding/step1.png';
import Image2 from 'assets/onboarding/step2.png';
import Image3 from 'assets/onboarding/step3.png';
import {Box, Image} from 'native-base';
import React, {useCallback} from 'react';
import { Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {connect} from 'react-redux';
import {updateUserAction} from 'redux/authSlice/authActions';
import {SCREEN_NAMES} from 'screens/screenNames';

const resetAction = StackActions.replace(SCREEN_NAMES.MAIN);
const OnBoardingScreen = ({updateUserAction}) => {
  const navigate = useNavigation();
  // const resetAction = StackActions.replace(user?SCREEN_NAMES.MAIN:SCREEN_NAMES.AUTH);

  const onDone = useCallback(() => {
    updateUserAction({isNew: false});
    navigate.dispatch(resetAction);
  }, []);

  return (
    <Box h="100%" bg={COLORS.primary}>
      <Box
        bg={{
          linearGradient,
        }}
        style={{
          height: '20%',
        }}
      />
      <Box
        // flex={1}
        bg="transparent"
        style={{
          flex: 1,
          // backgroundColor: '#fff',
          // borderRadius: 30,
          marginTop: '-6%',
        }}>
        <Onboarding
          onDone={onDone}
          onSkip={onDone}
          controlStatusBar={false}
          titleStyles={{
            color: COLORS.primary,

            transform: [{translateY: -80}],
          }}
          subTitleStyles={{
            color: COLORS.primary,
            transform: [{translateY: -80}],
          }}
          imageContainerStyles={{
            //lift up
            transform: [{translateY: -100}],
            paddingBottom: 0,
            margin: 0,
          }}
          bottomBarColor={COLORS.primary}
          containerStyles={{
            overflow: 'hidden',
            flex: 1,
            borderRadius: 30,
            backgroundColor: '#fff',
          }}
          pages={[
            {
              backgroundColor: 'transparent',
              image: <Image style={{}} alt="image" source={Image1} width={Dimensions.get("screen").width} h={Dimensions.get("screen").height/2.5} />,
              title: 'User Experience',
              subtitle:
                "Experience the power of OLA-ADS! Our intuitive interface lets you create and manage ads seamlessly, reaching millions of potential customers within minutes. Say 'Hello' to a new era of digital advertising and drive your business success with us. Let's transform the advertising landscape together!",
            },
            {
              backgroundColor: 'transparent',
              image: <Image alt="image" source={Image2}  width={Dimensions.get("screen").width} h={Dimensions.get("screen").height/3} />,
              title: 'Analytics',
              subtitle:
                'With OLA-ADS, we put the power of comprehensive analytics right at your fingertips. Our app provides you with in-depth and up-to-date data and insights on a weekly basis, enabling you to measure the performance of your advertising campaigns effectively. Say goodbye to guesswork and hello to data-driven decisions!',
            },
            {
              backgroundColor: 'transparent',
              image: <Image alt="image" source={Image3}  width={Dimensions.get("screen").width/1.2} h={Dimensions.get("screen").height/2.5} />,
              title: 'Thank You',
              subtitle:
                "Thank you for exploring OLA-ADS! Our intuitive interface empowers you to effortlessly create and manage ads, reaching millions of potential customers within minutes. Embrace a new era of digital advertising and drive your business to success with us. Together, let's revolutionize your advertising experience. Your Success is Our Priority!",
            },
          ]}
        />
      </Box>
    </Box>
  );
};

const actions = {
  updateUserAction,
};

export default connect(null, actions)(OnBoardingScreen);
