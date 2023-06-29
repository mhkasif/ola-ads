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

const FacebookButton = props => {
  const onFacebookButtonPress = async () => {
    try {
      // Attempt login with permissions
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
      const {error, data} = await props.loginWithToken(authToken);
      if (error) throw new Error(error);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
      console.log({error});
    }
  };
  useEffect(() => {
    Settings.setAdvertiserTrackingEnabled(true);
  }, []);
  return (
    <Button
      {...props}
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
