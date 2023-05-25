import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  ads: [],
  pagination: {
    page: 1,
    limit: 5,
    hasNextPage: false,
  },
};
export const AdsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setAds: (state, {payload}) => {

      state.ads = payload.ads;
      state.pagination = payload.pagination || state.pagination;
    },
    removeAds: state => {
      state.ads = [];
      state.pagination = initialState.pagination;
    },
    appendAds: (state, {payload}) => {
      state.ads = [...state.ads, ...payload.ads];
      state.pagination = payload.pagination || state.pagination;
    },
  },
});

export const {setAds, removeAds,appendAds} = AdsSlice.actions;
const AdsReducer = AdsSlice.reducer;
export default AdsReducer;
