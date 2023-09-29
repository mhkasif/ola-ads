/* eslint-disable no-undef */
import apiMethod, {fileUploadMethod} from '@utils/HTTPServices';
import {generateQueryString} from '@utils/helpers';
import Toast from 'react-native-toast-message';
import {store} from 'redux/store';
import {
  CREATE_AD_META,
  GET_ADS_META,
  GET_CATEGORIES_META,
  GET_DAYS_META,
} from './adsAPI';
import {appendAds, removeAds, setAds} from './adsSlice';

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
export const getDaysAction = () => async (dispatch) => {
  try {
    const {data, error} = await apiMethod(GET_DAYS_META);
    if (error) {
      throw new Error(error);
    }
    return {data};
  } catch (error) {
    console.log({error});
    return {error};
  }
};
