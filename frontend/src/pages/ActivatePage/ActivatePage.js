import { Button, notification } from "antd";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { handleActionToActivateAccount } from "../../state/user/user.action";
import error from "./../../image/lotties/error.json";
import loading from "./../../image/lotties/loading.json";
import "./ActivatePage.scss";

const ActivatePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isLoading, isSuccess } = useSelector((state) => {
    return state.user.activatePage;
  });

  const navigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const activateAccount = async () => {
      await dispatch(handleActionToActivateAccount(token));
    };
    activateAccount();
  }, [token]);

  if (isSuccess) {
    notification.destroy();
    notification["success"]({
      message: "Success",
      description: "Activate Successfully ",
    });
    navigate("/login");
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
