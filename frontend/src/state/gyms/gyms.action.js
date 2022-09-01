import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleRequestToGetGyms } from '../../services/gyms';

export const handleActionToGetGyms = createAsyncThunk(
  '',
  async (params, thunkAPI) => {
    'GET_GYMS';
    try {
      return await handleRequestToGetGyms(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
