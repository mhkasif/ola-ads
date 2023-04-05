import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import AuthReducer from './authSlice/authSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [], // persist both auth and counter slices
};
const rootReducer = combineReducers({
  // counter: counterReducer,
  auth: AuthReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const middleware = [thunk];
