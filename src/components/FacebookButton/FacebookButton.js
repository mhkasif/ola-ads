import CustomText from '@components/CustomText/CustomText';
import {Button, Center, HStack, Icon, Image} from 'native-base';
import React, {useEffect} from 'react';
import Facebook from 'assets/facebook-btn-logo.png';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {Settings} from 'react-native-fbsdk-next';
import {connect} from 'react-redux';
import {loginWithToken} from 'redux/authSlice/authActions';
import Toast from 'react-native-toast-message';
import { StackActions, useNavigation } from '@react-navigation/native';
import { SCREEN_NAMES } from 'screens/screenNames';

const FacebookButton = props => {
  const {setIsLoading,type}=props
  const {navigate, ...navigation} = useNavigation();

  const onFacebookButtonPress = async () => {
    console.log("facebook",type)
    try {
      // Attempt login with permissions
      setIsLoading(true)
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log({result});
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const d = await AccessToken.getCurrentAccessToken();

      if (!d) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        d.accessToken,
      );
      // Sign-in the user with the credential
      const user = await auth().signInWithCredential(facebookCredential);
      const authToken = await user.user.getIdToken();
      const {error, data} = await props.loginWithToken(authToken,type);
      setIsLoading(false)
      if (error) throw new Error(error);
      if (!error) {
        const resetAction = StackActions.replace(
          data.user.isNew ? SCREEN_NAMES.ONBOARDING : SCREEN_NAMES.MAIN,
        );

        navigation.dispatch(resetAction);
      }
    } catch (error) {
      setIsLoading(false)
      Toast.show({
        type: 'error',
        text1: 'Log In Failed',
        text2: error.nativeErrorMessage||error.message
      })
      console.log({error});
    }
  };
  useEffect(() => {
    Settings.setAdvertiserTrackingEnabled(true);
  }, []);
  return (
    <Button
      {...props}
      flex={1}
      onPress={onFacebookButtonPress}
      bg="#fff"
      _hover={{bg: '#fff'}}
      _active={{bg: '#fff'}}
      _focus={{bg: '#fff'}}
      //onpress it is showing dark
      _pressed={{bg: '#fff', transform: [{translateY: 1}]}}
      borderRadius={4}
      //   px={4}
      //   py={2}
      shadow={2}
      shadowColor="#000"
      shadowOffset={{width: 0, height: 2}}
      shadowOpacity={0.3}
      shadowRadius={2}>
      <Center>
        <HStack justifyContent="space-between">
          <Image mr={4} source={Facebook} alt="Facebook" />
          <CustomText color="#0D103D" fontWeight="bold">
            Facebook
          </CustomText>
        </HStack>
      </Center>
    </Button>
  );
};
const actions = {
  loginWithToken,
};

export default connect(null, actions)(FacebookButton);
