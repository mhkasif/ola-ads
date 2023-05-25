import axios from 'axios';
import {DEL, POST, PUT} from './constants';
import {BASE_URL} from './Urls';
import {store} from 'redux/store';

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
const defaultError = 'Something went wrong!!';
const apiMethod = async meta => {
  console.log({meta});

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
        return {data: res.data};
      } catch (error) {
        console.log('httpGETError', error);
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
    return res.data;
  } catch (error) {
    console.log('FILEUPLOADError', error);
    return {
      error: error?.response?.data?.message || defaultError,
    };
  }
};
export default apiMethod;
