import axios from 'axios';
import {DEL, POST, PUT} from './constants';
import {BASE_URL} from './Urls';
import {store} from 'redux/store';
import {logoutAction} from 'redux/authSlice/authActions';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json, text/plain, * / *',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    put: 'application/json',
    post: 'application/json',
  },
});

axiosInstance.interceptors.request.use(async config => {
  const token = store.getState()?.auth?.authToken;

  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  async response => {
    // If the response status is 480, perform logout action
    if (response.status === 480) {
      // Call your logout function here
      store.dispatch(logoutAction());
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);
const defaultError = 'Something went wrong!!';
const apiMethod = async meta => {
  let res;
  switch (meta.method) {
    case POST:
      try {
        res = await axiosInstance.post(meta.endpoint, meta.params, {
          ...(meta.options || {}),
          // refectored: true,
          // cancelToken: cancelSource.source?.token,
        });
        console.log('httpPOST', res);
        return {data: res.data};
      } catch (error) {
        console.log('HttpPostError', error);
        return {
          error: error?.response?.data?.message || defaultError,
        };
      }

    case PUT:
      try {
        res = await axiosInstance.put(meta.endpoint, meta.params, {
          ...meta.options,
          // refectored: true,
          // cancelToken: cancelSource.source?.token,
        });
        return {data: res.data};
      } catch (error) {
        // console.log("httpPUT", res);
      }
      break;
    // console.log("httpPUT", res);
    case DEL:
      try {
        res = await axiosInstance.delete(meta.endpoint, meta.params, {
          ...meta.options,
          // refectored: true,
          // cancelToken: cancelSource.source?.token,
        });
        return res;
      } catch (error) {
        console.log('httpDEL', res);
      }
      break;
    default:
      try {
        res = await axiosInstance.get(meta.endpoint, {
          ...meta.params,
          ...meta.options,
          // refectored: true,
          // cancelToken: cancelSource.source?.token,
        });
        console.log('httpGET', res);
        return {data: res.data};
      } catch (error) {
        console.log('httpGETError', error);
        return {
          error,
        };
      }
  }
};
export const fileUploadMethod = async meta => {
  console.log({meta});
  let res;
  try {
    res = await axiosInstance.post(meta.endpoint, meta.params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => {
        // !!! override data to return formData
        // since axios converts that to string
        return data;
      },
    });
    console.log('FILEUPLOAD', res);
    return {data: res.data};
  } catch (error) {
    console.log('FILEUPLOADError', error);
    return {
      error: error?.response?.data?.message || defaultError,
    };
  }
};
export default apiMethod;
