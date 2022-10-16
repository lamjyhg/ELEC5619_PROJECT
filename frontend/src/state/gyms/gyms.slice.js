import { createSlice } from '@reduxjs/toolkit';
import { GET, POST, PUT } from '../../constants/requests';
import { replaceGymList } from '../../utils/gymHandlers';
import {
  handleActionToCreateGym,
  handleActionToGetAllGymApplication,
  handleActionToGetGyms,
  handleActionToGetGymsBySearchWord,
  handleActionToGetGymTimeAvailability,
  handleActionToGetNearbyGyms,
  handleActionToGetOwnerGyms,
  handleActionToUpdateGym,
  handleActionToApproveApplication,
  handleActionToDisapproveApplication,
} from './gyms.action';

const gymsSlice = createSlice({
  name: 'gyms',
  initialState: {
    gymsPage: {
      gymsList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
    },
    ownerGymsPage: {
      gymsList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
      requestType: GET,
    },
    gymApp: {
      gymsList: [],
      isError: false,
      isLoading: false,
      isSuccess: false,
    },
    singleGym: {
      availability: 0,
      isError: false,
      isLoading: false,
      isSuccess: false,
    },
    approveStatus: {
      status: false,
      isError: false,
      isLoading: false,
      isSuccess: false,
    }
  },

  extraReducers: (builder) => {
    builder
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
          gymsList: action.payload,
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
      }))
      .addCase(handleActionToGetNearbyGyms.pending, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToGetNearbyGyms.fulfilled, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: false,
          isError: false,
          isSuccess: true,
          gymsList: action.payload,
        },
      }))
      .addCase(handleActionToGetNearbyGyms.rejected, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
        },
      }))
      .addCase(handleActionToGetAllGymApplication.pending, (state, action) => ({
        ...state,
        gymApp: {
          ...state.gymApp,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(
        handleActionToGetAllGymApplication.fulfilled,
        (state, action) => ({
          ...state,
          gymApp: {
            ...state.gymApp,
            isLoading: false,
            isError: false,
            isSuccess: true,
            gymsList: action.payload,
          },
        })
      )
      .addCase(
        handleActionToGetAllGymApplication.rejected,
        (state, action) => ({
          ...state,
          gymApp: {
            ...state.gymApp,
            isLoading: false,
            isError: true,
            isSuccess: false,
          },
        })
      )
      .addCase(handleActionToGetOwnerGyms.pending, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
          requestType: GET,
        },
      }))
      .addCase(handleActionToGetOwnerGyms.fulfilled, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: false,
          isError: false,
          isSuccess: true,
          requestType: GET,
          gymsList: action.payload,
        },
      }))
      .addCase(handleActionToGetOwnerGyms.rejected, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
          requestType: GET,
        },
      }))
      .addCase(handleActionToUpdateGym.pending, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
          requestType: GET,
        },
      }))
      .addCase(handleActionToUpdateGym.fulfilled, (state, action) => {
        return {
          ...state,
          ownerGymsPage: {
            ...state.ownerGymsPage,
            requestType: PUT,
            isLoading: false,
            isError: false,
            isSuccess: true,
            gymsList: replaceGymList(
              action.payload,
              state.ownerGymsPage.gymsList
            ),
          },
        };
      })
      .addCase(handleActionToUpdateGym.rejected, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
          requestType: PUT,
        },
      }))
      .addCase(handleActionToCreateGym.pending, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
          requestType: POST,
        },
      }))
      .addCase(handleActionToCreateGym.fulfilled, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: false,
          isError: false,
          isSuccess: true,
          gymsList: [...state.ownerGymsPage.gymsList, action.payload],
          requestType: POST,
        },
      }))
      .addCase(handleActionToCreateGym.rejected, (state, action) => ({
        ...state,
        ownerGymsPage: {
          ...state.ownerGymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
          requestType: POST,
        },
      }))
      .addCase(handleActionToGetGymsBySearchWord.pending, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: true,
          isError: false,
          isSuccess: false,
        },
      }))
      .addCase(
        handleActionToGetGymsBySearchWord.fulfilled,
        (state, action) => ({
          ...state,
          gymsPage: {
            ...state.gymsPage,
            isLoading: false,
            isError: false,
            isSuccess: true,
            gymsList: action.payload,
          },
        })
      )
      .addCase(handleActionToGetGymsBySearchWord.rejected, (state, action) => ({
        ...state,
        gymsPage: {
          ...state.gymsPage,
          isLoading: false,
          isError: true,
          isSuccess: false,
        },
      }))
      .addCase(
        handleActionToGetGymTimeAvailability.pending,
        (state, action) => ({
          ...state,
          singleGym: {
            ...state.singleGym,
            availability: 0,
            isLoading: true,
            isError: false,
            isSuccess: false,
          },
        })
      )
      .addCase(
        handleActionToGetGymTimeAvailability.fulfilled,
        (state, action) => {
          console.log(action, 1111);
          return {
            ...state,
            singleGym: {
              ...state.singleGym,
              availability: action.payload.body.availability,
              isLoading: false,
              isError: false,
              isSuccess: true,
            },
          };
        }
      )
      .addCase(
        handleActionToGetGymTimeAvailability.rejected,
        (state, action) => ({
          ...state,
          singleGym: {
            ...state.singleGym,
            availability: 0,
            isLoading: false,
            isError: true,
            isSuccess: false,
          },
        })
      )
      .addCase(
          handleActionToDisapproveApplication.pending,
          (state, action) => ({
            ...state,
            approveStatus: {
              ...state.approveStatus,
              status: false,
              isLoading: true,
              isError: false,
              isSuccess: false,
            },
          })
      )
      .addCase(
          handleActionToDisapproveApplication.fulfilled,
          (state, action) => {
            console.log(action, 1111);
            return {
              ...state,
              approveStatus: {
                ...state.approveStatus,
                status: action.payload,
                isLoading: false,
                isError: false,
                isSuccess: true,
              },
            };
          }
      )
      .addCase(
          handleActionToDisapproveApplication.rejected,
          (state, action) => ({
            ...state,
            approveStatus: {
              ...state.approveStatus,
              status: false,
              isLoading: false,
              isError: true,
              isSuccess: false,
            },
          })
        )
        .addCase(
            handleActionToApproveApplication.pending,
            (state, action) => ({
              ...state,
              approveStatus: {
                ...state.approveStatus,
                status: false,
                isLoading: true,
                isError: false,
                isSuccess: false,
              },
            })
        )
        .addCase(
            handleActionToApproveApplication.fulfilled,
            (state, action) => {
              console.log(action, 1111);
              return {
                ...state,
                approveStatus: {
                  ...state.approveStatus,
                  status: action.payload,
                  isLoading: false,
                  isError: false,
                  isSuccess: true,
                },
              };
            }
        )
        .addCase(
            handleActionToApproveApplication.rejected,
            (state, action) => ({
              ...state,
              singleGym: {
                ...state.singleGym,
                availability: 0,
                isLoading: false,
                isError: true,
                isSuccess: false,
              },
            })
        );
    //
  },
});
export default gymsSlice.reducer;
