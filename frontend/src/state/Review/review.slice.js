import {createSlice} from "@reduxjs/toolkit";
import {handleActionToGetReviews, handleActionToSubmitReview} from "./review.action";


const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviewPage: {
            reviewList: [],
            isErr: false,
            isLod: false,
            isSuc: false,
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleActionToSubmitReview.pending, (state, action) => ({
                ...state,
                reviewPage: {
                    ...state.reviewPage,
                    isLod: true,
                    isErr: false,
                    isSuc: false,
                },
            }))
            .addCase(handleActionToSubmitReview.fulfilled, (state, action) => ({
                ...state,
                reviewPage: {
                    ...state.reviewPage,
                    isLod: false,
                    isErr: false,
                    isSuc: true,
                },
            }))
            .addCase(handleActionToSubmitReview.rejected, (state, action) => ({
                ...state,
                reviewPage: {
                    ...state.reviewPage,
                    isLod: false,
                    isErr: true,
                    isSuc: false,
                },
            }))
            .addCase(handleActionToGetReviews.pending, (state, action) =>{

                return ({
                    ...state,
                    reviewPage: {
                        ...state.reviewPage,
                        isLod: true,
                        isErr: false,
                        isSuc: false,
                    },
                })
            })
            .addCase(handleActionToGetReviews.fulfilled, (state, action) => {



                return ({
                ...state,
                reviewPage: {
                    ...state.reviewPage,
                    isLod: false,
                    isErr: false,
                    isSuc: true,
                    reviewList: action.payload,
                },
            })})
            .addCase(handleActionToGetReviews.rejected, (state, action) => ({
                ...state,
                reviewPage: {
                    ...state.reviewPage,
                    isLod: false,
                    isErr: true,
                    isSuc: false,
                },
            }));
    },
});

export default reviewSlice.reducer;