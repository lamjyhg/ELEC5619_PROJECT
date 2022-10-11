import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleRequestToGetSingleGym } from "../../services/gyms";

export const handleActionToGetSingleGym = createAsyncThunk(
  "GET_SINGLE_GYM",
  async (params, thunkAPI) => {
    try {
      return await handleRequestToGetSingleGym(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
