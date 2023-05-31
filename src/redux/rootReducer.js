// import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import AuthReducer from './authSlice/authSlice';
import AdsReducer from './adsActions/adsSlice';
import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();
export const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve(true)
  },
  getItem: (key) => {
    const value = storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem: (key) => {
    storage.delete(key)
    return Promise.resolve()
  },
}
const persistConfig = {
  key: 'root',
  storage:reduxStorage,
  whitelist: ["auth"], // persist both auth and counter slices
};
const rootReducer = combineReducers({
  // counter: counterReducer,
  auth: AuthReducer,
  ads: AdsReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const middleware = [thunk];
