import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  ads:[]
};
export const AdsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setAds: (state, {payload}) => {
      // console.log({payload, state});
      state.ads = payload;
    },
    removeAds: state => {
      state.ads = [];
    },
  },
});

export const {setAds, removeAds} = AdsSlice.actions;
const AdsReducer = AdsSlice.reducer;
export default AdsReducer;
