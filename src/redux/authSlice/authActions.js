import {generateRandomId, sleep} from '@utils/helpers';
import Toast from 'react-native-toast-message';
import {addAuth} from './authSlice';
export const loginAction =
  ({email, password}) =>
  async dispatch => {
    try {
      let response = await sleep(1000);
      response = {
        authToken: generateRandomId(),
        user: {
          id: generateRandomId(),
          name: 'John Doe',
          email,
        },
      };
      Toast.show({
        type: 'success',
        text1: 'Login Success',
        text2: 'Welcome to the app',
      });
      await sleep(2000)
      dispatch(addAuth(response));
    } catch (error) {
        console.log({error})
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please try again',
      });
    }
  };
