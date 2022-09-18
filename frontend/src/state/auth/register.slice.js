
import {createSlice} from "@reduxjs/toolkit";
import {handleRegisterRequest} from "./register.action";

const registerSlice = createSlice({
    name:"register",
    initialState:{
        registerPage:{
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
                registerPage: {
                    ...state.registerPage,
                    isSuccess:false,
                    isLoading:true,
                    isError:false,
                }

            })
        ).addCase(
            handleRegisterRequest.fulfilled, (state,action) => ({
                ...state,
                registerPage: {
                    ...state.registerPage,
                    isSuccess:true,
                    isLoading:false,
                    isError:false,
                }

            })
        ).addCase(
            handleRegisterRequest.rejected, (state,action) => ({
                ...state,
                registerPage: {
                    ...state.registerPage,
                    isSuccess:false,
                    isLoading:false,
                    isError:true,
                }

            })
        )

    }

});

export default registerSlice.reducer;