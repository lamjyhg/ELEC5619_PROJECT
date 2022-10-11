import {createSlice} from "@reduxjs/toolkit";
import {handleActionToChangePassword} from "./resetPassword.action";


const changePasswordSlice = createSlice({
    name: 'changePassword',
    initialState: {
        changePasswordPage: {
            isError: false,
            isLoading: false,
            isSuccess: false,
            errors: ""
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(handleActionToChangePassword.pending, (state, action) => ({
                ...state,
                changePasswordPage: {
                    ...state.changePasswordPage,
                    isError: false,
                    isLoading: true,
                    isSuccess: false,
                },
            }))
            .addCase(handleActionToChangePassword.fulfilled, (state, action) => ({
                ...state,
                changePasswordPage: {
                    ...state.changePasswordPage,
                    isError: false,
                    isLoading: false,
                    isSuccess: true,
                },
            }))
            .addCase(handleActionToChangePassword.rejected, (state, action) => ({
                ...state,
                changePasswordPage: {
                    ...state.changePasswordPage,
                    isError: true,
                    isLoading: false,
                    isSuccess: false,
                    errors: action.payload
                },
            }));
    },
});

export default changePasswordSlice.reducer