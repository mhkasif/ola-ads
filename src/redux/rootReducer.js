import { MMKV } from 'react-native-mmkv';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import AdsReducer from './adsActions/adsSlice';
import AuthReducer from './authSlice/authSlice';
export const storage = new MMKV();
export const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth'], // persist both auth and counter slices
};
const rootReducer = combineReducers({
  // counter: counterReducer,
  auth: AuthReducer,
  ads: AdsReducer,
});

const Reducers = (state, action) => {
  console.log({action});
  if (action.type === 'auth/removeAuth') {
    // for all keys defined in your persistConfig(s)
    storage.delete('persist:root');
    // storage.removeItem('persist:otherKey')

    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};
export const persistedReducer = persistReducer(persistConfig, Reducers);

const mw = [thunk];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  mw.push(createDebugger());
  initializeMMKVFlipper({default: storage});
}

const middleware = mw;
export { middleware };

