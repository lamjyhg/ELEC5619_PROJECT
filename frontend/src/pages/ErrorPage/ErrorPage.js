import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './ErrorPage.scss';
import Lottie from 'lottie-react';
import error from './../../image/lotties/errorPage.json';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleActionToCheckAdminAuthority } from '../../state/auth/login.action';
import { getAdminAuthorityToken } from '../../services/sessionStorage';

const ErrorPage = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };
  useEffect(() => {
    const adminAuthorityToken = getAdminAuthorityToken();
    if (adminAuthorityToken) {
      navigate('/admin/error');
    }
  }, []);

  return (
    <div className="errorPage">
      <h1>404 NOT FOUND!</h1>
      <Lottie animationData={error} />
      {!isAdmin ? (
        <Button type="primary" shape="round" onClick={navigateToHome}>
          Home Page
        </Button>
      ) : null}
    </div>
  );
};

export default ErrorPage;
