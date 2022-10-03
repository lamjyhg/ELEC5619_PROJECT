import { configureStore } from '@reduxjs/toolkit';
import appointmentsSlice from './appointments/appointments.slice';
import gymsSlice from './gyms/gyms.slice';
import registerSlice from "./auth/register.slice";
import loginSlice from "./auth/login.slice";
import singleGymSlice from "./gyms/singleGym.slice";
import userSlice from "./user/user.slice";

export const store = configureStore({
  reducer: {
    gyms: gymsSlice,
    register: registerSlice,
    login: loginSlice,
    appointments: appointmentsSlice,
    singleGym: singleGymSlice,
    user: userSlice,
  },
});
export default store;
