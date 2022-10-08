import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  handleRequestToGetGyms,
  handleRequestToGetNearbyGyms,
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
