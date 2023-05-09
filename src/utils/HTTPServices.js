import axios from 'axios';
import {DEL, POST, PUT} from './constants';

const apiMethod = async meta => {
  let res;
  switch (meta.method) {
    case POST:
      try {
        res = await axios.post(meta.endpoint, meta.params, {
          ...meta.options,
          // refectored: true,
          // cancelToken: cancelSource.source?.token,
        });
        return res;
        // console.log("httpPOST", res);
      } catch (error) {
        console.log('httpPOST', res);
      }
      break;

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
