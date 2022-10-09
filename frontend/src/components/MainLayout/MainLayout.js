import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAdminAuthorityToken } from '../../services/sessionStorage';
import { handleActionToCheckAdminAuthority } from '../../state/auth/login.action';
import NavBar from '../NavBar/NavBar';

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuthorityToken = getAdminAuthorityToken();
    if (adminAuthorityToken) {
      navigate('/admin/error');
    }
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
};
export default MainLayout;
