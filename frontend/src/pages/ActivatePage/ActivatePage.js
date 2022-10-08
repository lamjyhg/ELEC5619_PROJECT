import Lottie from 'lottie-react';
import { useParams } from 'react-router-dom';
import loading from './../../image/lotties/loading.json';
import error from './../../image/lotties/error.json';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import './ActivatePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Button, notification } from 'antd';
import { handleActionToActivateAccount } from '../../state/user/user.action';

const ActivatePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isLoading, isSuccess } = useSelector((state) => {
    return state.user.activatePage;
  });

  const navigateToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const activateAccount = async () => {
      await dispatch(handleActionToActivateAccount(token));
    };
    activateAccount();
  }, [token]);

  if (isSuccess) {
    notification.destroy();
    notification['success']({
      message: 'Success',
      description: 'Activate Successfully ',
    });
    navigate('/login');
  }
  return (
    <div className="activatePage">
      {isLoading ? <Lottie animationData={loading} /> : null}
      {isError ? <Lottie animationData={error} /> : null}
      {isLoading ? <h1>Processing to activate your account</h1> : null}
      {isError ? <h1>Activate Failed</h1> : null}
      {isError ? (
        <Button type="primary" shape="round" onClick={navigateToHome}>
          Home Page
        </Button>
      ) : null}
    </div>
  );
};
export default ActivatePage;
