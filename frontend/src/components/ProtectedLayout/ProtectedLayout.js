import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getToken, clearSessionStorage } from '../../services/sessionStorage';
const ProtectedLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, []);

  return <Outlet></Outlet>;
};
export default ProtectedLayout;
