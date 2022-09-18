import { configureStore } from '@reduxjs/toolkit';
import appointmentsSlice from './appointments/appointments.slice';
import gymsSlice from './gyms/gyms.slice';
import registerSlice from "./auth/register.slice";
import loginSlice from "./auth/login.slice";

export const store = configureStore({
  reducer: {
    gyms: gymsSlice,
    register: registerSlice,
    login: loginSlice,
    appointments: appointmentsSlice,
  },
});
export default store;
