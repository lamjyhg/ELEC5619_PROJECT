import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  removeAdminAuthorityToken,
  removeToken,
} from '../../services/sessionStorage';

const LogoutPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    removeToken();
    removeAdminAuthorityToken();
    navigate('/login');
  }, []);
};
export default LogoutPage;
