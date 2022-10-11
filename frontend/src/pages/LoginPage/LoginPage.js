import { getToken } from "../../services/sessionStorage";
import "./Login.scss";
import LoginBody from "../../components/LoginBody/LoginBody";

const LoginPage = () => {
  const token = getToken();
  console.log("token in login page is" + token);
  return (
    <>
      <LoginBody />
    </>
  );
};
export default LoginPage;
