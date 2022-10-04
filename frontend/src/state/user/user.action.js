import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {handleRequestToGetAllUsers, handleRequestToDeleteUser} from "../../services/admin";


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

export const handleActionToDeleteUser = createAsyncThunk(
    'DELETE_USERS',
    async (params, thunkAPI) => {
        try {
            return await handleRequestToDeleteUser(params);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);