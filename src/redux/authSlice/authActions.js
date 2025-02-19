import auth from '@react-native-firebase/auth';
import apiMethod, { fileUploadMethod } from '@utils/HTTPServices';
import Toast from 'react-native-toast-message';
import { DEACTIVATE_ACCOUNT_META, DELETE_USER_META, LOGIN_META, UPDATE_USER } from './authAPI';
import { addAuth, removeAuth, updateAuth } from './authSlice';
export const loginWithToken = (authToken, type, fullName) => async dispatch => {
  try {
    console.log({type});
    const {error, data} = await apiMethod({
      ...LOGIN_META,
      params: {
        accessToken: authToken,
        //spread fullName if we have it
        ...(fullName ? {fullName} : {}),
      },
    });
    let d;
    if (error) {
      throw new Error(error);
    }
    console.log({data});
    const {token, ...userData} = data.user;
    d = {
      authToken: token,
      user: {
        ...userData,
        isNew: !!type,
      },
    };
    dispatch(addAuth(d));
    Toast.show({
      type: 'success',
      text1: 'Log In Success',
      text2: 'Welcome to the app',
      visibilityTime: 900,
    });
    // await sleep(1000);

    return {error, data: d};
  } catch (error) {
    return {error};
  }
};
export const loginAction =
  ({email = 'haseeb@gmail.com', password}) =>
  async dispatch => {
    try {
      // const meta = {...LOGIN_META, params: {email, password}};
      // let {error, data} = await apiMethod(meta);
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      console.log({user});
      // const {user}=await auth().currentUser()
      let authToken = await user.getIdToken();
      const {error, data} = await dispatch(loginWithToken(authToken));
      if (error) {
        throw new Error(error);
      }
      return {data};
    } catch (error) {
      console.log({error});

      Toast.show({
        type: 'error',
        text1: 'Log In Failed',
        text2: error?.userInfo?.message || error,
      });
      return {
        error,
      };
    }
  };
export const signupAction =
  ({email, password, fullName}) =>
  async dispatch => {
    try {
      let {user} = await auth().createUserWithEmailAndPassword(email, password);
      console.log({user});
      await user.updateProfile({
        displayName: fullName,
      });
      user = auth().currentUser;
      console.log({user});
      // const {user}=await auth().currentUser()
      let authToken = await user.getIdToken();
      console.log({authToken});
      const {error, data} = await apiMethod({
        ...LOGIN_META,
        params: {
          accessToken: authToken,
        },
      });
      if (error) {
        throw new Error(error);
      }
      const {token, ...userData} = data.user;
      let d = {
        authToken: token,
        user: {
          ...userData,
          isNew: true,
        },
      };
      console.log({data});
      Toast.show({
        type: 'success',
        text1: 'Sign up Successfully',
        text2: 'Welcome to the app',
        visibilityTime: 900,
      });
      dispatch(addAuth(d));
      return {data: d};
    } catch (error) {
      console.log({error});
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.userInfo.message,
      });
      return {
        error,
      };
    }
  };

export const logoutAction = () => async dispatch => {
  try {
    const res = await auth().signOut();
    console.log({res});
    dispatch(removeAuth());
    return true;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Logout Failed',
      text2: error.userInfo.message,
    });
    return false;
  }
};
export const updatePasswordAction =
  ({newPassword, currentPassword}) =>
  async dispatch => {
    try {
      let currentUser = auth().currentUser;

      const credential = auth.EmailAuthProvider.credential(
        currentUser.email,
        currentPassword,
      );

      //check if old password is correct
      let {user} = await currentUser.reauthenticateWithCredential(credential);
      console.log({user});

      // if authenticated update password
      await user.updatePassword(newPassword);
      //login again for new access_token
      let authToken = await user.getIdToken();
      const {error, data} = await apiMethod({
        ...LOGIN_META,
        params: {
          accessToken: authToken,
        },
      });
      const {token, ...userData} = data.user;
      let d = {
        authToken: token,
        user: {
          ...userData,
        },
      };
      dispatch(addAuth(d));
      Toast.show({
        type: 'success',
        text1: 'Password Updated',
        visibilityTime: 900,
      });
      // await sleep(1000);

      if (error) {
        throw new Error(error);
      }
      return {
        data: true,
      };
    } catch (error) {
      console.log({error});
      return {
        error: {
          message: error?.userInfo?.message || 'Something went wrong',
          code: error?.code || '500',
        },
      };
    }
  };
export const updateUserAction = data => async dispatch => {
  try {
    dispatch(updateAuth(data));
  } catch (error) {}
};
export const deactivateUserAction = () => async dispatch => {
  try {
    const resp = await apiMethod(DEACTIVATE_ACCOUNT_META);
    if (resp.error) {
      throw new Error(resp.error);
    }
    Toast.show({
      type: 'success',
      text1: 'Account Deactivated',
      text2: 'Your account has been deactivated',
    });
    dispatch(removeAuth());
  } catch (error) {
    console.log({error});
    Toast.show({
      type: 'error',
      text1: 'Unable to deactivate account',
      text2: error?.userInfo?.message || error,
    });
  }
};
export const deleteUser = () => async dispatch => {
  try {
    const resp = await apiMethod(DELETE_USER_META);
    if (resp.error) {
      throw new Error(resp.error);
    }
    Toast.show({
      type: 'success',
      text1: 'Account Deleted',
      text2: 'Your account has been deleted',
    });
    dispatch(removeAuth());
  } catch (error) {
    console.log({error});
    Toast.show({
      type: 'error',
      text1: 'Unable to delete account',
      text2: error?.userInfo?.message || error,
    });
  }
};

export const passwordResetEmailAction = email => async () => {
  console.log({email});
  try {
    // Send password reset email with the verification code
    await auth().sendPasswordResetEmail(email);
    Toast.show({
      type: 'success',
      text1: 'Email Sent',
      text2: 'Please check your email for the reset link',
      visibilityTime: 900,
    });
    return {
      data: true,
    };
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      Toast.show({
        type: 'error',
        text1: 'Email Not Found',
        text2: 'No user found with this email',
        visibilityTime: 900,
      });
      return {
        error: true,
      };
    }
    console.log('Error sending password reset email:', {error});

    Toast.show({
      type: 'error',
      text1: 'Email Failed',
      text2: 'Error sending password reset email',
    });
    return {
      error: true,
    };
  }
};

export const updateProfileAction = formData => async dispatch => {
  try {
    const {data, error} = await fileUploadMethod({
      ...UPDATE_USER,
      params: formData,
    });

    if (error) {
      throw new Error(error);
    }
    Toast.show({
      type: 'success',
      text1: 'Profile Updated',
      text2: 'Your profile has been updated successfully',
    });
    console.log({data});

    dispatch(updateAuth(data.updatedUser));
    return {data};
  } catch (error) {
    console.log({error});
    Toast.show({
      type: 'error',
      text1: 'Profile Update Failed',
      text2: error?.userInfo?.message || 'Something went wrong',
    });
    return {error};
  }
};
