import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleRequestToCheckAdminAuthority } from '../../services/admin';
import { loginService } from '../../services/auth';

export const handleLoginRequest = createAsyncThunk(
  'LOGIN_USER',
  async (params, thunkAPI) => {
    try {
      const res = await loginService(params);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToCheckAdminAuthority = createAsyncThunk(
  'CHECK_ADMIN_AUTHORITY',
  async (params, thunkAPI) => {
    try {
      return await handleRequestToCheckAdminAuthority();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
