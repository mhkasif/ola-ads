import {URLS} from '@utils/Urls';
import {POST} from '@utils/constants';

export const LOGIN_META = {
  method: POST,
  endpoint: URLS.LOGIN,
  params: {
    email: '',
    password: '',
  },
};
