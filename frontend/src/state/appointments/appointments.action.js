import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  handleRequestToCreateAppointment,
  handleRequestToCancelAppointmentByGymOwner,
  handleRequestToGetGymAppointmentsByGymOwner,
} from '../../services/appointments';

export const handleActionToGetGymsAppointmentsByGymOwner = createAsyncThunk(
  'GET_GYM_APPOINTMENTS_BY_GYM_OWNER',
  async (params, thunkAPI) => {
    try {
      return await handleRequestToGetGymAppointmentsByGymOwner();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToCancelAppointmentByGymOwner = createAsyncThunk(
  'CANCEL_GYM_APPOINTMENT_BY_GYM_OWNER',
  async (params, thunkAPI) => {
    try {
      return await handleRequestToCancelAppointmentByGymOwner(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToCreateAppointment = createAsyncThunk(
  'CREATE_APPOINTMENT',
  async (params, thunkAPI) => {
    try {
      return await handleRequestToCreateAppointment(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
