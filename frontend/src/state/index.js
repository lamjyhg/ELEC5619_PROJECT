import { configureStore } from "@reduxjs/toolkit";
import appointmentsSlice from "./appointments/appointments.slice";
import loginSlice from "./auth/login.slice";
import registerSlice from "./auth/register.slice";
import currentUserSlice from "./currentUser/currentUser.slice";
import forgetPasswordSlice from "./forgetPassword/forgetPassword.slice";
import forgetPasswordResetSlice from "./forgetPassword/forgetPasswordReset.slice";
import gymsSlice from "./gyms/gyms.slice";
import singleGymSlice from "./gyms/singleGym.slice";
import changePasswordPagesSlice from "./resetPassword/resetPassword.slice";
import reviewSlice from "./Review/review.slice";
import userSlice from "./user/user.slice";

export const store = configureStore({
  reducer: {
    gyms: gymsSlice,
    register: registerSlice,
    login: loginSlice,
    appointments: appointmentsSlice,
    singleGym: singleGymSlice,
    user: userSlice,
    reviews: reviewSlice,
    currentUser: currentUserSlice,
    forgetPassword: forgetPasswordSlice,
    forgetPasswordReset: forgetPasswordResetSlice,
    changePassword: changePasswordPagesSlice,
  },
});
export default store;
