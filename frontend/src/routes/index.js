import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/MainLayout/MainLayout';
import ProtectedLayout from '../components/ProtectedLayout/ProtectedLayout';
import AccountPage from '../pages/AccountPage/AccountPage';
import GymOwnerAppointmentManagementPage from '../pages/AccountPage/GymOwnerAppointmentManagementPage/GymOwnerAppointmentManagementPage';
import GymRequestsPage from '../pages/GymRequestsPage/GymRequestsPage';
import GymRequestPage from '../pages/GymRequestPage/GymRequestPage';
import GymsPage from '../pages/GymsPage/GymsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import UserManagementPage from '../pages/UsersManagementPage/UsersManagementPage';
import ProfilePage from '../pages/AccountPage/ProfilePage/ProfilePage';
import ChangePasswordPage from '../pages/AccountPage/ChangePasswordPage/ChangePasswordPage';
import AppointmentsPage from '../pages/AccountPage/AppointmentsPage/AppointmentsPage';
import OwnerGymsPage from '../pages/AccountPage/OwnerGymsPage/OwnerGymsPage';
import SingleGymPage from "../pages/SingleGymPage/SingleGymPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />}></Route>

      <Route path="/" element={<MainLayout />}>
        <Route path="gyms" element={<GymsPage />} />
        <Route path="/gyms/:gym_id" element={<SingleGymPage />} />
      </Route>
      <Route path="/admin" element={<ProtectedLayout />}>
        <Route path="" element={<AccountPage />}>
          <Route
            path="userManagement"
            element={<UserManagementPage></UserManagementPage>}
          ></Route>
          <Route path="gymRequests">
            <Route path="" element={<GymRequestsPage />}></Route>
            <Route
              path=":id"
              element={<GymRequestPage></GymRequestPage>}
            ></Route>
          </Route>
        </Route>
      </Route>
      <Route path="/account" element={<ProtectedLayout />}>
        <Route path="" element={<AccountPage />}>
          {/* Normal Users */}
          <Route path="profile" element={<ProfilePage />}></Route>
          <Route
            path="change-password"
            element={<ChangePasswordPage />}
          ></Route>
          <Route path="appointments" element={<AppointmentsPage />}></Route>
          <Route path="gymOwner">
            <Route
              path="gyms"
              element={<OwnerGymsPage></OwnerGymsPage>}
            ></Route>
            <Route
              path="gymsAppointments"
              element={
                <GymOwnerAppointmentManagementPage></GymOwnerAppointmentManagementPage>
              }
            ></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
/**
 * <Route path="gymRequest/:id" element={<GymRequestsPage />}></Route>
<Route
path="/gymOwnerAppointmentManagment"
element={
  <GymOwnerAppointmentManagementPage></GymOwnerAppointmentManagementPage>
}
/> */
export default Router;
