import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAdminAuthorityToken } from '../../services/sessionStorage';
import NavBar from '../NavBar/NavBar';

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuthorityToken = getAdminAuthorityToken();
    if (adminAuthorityToken) {
      navigate('/error');
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
