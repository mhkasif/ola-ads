import {URLS} from '@utils/Urls';
import {DEL, POST} from '@utils/constants';

export const LOGIN_META = {
  method: POST,
  endpoint: URLS.AUTH,
  params: {
    accessToken: '',
  },
};
export const DEACTIVATE_ACCOUNT_META = {
  method: DEL,
  endpoint: URLS.DEACTIVATE_ACCOUNT,
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
    email: '',
    profile_photo: '',
  },
};
