import axios from 'axios';
import {DEL, POST, PUT} from './constants';
import {BASE_URL} from './Urls';
axios.defaults.headers.common['Accept'] = 'application/json, text/plain, * / *';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;
const defaultError = 'Something went wrong!!';
const apiMethod = async meta => {
  let res;
  switch (meta.method) {
    case POST:
      try {
        res = await axios.post(meta.endpoint, meta.params, {
          ...(meta.options || {}),
          // refectored: true,
          // cancelToken: cancelSource.source?.token,
        });
        console.log('httpPOST', res);
        return res.data;
      } catch (error) {
        return {
          error: error?.response?.data?.message || defaultError,
        };
      }

    case PUT:
      try {
        res = await axios.put(meta.endpoint, meta.params, {
          ...meta.options,
          // refectored: true,
          // cancelToken: cancelSource.source?.token,
        });
        return res;
      } catch (error) {
        // console.log("httpPUT", res);
      }
      break;
    // console.log("httpPUT", res);
    case DEL:
      try {
        res = await axios.delete(meta.endpoint, meta.params, {
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
        res = await axios.get(meta.endpoint, {
          ...meta.params,
          ...meta.options,
          // refectored: true,
          // cancelToken: cancelSource.source?.token,
        });
        return res;
      } catch (error) {
        console.log('httpGET', res);
      }
  }
};

export default apiMethod;
