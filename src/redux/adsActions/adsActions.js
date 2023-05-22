import Toast from 'react-native-toast-message';
import {GET_ADS_META, CREATE_AD_META} from './adsAPI';
import apiMethod, {fileUploadMethod} from '@utils/HTTPServices';
import {setAds} from './adsSlice';

export const createAdAction = formData => async () => {
  try {
    const {data, error} = await fileUploadMethod({
      ...CREATE_AD_META,
      params: formData,
    });
    if (error) {
      throw new Error(error);
    }
    Toast.show({
      type: 'success',
      text1: 'Ad Created',
      text2: 'Your ad has been created successfully',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to create ad',
      text2: error,
    });
  }
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
