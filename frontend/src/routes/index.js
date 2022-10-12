import { Route, Routes } from 'react-router-dom';
import AdminProtectedLayout from '../components/AdminProtectedLayout/AdminProtectedLayout';
import MainLayout from '../components/MainLayout/MainLayout';
import ProtectedLayout from '../components/ProtectedLayout/ProtectedLayout';
import AccountPage from '../pages/AccountPage/AccountPage';
import AdminMainPage from '../pages/AccountPage/AdminMainPage/AdminMainPage';
import AppointmentsPage from '../pages/AccountPage/AppointmentsPage/AppointmentsPage';
import ChangePasswordPage from '../pages/AccountPage/ChangePasswordPage/ChangePasswordPage';
import GymOwnerAppointmentManagementPage from '../pages/AccountPage/GymOwnerAppointmentManagementPage/GymOwnerAppointmentManagementPage';
import GymOwnerMainPage from '../pages/AccountPage/GymOwnerMainPage/GymOwneMainPage';
import OwnerGymsPage from '../pages/AccountPage/OwnerGymsPage/OwnerGymsPage';
import ProfilePage from '../pages/AccountPage/ProfilePage/ProfilePage';
import ActivatePage from '../pages/ActivatePage/ActivatePage';
import EmailSentPage from '../pages/EmailSentPage/EmailSentPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ForgetPasswordCheckPage from '../pages/ForgetPasswordPage/ForgetPasswordCheckPage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage/ForgetPasswordPage';
import GymRequestPage from '../pages/GymRequestPage/GymRequestPage';
import GymRequestsPage from '../pages/GymRequestsPage/GymRequestsPage';
import GymsPage from '../pages/GymsPage/GymsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import SingleGymPage from '../pages/SingleGymPage/SingleGymPage';
import UserEditPage from '../pages/UsersManagementPage/UserEditPage';
import UserManagementPage from '../pages/UsersManagementPage/UsersManagementPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/email_sent" element={<EmailSentPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget_password" element={<ForgetPasswordPage />} />
      <Route path="/activate/:token" element={<ActivatePage />} />
      <Route
        path="/forget_password/:hash"
        element={<ForgetPasswordCheckPage />}
      />
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route
        path="/*"
        element={<ErrorPage isAdmin={false}></ErrorPage>}
      ></Route>

      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainPage></MainPage>}></Route>
        <Route path="gyms" element={<GymsPage />} />
        <Route path="gyms/:GID" element={<SingleGymPage />} />
      </Route>

      <Route path="/admin" element={<AdminProtectedLayout />}>
        <Route path="" element={<AccountPage />}>
          <Route path="" element={<AdminMainPage />}></Route>
          <Route
            path="userManagement"
            element={<UserManagementPage></UserManagementPage>}
          ></Route>
          <Route
            path="userManagement/edit/:id"
            element={<UserEditPage />}
          ></Route>
          <Route path="gymRequests" element={<GymRequestsPage />}></Route>
          <Route
            path="gymRequests/:gym_id"
            element={<GymRequestPage></GymRequestPage>}
          ></Route>
          <Route
            path="error"
            element={<ErrorPage isAdmin={true}></ErrorPage>}
          />
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
              path=""
              element={<GymOwnerMainPage></GymOwnerMainPage>}
            ></Route>
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
export default Router;
