import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleRequestToGetGyms } from '../../services/gyms';

export const handleActionToGetGymsAppointments = createAsyncThunk(
  'GET_GYMS_APPOINTMENTS',
  async (params, thunkAPI) => {
    try {
      console.log(params);
      return await handleRequestToGetGyms(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
