import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  handleRequestToCancelAppointmentByGymOwner,
  handleRequestToGetAppointmentsByUser,
  handleRequestToGetGymAppointmentsByGymOwner,
  handleRequestToUpdateAppointmentStatusByUser,
  handleRequestToCreateAppointment
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
export const handleActionToGetUserAppointments = createAsyncThunk(
  'GET_APPOINTMENTS_BY_USER',
  async (params, thunkAPI) => {
    try {
      return await handleRequestToGetAppointmentsByUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToCancelAppointmentByGymOwner = createAsyncThunk(
  'CANCEL_GYM_APPOINTMENT_BY_GYM_OWNER',
  async (parames, thunkAPI) => {
    try {
      return await handleRequestToCancelAppointmentByGymOwner(
        parames.cancelledId,
        parames.comment
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToUpdateAppointmentStatusByUser = createAsyncThunk(
  'UPDATE_APPOINTMENT_STATUS_BY_USER',
  async (parames, thunkAPI) => {
    try {
      return await handleRequestToUpdateAppointmentStatusByUser(
        parames.id,
        parames.status
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToCreateAppointment = createAsyncThunk(
  "CREATE_APPOINTMENT",
  async (params, thunkAPI) => {
    try {
      return await handleRequestToCreateAppointment(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
