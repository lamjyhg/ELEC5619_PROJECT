import { createSlice } from '@reduxjs/toolkit';
import { GET, POST, PUT } from '../../constants/requests';
import { replaceGymList } from '../../utils/gymHandlers';
import {
  handleActionToCreateGym,
  handleActionToGetGyms,
  handleActionToGetNearbyGyms,
  handleActionToGetOwnerGyms,
  handleActionToGetSingleGym,
  handleActionToUpdateGym,
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
    ownerGymsPage: {
      gymsList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
      requestType: GET,
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
      }))
      .addCase(handleActionToGetOwnerGyms.pending, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToGetOwnerGyms.fulfilled, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: false,
          isError: false,
          isSuccess: true,
          gymsList: action.payload,
          requestType: GET,
        },
      }))
      .addCase(handleActionToGetOwnerGyms.rejected, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
          requestType: GET,
        },
      }))
      .addCase(handleActionToUpdateGym.pending, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
          requestType: GET,
        },
      }))
      .addCase(handleActionToUpdateGym.fulfilled, (state, action) => {
        return {
          ...state,
          ownerGymsPage: {
            ...state.ownerGymsPage,
            requestType: PUT,
            isLoading: false,
            isError: false,
            isSuccess: true,
            gymsList: replaceGymList(
              action.payload,
              state.ownerGymsPage.gymsList
            ),
          },
        };
      })
      .addCase(handleActionToUpdateGym.rejected, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
          requestType: PUT,
        },
      }))
      .addCase(handleActionToCreateGym.pending, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
          requestType: POST,
        },
      }))
      .addCase(handleActionToCreateGym.fulfilled, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: false,
          isError: false,
          isSuccess: true,
          gymsList: [...state.ownerGymsPage.gymsList, action.payload],
          requestType: POST,
        },
      }))
      .addCase(handleActionToCreateGym.rejected, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
          requestType: POST,
        },
      }));
    //
  },
});
export default gymsSlice.reducer;
