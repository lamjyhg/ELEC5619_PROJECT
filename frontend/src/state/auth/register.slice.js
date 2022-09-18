
import {createSlice} from "@reduxjs/toolkit";
import {handleRegisterRequest} from "./auth.action";

const registerSlice = createSlice({
    name:"auth",
    initialState:{
        authPage:{
            isSuccess:false,
            isLoading:false,
            isError:false,
            errors:"",
        },
    },
    extraReducers:(builder) => {
        builder.addCase(
            handleRegisterRequest.pending, (state,action) => ({
                ...state,
                authPage: {
                    ...state.authPage,
                    isSuccess:false,
                    isLoading:true,
                    isError:false,
                }

            })
        ).addCase(
            handleRegisterRequest.fulfilled, (state,action) => ({
                ...state,
                authPage: {
                    ...state.authPage,
                    isSuccess:true,
                    isLoading:false,
                    isError:false,
                }

            })
        ).addCase(
            handleRegisterRequest.rejected, (state,action) => ({
                ...state,
                authPage: {
                    ...state.authPage,
                    isSuccess:false,
                    isLoading:false,
                    isError:true,
                }

            })
        )

    }

});

export default registerSlice.reducer;