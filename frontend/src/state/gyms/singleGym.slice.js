import { createSlice } from '@reduxjs/toolkit';
import {
} from './gyms.action';
import {handleActionToGetSingleGym} from "./singleGym.action";

const singleGymSlice = createSlice({
    name: 'gym',
    initialState: {
        singleGym: {
            gym: null,
            isError: false,
            isLoading: false,
            isSuccess: false,
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(handleActionToGetSingleGym.pending, (state, action) => ({
                ...state,
                singleGym: {
                    ...state.singleGym,
                    isLoading: true,
                    isError: false,
                    isSuccess: false,
                },
            }))
            .addCase(handleActionToGetSingleGym.fulfilled, (state, action) => ({
                ...state,
                singleGym: {
                    ...state.singleGym,
                    isLoading: false,
                    isError: false,
                    isSuccess: true,
                    gym: action.payload,
                },
            }))
            .addCase(handleActionToGetSingleGym.rejected, (state, action) => ({
                ...state,
                singleGym: {
                    ...state.singleGym,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,

                },
            }));
    },
});
export default singleGymSlice.reducer
