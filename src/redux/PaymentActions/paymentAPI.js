import {URLS} from '@utils/Urls';
import {GET, POST} from '@utils/constants';

export const GET_MY_SUBSCRIPTION = {
  method: GET,
  endpoint: URLS.MY_SUBSCRIPTION,
};

export const CREATE_SUBSCRIPTION_META = {
  method: POST,
  endpoint: URLS.CREATE_SUBSCRIPTION,
  params: {
    plan_id: '',
  },
};
export const GET_PLANS_META = {
  method: GET,
  endpoint: URLS.GET_PLANS,
};
export const GET_CONFIRM_PAYMENT_STATUS_META = {
  method: POST,
  endpoint: URLS.CONFIRM_PAYMENT,
  params: {
    subscription_id: '',
  },
};
