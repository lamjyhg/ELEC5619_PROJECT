import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/MainLayout/MainLayout';
import ProtectedLayout from '../components/ProtectedLayout/ProtectedLayout';
import AccountPage from '../pages/AccountPage/AccountPage';
import GymRequestsPage from '../pages/GymRequestsPage/GymRequestsPage';
import GymsPage from '../pages/GymsPage/GymsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import UserManagementPage from '../pages/UsersManagementPage/UsersManagementPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/account" element={<AccountPage />}></Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="/gyms" element={<GymsPage />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route
            path="/user-management"
            element={<UserManagementPage />}
          ></Route>
          <Route path="/gymRequests" element={<GymRequestsPage />}></Route>
          <Route path="/gymRequest/:id" element={<GymRequestsPage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};
export default Router;
