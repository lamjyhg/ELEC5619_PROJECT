import { configureStore } from '@reduxjs/toolkit';
import gymsSlice from './gyms/gyms.slice';

export const store = configureStore({
  reducer: {
    gyms: gymsSlice,
  },
});
export default store;
