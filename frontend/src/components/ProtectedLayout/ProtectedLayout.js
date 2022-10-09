import { Layout, Spin } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  getToken,
  clearSessionStorage,
  getAdminAuthorityToken,
} from '../../services/sessionStorage';
import { handleActionToCheckAdminAuthority } from '../../state/auth/login.action';
const ProtectedLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login', { replace: true });
    }
    const adminAuthorityToken = getAdminAuthorityToken();
    if (adminAuthorityToken) {
      navigate('/admin/error');
    }
  }, []);

  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
export default ProtectedLayout;
