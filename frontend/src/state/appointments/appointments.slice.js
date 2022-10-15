import { createSlice } from '@reduxjs/toolkit';
import { GET, PUT } from '../../constants/requests';
import {
  cancelAppointmentInList,
  replaceAppointmentInList,
} from '../../utils/appointmentsHandlers';
import {
  handleActionToCancelAppointmentByGymOwner,
  handleActionToGetGymsAppointmentsByGymOwner,
  handleActionToGetUserAppointments,
  handleActionToCreateAppointment,
  handleActionToUpdateAppointmentStatusByUser,
} from './appointments.action';
const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    gymOwner: {
      appointmentList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
      requestType: GET,
    },
    userAppointments: {
      appointmentList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
      requestType: GET,
    },
    singleGym: {
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
            requestType: GET,
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
            requestType: GET,
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
            requestType: GET,
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
            isError: false,
            isSuccess: false,
            requestType: PUT,
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
            isError: false,
            isSuccess: true,
            requestType: PUT,
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
            requestType: PUT,
            isLoading: false,
            isError: true,
            isSuccess: false,
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
          requestType: GET,
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
            requestType: GET,
          },
        })
      )
      .addCase(handleActionToGetUserAppointments.rejected, (state, action) => ({
        ...state,
        userAppointments: {
          ...state.userAppointments,
          isLoading: false,
          isError: true,
          isSuccess: false,
          requestType: GET,
        },
      }))
      .addCase(
        handleActionToUpdateAppointmentStatusByUser.pending,
        (state, action) => ({
          ...state,
          userAppointments: {
            ...state.userAppointments,
            isLoading: true,
            isError: false,
            isSuccess: false,
            requestType: PUT,
          },
        })
      )
      .addCase(
        handleActionToUpdateAppointmentStatusByUser.fulfilled,
        (state, action) => ({
          ...state,
          userAppointments: {
            ...state.userAppointments,
            isLoading: false,
            isError: false,
            isSuccess: true,
            requestType: PUT,
            appointmentList: replaceAppointmentInList(
              action.payload,
              state.userAppointments.appointmentList
            ),
          },
        })
      )
      .addCase(
        handleActionToUpdateAppointmentStatusByUser.rejected,
        (state, action) => ({
          ...state,
          userAppointments: {
            ...state.userAppointments,
            isLoading: false,
            isError: true,
            isSuccess: false,
            requestType: PUT,
          },
        })
      )
      .addCase(handleActionToCreateAppointment.pending, (state, action) => ({
        ...state,
        singleGym: {
          ...state.singleGym,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToCreateAppointment.fulfilled, (state, action) => ({
        ...state,
        singleGym: {
          ...state.singleGym,
          isLoading: false,
          isError: false,
          isSuccess: true,
        },
      }))
      .addCase(handleActionToCreateAppointment.rejected, (state, action) => ({
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
export default appointmentsSlice.reducer;
