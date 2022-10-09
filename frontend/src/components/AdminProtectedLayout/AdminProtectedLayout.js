import { Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  getAdminAuthorityToken,
  getToken,
} from '../../services/sessionStorage';
const AdminProtectedLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login', { replace: true });
    }
    const adminAuthorityToken = getAdminAuthorityToken();
    if (!adminAuthorityToken) {
      if (token) {
        navigate('/error');
      } else {
        navigate('/admin/error');
      }
    }
  }, []);

  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
export default AdminProtectedLayout;
