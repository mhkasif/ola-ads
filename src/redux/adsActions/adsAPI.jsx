import {URLS} from '@utils/Urls';
import {POST} from '@utils/constants';

export const CREATE_AD_META = {
  method: POST,
  endpoint: URLS.CREATE_AD,
  params: {
    description: '',
    files: null,
    categories: [],
  },
};
