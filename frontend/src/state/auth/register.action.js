import { createAsyncThunk } from '@reduxjs/toolkit';
import {registerService} from "../../services/auth";

export const handleRegisterRequest = createAsyncThunk(
    "CREATE_USER",
    async(params, thunkAPI) => {

        try {
            const res = await registerService(params);
            return res
        }catch (error){
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)