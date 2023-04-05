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
      console.log({payload, state});
      state.user = payload.user || 'hello';
      state.authToken = payload.authToken;
    },
    removeAuth: state => {
      state.auth = null;
    },
  },
});

export const {addAuth, removeAuth} = AuthSlice.actions;
const AuthReducer = AuthSlice.reducer;
export default AuthReducer;
