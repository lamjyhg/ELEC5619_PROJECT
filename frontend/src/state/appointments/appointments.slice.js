import { createSlice } from '@reduxjs/toolkit';
import { handleActionToGetGyms } from './gyms.action';

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    gymsAppointmentPage: {
      appointmentsList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
    },
  },
  extraReducers: (builder) => {
    builder
      //get gyms
      .addCase(handleActionToGetGyms.pending, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToGetGyms.fulfilled, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: false,
          isError: false,
          isSuccess: true,
          gymsList: action.payload.data,
        },
      }))
      .addCase(handleActionToGetGyms.rejected, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
        },
      }));
    //
  },
});
export default gymsSlice.reducer;
