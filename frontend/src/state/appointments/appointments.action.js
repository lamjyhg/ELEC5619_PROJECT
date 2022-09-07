import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleRequestToGetGyms } from '../../services/gyms';

export const handleActionToGetGymsAppointments = createAsyncThunk(
  '',
  async (params, thunkAPI) => {
    'GET_GYMS_APPOINTMENTS';
    try {
      //return await handleRequestToGetGyms(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);