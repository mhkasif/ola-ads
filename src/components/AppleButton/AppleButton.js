import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import {connect} from 'react-redux';
import {loginWithToken} from 'redux/authSlice/authActions';
import Toast from 'react-native-toast-message';

function AppleSignIn({loginWithToken, type, setIsLoading}) {
  async function onAppleButtonPress() {
    // Start the sign-in request
    try {
        setIsLoading(true);
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      // Create a Firebase credential from the response
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      // Sign the user in with the credential
      const user =await auth().signInWithCredential(appleCredential);
      console.log({user})
      const authToken = await user.user.getIdToken();
      console.log(user.user)
      const {error, data} = await loginWithToken(authToken, type,user.user.displayName);
      if (error) throw new Error(error);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Log In Failed',
        text2: error.nativeErrorMessage || error.message,
      });
      console.log({error});
    }
  }
  return (
    <AppleButton
        style={{
            width:"100%",
            height:45,
            marginVertical:10
        }}
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.CONTINUE}
      onPress={onAppleButtonPress}
    />
  );
}

const actions = {
  loginWithToken,
};

export default connect(null, actions)(AppleSignIn);
