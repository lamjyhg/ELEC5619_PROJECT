import {handleRequestToPostForgetPasswordCheck, handleRequestToResetPassword} from "../../services/forgetPassword";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const handleActionToCheckHash = createAsyncThunk(
    'CHECK_HASH',
    async (params, thunkAPI) => {
        try {
            return await handleRequestToPostForgetPasswordCheck(params.hash);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const handleActionToSendHash = createAsyncThunk(
    'SEND_HASH',
    async (params, thunkAPI) => {
        try {
            return await handleRequestToPostForgetPasswordCheck(params.hash);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

