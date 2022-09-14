import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  handleRequestToCreateAppointment,
  handleRequestToGetGymAppointments,
} from '../../services/appointments';

export const handleActionToGetGymsAppointments = createAsyncThunk(
  'GET_GYM_APPOINTMENTS',
  async (params, thunkAPI) => {
    try {
      console.log(params);
      return await handleRequestToGetGymAppointments(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleCancelAppointment  = createAsyncThunk(
  'CANCEL_GYM_APPOINTMENT',
  async (params, thunkAPI) => {
    try {
      console.log(params);
      return await handleRequestToGetGymAppointments(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToCreateAppointment = createAsyncThunk(
  'CREATE_APPOINTMENT',
  async (params, thunkAPI) => {
    try {
      console.log(params);
      return await handleRequestToCreateAppointment(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
