import {createAsyncThunk} from "@reduxjs/toolkit";
import {handleRequestToResetPassword} from "../../services/forgetPassword";

export const handleActionToResetPassword = createAsyncThunk(
    "RESET_FORGET_PASSWORD",
    async (params, thunkAPI) => {
        try {
            return await handleRequestToResetPassword(params.hash, params.password);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)