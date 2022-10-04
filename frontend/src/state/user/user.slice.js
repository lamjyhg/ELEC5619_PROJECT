import {createSlice} from "@reduxjs/toolkit";
import {handleActionToGetAllUsers, handleActionToGetUser} from "./user.action";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userList: {
            users: null,
            isError: false,
            isLoading: false,
            isSuccess: false,
        },
        user: {
            users: null,
            isError: false,
            isLoading: false,
            isSuccess: false,
        }
    },


    extraReducers: (builder) => {
        builder
            .addCase(handleActionToGetAllUsers.pending, (state, action) => ({
                ...state,
                userList: {
                    ...state.userList,
                    isLoading: true,
                    isError: false,
                    isSuccess: false,
                },
            }))
            .addCase(handleActionToGetAllUsers.fulfilled, (state, action) => ({
                ...state,
                userList: {
                    ...state.userList,
                    isLoading: false,
                    isError: false,
                    isSuccess: true,
                    users: action.payload,
                },
            }))
            .addCase(handleActionToGetAllUsers.rejected, (state, action) => ({
                ...state,
                userList: {
                    ...state.userList,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,

                },
            }))
            .addCase(handleActionToGetUser.pending, (state, action) => ({
                ...state,
                user: {
                    ...state.user,
                    isLoading: true,
                    isError: false,
                    isSuccess: false,
                    users: action.payload,
                },
            }))
            .addCase(handleActionToGetUser.fulfilled, (state, action) => ({
                ...state,
                user: {
                    ...state.user,
                    isLoading: false,
                    isError: false,
                    isSuccess: true,
                    users: action.payload,
                },
            }))
            .addCase(handleActionToGetUser.rejected, (state, action) => ({
                ...state,
                user: {
                    ...state.user,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                },
            }));
    },
});
export default userSlice.reducer