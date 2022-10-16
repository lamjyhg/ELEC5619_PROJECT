import { getToken } from '../../services/sessionStorage';

import LoginBody from '../../components/LoginBody/LoginBody';

const LoginPage = () => {
  const token = getToken();

  return (
    <>
      <LoginBody />
    </>
  );
};
export default LoginPage;
