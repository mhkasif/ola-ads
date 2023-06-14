import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  user: null,
  authToken: '',
};
export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuth: (state, {payload}) => {
      // console.log({payload, state});
      state.user = payload.user;
      state.authToken = payload.authToken;
    },
    removeAuth: state => {
      state.user = null;
      state.authToken = '';
    },
    updateAuth: (state, {payload}) => {
      console.log({payload})
      state.user = {...state.user,...payload};
    },
    updateToken: (state, {payload}) => {
      state.authToken = payload.authToken;
    },
  },
});

export const {addAuth, removeAuth, updateAuth, updateToken} = AuthSlice.actions;
const AuthReducer = AuthSlice.reducer;
export default AuthReducer;
