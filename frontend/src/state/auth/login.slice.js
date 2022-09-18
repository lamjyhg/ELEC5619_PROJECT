
import {createSlice} from "@reduxjs/toolkit";
import {handleLoginRequest} from "./login.action";

const loginSlice = createSlice({
    name:"login",
    initialState:{
        loginPage:{
            isSuccess:false,
            isLoading:false,
            isError:false,
            errors:"",
        },
    },
    extraReducers:(builder) => {
        builder.addCase(
            handleLoginRequest.pending, (state,action) => ({
                ...state,
                loginPage: {
                    ...state.loginPage,
                    isSuccess:false,
                    isLoading:true,
                    isError:false,
                }

            })
        ).addCase(
            handleLoginRequest.fulfilled, (state,action) => ({
                ...state,
                loginPage: {
                    ...state.loginPage,
                    isSuccess:true,
                    isLoading:false,
                    isError:false,
                }

            })
        ).addCase(
            handleLoginRequest.rejected, (state,action) => ({
                ...state,
                loginPage: {
                    ...state.loginPage,
                    isSuccess:false,
                    isLoading:false,
                    isError:true,
                }

            })
        )

    }

});

export default loginSlice.reducer;