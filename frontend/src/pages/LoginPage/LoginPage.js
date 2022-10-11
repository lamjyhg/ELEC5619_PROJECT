import { getToken } from "../../services/sessionStorage";
import "./Login.scss";
import LoginBody from "../../components/LoginBody/LoginBody";

const LoginPage = () => {
  const token = getToken();
  
  return (
    <>
      <LoginBody />
    </>
  );
};
export default LoginPage;
