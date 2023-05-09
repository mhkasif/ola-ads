import {generateRandomId, sleep} from '@utils/helpers';
import Toast from 'react-native-toast-message';
import {addAuth, removeAuth} from './authSlice';
import apiMethod from '@utils/HTTPServices';
import {LOGIN_META, SIGNUP_META} from './authAPI';
import auth from '@react-native-firebase/auth';

export const loginAction =
  ({email, password}) =>
  async dispatch => {
    try {
      // const meta = {...LOGIN_META, params: {email, password}};
      // let {error, data} = await apiMethod(meta);
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      console.log({user});
      // if (error) throw new Error(error);
      const {uid: id, displayName} = user;
      // const {user}=await auth().currentUser()
      let authToken = await user.getIdToken();
      let data = {
        authToken,
        user: {
          id,
          name: displayName,
          email,
        },
      };
      console.log({data})
      Toast.show({
        type: 'success',
        text1: 'Log In Success',
        text2: 'Welcome to the app',
        visibilityTime: 900,
      });
      // await sleep(1000);

      dispatch(addAuth(data));
      return {data};
    } catch (error) {
      console.log({error});

      Toast.show({
        type: 'error',
        text1: 'Log In Failed',
        text2: error.userInfo.message,
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
          name: fullName,
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
    await sleep(1000);
    dispatch(removeAuth());
  } catch (error) {
    console.log({error});
  }
};
