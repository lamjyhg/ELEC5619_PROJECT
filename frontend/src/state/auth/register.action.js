import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {loginService, registerService} from "../../services/auth";

export const handleLoginRequest = createAsyncThunk(
    "LOGIN_USER",
    async(params, thunkAPI) => {
        try {
            console.log(params);
            return await loginService(params);
        }catch (error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

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