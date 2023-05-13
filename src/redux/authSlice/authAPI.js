import {URLS} from '@utils/Urls';
import {POST} from '@utils/constants';

export const LOGIN_META = {
  method: POST,
  endpoint: URLS.AUTH,
  params: {
    accessToken: '',
  },
};

export const SIGNUP_META = {
  method: POST,
  endpoint: URLS.SIGN_UP,
  params: {
    accessToken: '',
  },
};

export const UPDATE_USER = {
  method: POST,
  endpoint: URLS.UPDATE_USER,
  params: {
    fullName: '',
    email: '',
    displayPicture: '',
  },
};
