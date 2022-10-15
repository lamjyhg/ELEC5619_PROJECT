import { Button } from 'antd';
import Lottie from 'lottie-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { getAdminAuthorityToken } from '../../services/sessionStorage';
import error from './../../image/lotties/errorPage.json';
import './ErrorPage.scss';

const ErrorPage = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    const adminAuthorityToken = getAdminAuthorityToken();
    if (adminAuthorityToken) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="errorPage">
      <h1>404 NOT FOUND!</h1>
      <Lottie animationData={error} />
      <Button type="primary" shape="round" onClick={navigateToHome}>
        Home Page
      </Button>
    </div>
  );
};

export default ErrorPage;
