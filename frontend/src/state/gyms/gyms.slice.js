import { createSlice } from '@reduxjs/toolkit';
import {
  handleActionToGetGyms,
  handleActionToGetNearbyGyms,
} from './gyms.action';

const gymsSlice = createSlice({
  name: 'gyms',
  initialState: {
    gymsPage: {
      gymsList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(handleActionToGetGyms.pending, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToGetGyms.fulfilled, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: false,
          isError: false,
          isSuccess: true,
          gymsList: action.payload,
        },
      }))
      .addCase(handleActionToGetGyms.rejected, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToGetNearbyGyms.pending, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToGetNearbyGyms.fulfilled, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: false,
          isError: false,
          isSuccess: true,
          gymsList: action.payload,
        },
      }))
      .addCase(handleActionToGetNearbyGyms.rejected, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
        },
      }));
    //
  },
});
export default gymsSlice.reducer;
