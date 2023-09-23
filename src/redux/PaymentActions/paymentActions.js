import apiMethod from '@utils/HTTPServices';
import {
  GET_MY_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_META,
  GET_PLANS_META,
  GET_CONFIRM_PAYMENT_STATUS,
  GET_CONFIRM_PAYMENT_STATUS_META,
  GET_SYNC_SUBSCRIPTION_META,
} from './paymentAPI';
export const fetchMySubscription = async () => {
  const {data, error} = await apiMethod(GET_MY_SUBSCRIPTION);
  if (data) {
    return {data};
  } else {
    return {error};
  }
};

export const getPlansAction = () => async () => {
  try {
    const {data, error} = await apiMethod({
      ...GET_PLANS_META,
    });
    if (error) {
      throw new Error(error);
    }
    return {data};
  } catch (error) {
    console.log({error});
    return {error}
  }
};

export const createSubscriptionAction = plan_id => async () => {
  try {
    const {data, error} = await apiMethod({
      ...CREATE_SUBSCRIPTION_META,
      params: {
        plan_id,
      },
    });
    if (error) {
      throw new Error(error);
    }
    console.log({data});
    return {data};
  } catch (error) {
    console.log({error});
    return {error};
  }
};

export const confirmPaymentAction = async subscription_id => {
  try {
    console.log(subscription_id);
    const {data, error} = await apiMethod({
      ...GET_CONFIRM_PAYMENT_STATUS_META,
      params: {
        subscription_id,
      },
    });
    if (error) {
      throw new Error(error);
    }
    console.log({data});
    return {data};
  } catch (error) {}
};

export const syncSubscriptionWithRevenueCat = () => async () => {
  try {
    const {data, error} = await apiMethod({
      ...GET_SYNC_SUBSCRIPTION_META,
    });
    if (error) {
      throw new Error(error);
    }
    console.log({data});
    return {data};
  } catch (error) {
    console.log({error});
    return {error};
  }
};
