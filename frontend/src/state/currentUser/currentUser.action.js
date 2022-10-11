import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleRequestToGetCurrentUser } from "../../services/admin";

export const handleActionToGetCurrentUser = createAsyncThunk(
  "GET_CURRENT_USER",
  async (params, thunkAPI) => {
    try {
      return await handleRequestToGetCurrentUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
