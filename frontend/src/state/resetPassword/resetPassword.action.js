import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleRequestToChangePassword } from "../../services/resetPassword";

export const handleActionToChangePassword = createAsyncThunk(
  "RESET_PASSWORD",
  async (params, thunkAPI) => {
    try {
      return await handleRequestToChangePassword(
        params.newPassword,
        params.password
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
