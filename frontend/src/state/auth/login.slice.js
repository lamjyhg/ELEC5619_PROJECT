import { createSlice } from "@reduxjs/toolkit";
import { setAdminAuthorityToken } from "../../services/sessionStorage";
import { handleLoginRequest } from "./login.action";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginPage: {
      isSuccess: false,
      isLoading: false,
      isError: false,
      userInfo: {},
      errors: "",
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginRequest.pending, (state, action) => ({
        ...state,
        loginPage: {
          ...state.loginPage,
          isSuccess: false,
          isLoading: true,
          isError: false,
        },
      }))
      .addCase(handleLoginRequest.fulfilled, (state, action) => {
        setAdminAuthorityToken(action.payload.adminAuthorityToken);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userInfo = action.payload.user;
      })
      .addCase(handleLoginRequest.rejected, (state, action) => ({
        ...state,
        loginPage: {
          ...state.loginPage,
          isSuccess: false,
          isLoading: false,
          isError: true,
          errors: action.payload,
        },
      }));
  },
});

export default loginSlice.reducer;
