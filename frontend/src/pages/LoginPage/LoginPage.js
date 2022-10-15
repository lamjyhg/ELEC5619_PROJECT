import { getToken } from '../../services/sessionStorage';

import LoginBody from '../../components/LoginBody/LoginBody';

const LoginPage = () => {
  const token = getToken();
  console.log(token);

  return (
    <>
      <LoginBody />
    </>
  );
};
export default LoginPage;
