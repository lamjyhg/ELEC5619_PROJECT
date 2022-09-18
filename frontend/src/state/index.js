import { configureStore } from '@reduxjs/toolkit';
import gymsSlice from './gyms/gyms.slice';
import registerSlice from "./auth/register.slice";
import loginSlice from "./auth/login.slice";

export const store = configureStore({
  reducer: {
    gyms: gymsSlice,
    register: registerSlice,
    login: loginSlice,
  },
});
export default store;
