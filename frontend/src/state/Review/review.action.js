import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleRequestToGetReview,
  handleRequestToSubmitReview,
} from "../../services/gyms";

export const handleActionToGetReviews = createAsyncThunk(
  "GET_REVIEWS",
  async (params, thunkAPI) => {
    try {
      console.log(params);
      return await handleRequestToGetReview(params.GID);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleActionToSubmitReview = createAsyncThunk(
  "CREATE_REVIEW",
  async (params, thunkAPI) => {
    try {
      return await handleRequestToSubmitReview(
        params.star,
        params.comment,
        params.GID,
        params.UID
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
