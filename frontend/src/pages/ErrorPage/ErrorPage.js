import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './ErrorPage.scss';
import Lottie from 'lottie-react';
import error from './../../image/lotties/errorPage.json';
import { Button } from 'antd';

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };
  useEffect(() => {
    if (location.pathname !== '/error') {
      navigate('/error');
    }
  }, []);

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
