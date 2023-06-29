/* eslint-disable react-hooks/exhaustive-deps */
import {StackActions, useNavigation} from '@react-navigation/native';
import {COLORS, linearGradient} from '@utils/colors';
import Image1 from 'assets/onboarding/step1.png';
import {Box, Image} from 'native-base';
import React, {useCallback} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { connect } from 'react-redux';
import { updateUserAction } from 'redux/authSlice/authActions';
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
    <Box h="100%" bg="white">
      <Box
        bg={{
          linearGradient,
        }}
        style={{
          height: '20%',
        }}/>
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
              image: <Image alt="image" source={Image1} />,
              title: 'Lorem Ipsum Delor',
              subtitle:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
            {
              backgroundColor: 'transparent',
              image: <Image alt="image" source={Image1} />,
              title: 'Lorem Ipsum Delor',
              subtitle:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
            {
              backgroundColor: 'transparent',
              image: <Image alt="image" source={Image1} />,
              title: 'Lorem Ipsum Delor',
              subtitle:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
          ]}
        />
      </Box>
    </Box>
  );
};

const actions={
  updateUserAction
}

export default connect(null,actions)( OnBoardingScreen);
