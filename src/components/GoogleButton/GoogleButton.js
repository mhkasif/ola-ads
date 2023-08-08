import CustomText from '@components/CustomText/CustomText';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Google from 'assets/google-btn-logo.png';
import {Button, Center, HStack, Image} from 'native-base';
import React, {useEffect} from 'react';

import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {loginWithToken} from 'redux/authSlice/authActions';
import Toast from 'react-native-toast-message';
import {StackActions, useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from 'screens/screenNames';

const GoogleButton = props => {
  const {navigate, ...navigation} = useNavigation();

  const {setIsLoading, type} = props;
  console.log(type);
  // 1077115806182-tdc7qof16mpke7ok6qlrqslfnad9p18k.apps.googleusercontent.com
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '245208965834-9n1kka698ephntm27muvkkps61mpqgt5.apps.googleusercontent.com',
      webClientId:
        // '804058128507-qfqu0l7cv05nsubiqpbjh2c47dqmml6m.apps.googleusercontent.com',
        '245208965834-mevg11birill0tivsri7d72tjgotls16.apps.googleusercontent.com',
    });
  }, []);
  const signIn = async () => {
    // Check if your device supports Google Play
    console.log('singin', type);
    try {
      setIsLoading(true);
      console.log(
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        }),
      );
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      console.log({idToken});
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // // Sign-in the user with the credential
      const user = await auth().signInWithCredential(googleCredential);
      console.log(await user.user.getIdToken());
      const authToken = await user.user.getIdToken();
      const {error, data} = await props.loginWithToken(authToken, type);
      console.log({error, data});
      setIsLoading(false);
      if (error) throw new Error(error);
      if (!error) {
        const resetAction = StackActions.replace(
          data.user.isNew ? SCREEN_NAMES.ONBOARDING : SCREEN_NAMES.MAIN,
        );

        navigation.dispatch(resetAction);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Log In Failed',
        text2: error.nativeErrorMessage || error.message,
      });
      console.log({error});
    }
  };
  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log({userInfo})
  //     setState({userInfo});
  //   } catch (error) {
  //     console.log({error})
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {

  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };
  return (
    // <GoogleSigninButton
    //   style={{width: 192, height: 48}}
    //   size={GoogleSigninButton.Size.Wide}
    //   color={GoogleSigninButton.Color.Dark}

    //   onPress={signIn}
    //   disabled={state.isSigninInProgress}
    // />
    <Button
      {...props}
      flex={1}
      bg="#fff"
      _hover={{bg: '#fff'}}
      _active={{bg: '#fff'}}
      _focus={{bg: '#fff'}}
      borderRadius={4}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      _pressed={{bg: '#fff', transform: [{translateY: 1}]}}
      //   px={4}
      //   py={2}
      shadow={2}
      shadowColor="#000"
      shadowOffset={{width: 0, height: 2}}
      onPress={signIn}
      shadowOpacity={0.3}>
      <Center>
        <HStack>
          <Image mr={4} source={Google} alt="Google" />
          <CustomText color="#0D103D" fontWeight="bold">
            Google
          </CustomText>
        </HStack>
      </Center>
    </Button>
  );
};
const actions = {
  loginWithToken,
};
export default connect(null, actions)(GoogleButton);
