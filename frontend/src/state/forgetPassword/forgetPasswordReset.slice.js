import { createSlice } from "@reduxjs/toolkit";
import { handleActionToResetPassword } from "./forgetPasswordReset.action";

const forgetPasswordResetSlice = createSlice({
  name: "forgetPasswordReset",
  initialState: {
    forgetPasswordResetPage: {
      isErr: false,
      isLod: false,
      isSuc: false,
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(handleActionToResetPassword.pending, (state, action) => ({
        ...state,
        forgetPasswordResetPage: {
          ...state.forgetPasswordReactPage,
          isErr: false,
          isLod: true,
          isSuc: false,
        },
      }))
      .addCase(handleActionToResetPassword.fulfilled, (state, action) => ({
        ...state,
        forgetPasswordResetPage: {
          ...state.forgetPasswordReactPage,
          isErr: false,
          isLod: false,
          isSuc: true,
        },
      }))
      .addCase(handleActionToResetPassword.rejected, (state, action) => ({
        ...state,
        forgetPasswordResetPage: {
          ...state.forgetPasswordReactPage,
          isErr: true,
          isLod: false,
          isSuc: false,
        },
      }));
  },
});

export default forgetPasswordResetSlice.reducer;
