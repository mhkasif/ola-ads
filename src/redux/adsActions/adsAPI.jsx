import {URLS} from '@utils/Urls';
import {GET, POST} from '@utils/constants';

export const CREATE_AD_META = {
  method: POST,
  endpoint: URLS.CREATE_AD,
  params: {
    description: '',
    files: null,
    categories: [],
  },
};
export const GET_ADS_META = {
  method: GET,
  endpoint: URLS.GET_ADS,
};
export const GET_CATEGORIES_META = {
  method: GET,
  endpoint: URLS.GET_CATEGORIES,
};

export const GET_DAYS_META={
  method: GET,
  endpoint:URLS.DAYS
}