import { configureStore } from '@reduxjs/toolkit';
import appointmentsSlice from './appointments/appointments.slice';
import gymsSlice from './gyms/gyms.slice';

export const store = configureStore({
  reducer: {
    gyms: gymsSlice,
    appointments: appointmentsSlice,
  },
});
export default store;
