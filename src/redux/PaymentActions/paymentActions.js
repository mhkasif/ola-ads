import apiMethod from '@utils/HTTPServices';
import {GET_MY_SUBSCRIPTION} from './paymentAPI';

export const fetchMySubscription = async () => {
  const {data, error} = await apiMethod(GET_MY_SUBSCRIPTION);
  if (data) {
    return {data};
  } else {
    return {error};
  }
};
