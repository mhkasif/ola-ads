import auth from '@react-native-firebase/auth';
import apiMethod from '@utils/HTTPServices';
import {sleep} from '@utils/helpers';
import Toast from 'react-native-toast-message';
import {LOGIN_META} from './authAPI';
import {addAuth, removeAuth} from './authSlice';

export const loginAction =
  ({email = 'haseeb@gmail.com', password}) =>
  async dispatch => {
    try {
      // const meta = {...LOGIN_META, params: {email, password}};
      // let {error, data} = await apiMethod(meta);
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      console.log({user});
      // if (error) throw new Error(error);
      const {uid: id = '123', displayName = 'hello'} = user;
      // const {user}=await auth().currentUser()
      let authToken = await user.getIdToken();
      const {error, data} = await apiMethod({
        ...LOGIN_META,
        params: {
          accessToken: authToken,
        },
      });
      if (error) {
        throw new Error(error);
      }
      console.log({data});
      let d = {
        authToken: data?.user?.token,
        user: {
          id,
          fullName: displayName,
          email,
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

      return {data: d};
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
      const {uid: id} = user;
      // const {user}=await auth().currentUser()
      let authToken = await user.getIdToken();
      let data = {
        authToken,
        user: {
          id,
          fullName,
          email,
        },
      };
      console.log({data});
      Toast.show({
        type: 'success',
        text1: 'Sign up Successfully',
        text2: 'Welcome to the app',
        visibilityTime: 900,
      });
      dispatch(addAuth(data));
      return {data};
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
      console.log({user})
      const {uid: id = '123', displayName = 'hello',email} = user;

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
      let d = {
        authToken: data?.user?.token,
        user: {
          id,
          fullName: displayName,
          email:email,
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
  } catch (error) {}
};
export const deactivateUserAction = () => async dispatch => {
  try {
      const user=auth().currentUser

  } catch (error) {}

}