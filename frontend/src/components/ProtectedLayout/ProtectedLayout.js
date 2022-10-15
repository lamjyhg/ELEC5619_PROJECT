import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  getAdminAuthorityToken,
  getToken,
} from '../../services/sessionStorage';
const ProtectedLayout = () => {
  const navigate = useNavigate();
  console.log(1112);

  useEffect(() => {
    const token = getToken();
    console.log(1112);
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      console.log(1111);
      const adminAuthorityToken = getAdminAuthorityToken();
      if (adminAuthorityToken) {
        navigate('/error');
      }
    }
  }, []);

  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
export default ProtectedLayout;
