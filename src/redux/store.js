import {persistStore} from 'redux-persist';
import {middleware, persistedReducer} from './rootReducer';
import {configureStore} from '@reduxjs/toolkit';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
});

export const persistor = persistStore(store);
