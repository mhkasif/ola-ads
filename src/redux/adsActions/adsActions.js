/* eslint-disable no-undef */
import Toast from 'react-native-toast-message';
import {
  GET_ADS_META,
  CREATE_AD_META,
  GET_CATEGORIES_META,
  GET_PLANS_META,
  CREATE_SUBSCRIPTION_META,
} from './adsAPI';
import apiMethod, {fileUploadMethod} from '@utils/HTTPServices';
import {appendAds, removeAds, setAds} from './adsSlice';
import {store} from 'redux/store';
import {generateQueryString} from '@utils/helpers';

export const createAdAction = formData => async dispatch => {
  try {
    const {data, error} = await fileUploadMethod({
      ...CREATE_AD_META,
      params: formData,
    });
    if (error) {
      throw new Error(error);
    }
    await dispatch(getAdsAction());

    Toast.show({
      type: 'success',
      text1: 'Ad Created',
      text2: 'Your ad created successfully',
    });
    return {
      data: true,
    };
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to create ad',
      text2: error.message,
    });
    return {
      error: true,
    };
  }
};
export const getCategoriesAction = () => async () => {
  try {
    const {data, error} = await apiMethod({
      ...GET_CATEGORIES_META,
    });
    console.log(data);
    if (error) {
      throw new Error(error);
    }
    return data;
  } catch (error) {
    console.log({error});
  }
};
export const clearAds = () => async dispatch => {
  dispatch(removeAds());
};

export const getAdsAction = () => async dispatch => {
  try {
    const {data, error} = await apiMethod({
      ...GET_ADS_META,
    });
    console.log(data);
    if (error) {
      throw new Error(error);
    }
    dispatch(setAds(data));
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to get ad',
      text2: error,
    });
  }
};
export const appendAdsAction = () => async dispatch => {
  try {
    let pagination = store.getState().ads.pagination;
    let paginationClone = {...pagination};
    paginationClone.page = paginationClone.page + 1;
    const endpoint = generateQueryString(
      GET_ADS_META.endpoint,
      paginationClone,
    );
    console.log({endpoint});
    const {data, error} = await apiMethod({
      ...GET_ADS_META,
      endpoint,
    });
    if (error) {
      throw new Error(error);
    }
    dispatch(appendAds(data));
  } catch (error) {
    console.log({error});
    Toast.show({
      type: 'error',
      text1: 'Failed to fetch more ad',
      text2: error,
    });
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
    console.log({data});
    return {data};
  } catch (error) {
    console.log({error});
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
