import { configureStore } from '@reduxjs/toolkit';
import appointmentsSlice from './appointments/appointments.slice';
import gymsSlice from './gyms/gyms.slice';
import registerSlice from "./auth/register.slice";
import loginSlice from "./auth/login.slice";

export const store = configureStore({
  reducer: {
    gyms: gymsSlice,
<<<<<<< HEAD
    register: registerSlice,
    login: loginSlice,
=======
    appointments: appointmentsSlice,
>>>>>>> cc7bb44da852512596f08f875302979552f2d9fa
  },
});
export default store;
