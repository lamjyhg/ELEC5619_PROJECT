import { createSlice } from '@reduxjs/toolkit';
import {
    handleActionToGetCurrentUser
} from './currentUser.action';


const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        currentUserPage: {
            currentUser: null,
            isError: false,
            isLoading: false,
            isSuccess: false,
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(handleActionToGetCurrentUser.pending, (state, action) => ({
                ...state,
                currentUserPage: {
                    ...state.currentUserPage,
                    isLoading: true,
                    isError: false,
                    isSuccess: false,
                },
            }))
            .addCase(handleActionToGetCurrentUser.fulfilled, (state, action) => ({
                ...state,
                currentUserPage: {
                    ...state.currentUserPage,
                    isLoading: false,
                    isError: false,
                    isSuccess: true,
                    currentUser: action.payload,
                },
            }))
            .addCase(handleActionToGetCurrentUser.rejected, (state, action) => ({
                ...state,
                currentUserPage: {
                    ...state.currentUserPage,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                },
            }));
    },
});


export default currentUserSlice.reducer