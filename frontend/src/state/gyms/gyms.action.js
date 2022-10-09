import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  handleRequestToGetGyms,
  handleRequestToGetNearbyGyms,
    handleRequestToGetAllApplication
} from "../../services/gyms";

export const handleActionToGetGyms = createAsyncThunk(
  "GET_GYMS",
  async (params, thunkAPI) => {
    try {
      return await handleRequestToGetGyms();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToGetNearbyGyms = createAsyncThunk(
  "GET_NEARBY_GYMS",
  async (params, thunkAPI) => {
    try {
      return await handleRequestToGetNearbyGyms(params.lat, params.lng);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToGetAllGymApplication = createAsyncThunk(
    "GET_ALL_GYM_APPLICATION",
    async (params, thunkAPI) => {
        try {
            return await handleRequestToGetAllApplication();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);