import {createAsyncThunk} from "@reduxjs/toolkit";
import {loginService} from "../../services/auth";

export const handleLoginRequest = createAsyncThunk(
    "LOGIN_USER",
    async(params, thunkAPI) => {
        try {
            const res = await loginService(params);
            return res
        }catch (error){
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
)