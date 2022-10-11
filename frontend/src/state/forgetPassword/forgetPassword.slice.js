import { createSlice } from "@reduxjs/toolkit";
import { handleActionToCheckHash } from "./forgetPassword.action";

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState: {
    forgetPasswordPage: {
      isError: false,
      isLoading: false,
      isSuccess: false,
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(handleActionToCheckHash.pending, (state, action) => ({
        ...state,
        forgetPasswordPage: {
          ...state.forgetPasswordPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToCheckHash.fulfilled, (state, action) => ({
        ...state,
        forgetPasswordPage: {
          ...state.forgetPasswordPage,
          isLoading: false,
          isError: false,
          isSuccess: true,
        },
      }))
      .addCase(handleActionToCheckHash.rejected, (state, action) => ({
        ...state,
        forgetPasswordPage: {
          ...state.forgetPasswordPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
        },
      }));
  },
});

export default forgetPasswordSlice.reducer;
