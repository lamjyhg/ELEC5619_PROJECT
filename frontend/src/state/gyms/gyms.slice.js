import { createSlice } from '@reduxjs/toolkit';
import {
  handleActionToGetGyms,
  handleActionToGetNearbyGyms,
  handleActionToGetAllGymApplication,
  handleActionToGetGymsBySearchWord,
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
    gymApp: {
      gymsList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
    }
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
      }))
      .addCase(handleActionToGetAllGymApplication.pending, (state, action) => ({
        ...state,
        gymApp: {
          ...state.gymApp,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToGetAllGymApplication.fulfilled, (state, action) => ({
        ...state,
        gymApp: {
          ...state.gymApp,
          isLoading: false,
          isError: false,
          isSuccess: true,
          gymsList: action.payload,
        },
      }))
      .addCase(handleActionToGetAllGymApplication.rejected, (state, action) => ({
        ...state,
        gymApp: {
          ...state.gymApp,
          isLoading: false,
          isError: true,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToGetGymsBySearchWord.pending, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(
          handleActionToGetGymsBySearchWord.fulfilled,
          (state, action) => ({
            ...state,
            gymsPage: {
              ...state.gymsPage,
              isLoading: false,
              isError: false,
              isSuccess: true,
              gymsList: action.payload,
            },
          })
      )
      .addCase(handleActionToGetGymsBySearchWord.rejected, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
        },
      }))
      ;
    //
  },
});
export default gymsSlice.reducer;
