import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleRequestToGetGyms } from '../../services/gyms';

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
