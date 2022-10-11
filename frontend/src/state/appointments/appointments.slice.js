import { createSlice } from "@reduxjs/toolkit";
import { replaceAppointmentInList } from "../../utils/appointmentsHandlers";
import {
  handleActionToCancelAppointmentByGymOwner,
  handleActionToGetGymsAppointmentsByGymOwner,
  handleActionToGetUserAppointments,
} from "./appointments.action";

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    gymOwner: {
      appointmentList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
      cancel: {
        isError: false,
        isLoading: false,
        isSuccess: false,
      },
    },
    userAppointments: {
      appointmentList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(
        handleActionToGetGymsAppointmentsByGymOwner.pending,
        (state, action) => ({
          ...state,
          gymOwner: {
            ...state.gymOwner,
            isLoading: true,
            isError: false,
            isSuccess: false,
          },
        })
      )
      .addCase(
        handleActionToGetGymsAppointmentsByGymOwner.fulfilled,
        (state, action) => ({
          ...state,
          gymOwner: {
            ...state.gymOwner,
            isLoading: false,
            isError: false,
            isSuccess: true,
            appointmentList: action.payload,
          },
        })
      )
      .addCase(
        handleActionToGetGymsAppointmentsByGymOwner.rejected,
        (state, action) => ({
          ...state,
          gymOwner: {
            ...state.gymOwner,
            isLoading: false,
            isError: true,
            isSuccess: false,
          },
        })
      )
      .addCase(
        handleActionToCancelAppointmentByGymOwner.pending,
        (state, action) => ({
          ...state,
          gymOwner: {
            ...state.gymOwner,
            isLoading: true,
            cancel: {
              isLoading: true,
              isError: false,
              isSuccess: false,
            },
          },
        })
      )
      .addCase(
        handleActionToCancelAppointmentByGymOwner.fulfilled,
        (state, action) => ({
          ...state,
          gymOwner: {
            ...state.gymOwner,
            isLoading: false,
            cancel: {
              isLoading: false,
              isError: false,
              isSuccess: true,
            },
            appointmentList: replaceAppointmentInList(
              action.payload,
              state.gymOwner.appointmentList
            ),
          },
        })
      )
      .addCase(
        handleActionToCancelAppointmentByGymOwner.rejected,
        (state, action) => ({
          ...state,
          gymOwner: {
            ...state.gymOwner,
            isLoading: false,
            cancel: {
              isLoading: false,
              isError: true,
              isSuccess: false,
            },
          },
        })
      )
      .addCase(handleActionToGetUserAppointments.pending, (state, action) => ({
        ...state,
        userAppointments: {
          ...state.userAppointments,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(
        handleActionToGetUserAppointments.fulfilled,
        (state, action) => ({
          ...state,
          userAppointments: {
            ...state.userAppointments,
            isLoading: false,
            isError: false,
            isSuccess: true,
            appointmentList: action.payload,
          },
        })
      )
      .addCase(handleActionToGetUserAppointments.rejected, (state, action) => ({
        ...state,
        userAppointments: {
          ...state.userAppointments,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }));
  },
});
export default appointmentsSlice.reducer;
