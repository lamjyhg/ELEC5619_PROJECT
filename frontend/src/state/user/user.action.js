import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {handleRequestToGetAllUsers} from "../../services/admin";


export const handleActionToGetAllUsers = createAsyncThunk(
    'GET_ALL_USERS',
    async (params, thunkAPI) => {
        try {
            return await handleRequestToGetAllUsers();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);