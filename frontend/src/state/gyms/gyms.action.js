import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  handleRequestToCreateGym,
  handleRequestToGetGyms,
  handleRequestToGetNearbyGyms,
  handleRequestToGetOwnerGyms,
  handleRequestToUpdateGym,
} from '../../services/gyms';

export const handleActionToGetGyms = createAsyncThunk(
  'GET_GYMS',
  async (params, thunkAPI) => {
    try {
      return await handleRequestToGetGyms();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToGetNearbyGyms = createAsyncThunk(
  'GET_NEARBY_GYMS',
  async (params, thunkAPI) => {
    try {
      return await handleRequestToGetNearbyGyms(params.lat, params.lng);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToGetOwnerGyms = createAsyncThunk(
  'GET_OWNER_GYMS',
  async (params, thunkAPI) => {
    try {
      return await handleRequestToGetOwnerGyms();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToCreateGym = createAsyncThunk(
  'CREATE_GYM',
  async (params, thunkAPI) => {
    try {
      console.log(1121, params);
      return await handleRequestToCreateGym(params);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToUpdateGym = createAsyncThunk(
  'UPDATE_GYM',
  async (params, thunkAPI) => {
    try {
      return await handleRequestToUpdateGym(params.gymId, params.body);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
