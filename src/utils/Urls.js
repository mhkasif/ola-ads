// export const BASIC_URL="http://10.0.2.2:3000"

import {ENV} from 'config';
import {Platform} from 'react-native';
export const BASIC_URL =
  ENV === 'dev'
    ? Platform.OS === 'ios'
      ? 'http://localhost:3000'
      : 'http://10.0.2.2:3000'
    : 'https://test.markcoders.com/ola_ads_api';

export const IMAGE_DIRECTORY = ENV === 'dev' ? BASIC_URL : '';
export const BASE_URL = BASIC_URL + '/api/v1';
export const URLS = {
  AUTH: '/user/firebase-authentication',
  CREATE_AD: '/user/create-ad',
  GET_ADS: '/user/view-ads',
  GET_CATEGORIES: '/user/view-categories',
  UPDATE_USER: '/user/edit-profile',
  GET_PLANS: '/user/view-plans',
  CREATE_SUBSCRIPTION: '/user/create-subscription',
  MY_SUBSCRIPTION: '/user/my-subscription',
  CONFIRM_PAYMENT: '/user/retrive-subscription',
  DEACTIVATE_ACCOUNT: '/user/deactivate-user',
};
