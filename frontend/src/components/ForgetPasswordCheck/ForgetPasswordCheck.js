import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FrownTwoTone,
} from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import gymmy from "../../image/gymmy.png";
import error from "../../image/lotties/errorPage.json";
import { handleActionToCheckHash } from "../../state/forgetPassword/forgetPassword.action";
import { handleActionToResetPassword } from "../../state/forgetPassword/forgetPasswordReset.action";
import "./ForgetPasswordCheck.scss";

export const ForgetPasswordCheck = () => {
  const { hash } = useParams();
  const [isValidHash, setIsValidHash] = useState(false);
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const { gym, isSuccess, isLoading, isError } = useSelector(
    (state) => state.forgetPassword.forgetPasswordPage
  );

  const { isSuc } = useSelector(
    (state) => state.forgetPasswordReset.forgetPasswordResetPage
  );

  const navigateToHome = () => {
    navigate("/");
  };

  const openNotification = (error) => {
    notification.destroy();
    notification.open({
      message: "Invalid Password",
      description: error,
      icon: <FrownTwoTone twoToneColor="#FF0000" />,
    });
  };

  useEffect(() => {
    if (isSuc) {
      navigate("/Login");
    }

    if (isError) {
      return (
        <div className="errorPage">
          <h1>Link is invalid or expired</h1>
          <Lottie animationData={error} />
          <Button type="primary" shape="round" onClick={navigateToHome}>
            Home Page
          </Button>
        </div>
      );
    }
  }, [isSuc, isSuccess, isError]);

  const sendPassword = () => {
    if (password) {
      if (password.length < 8) {
        openNotification(
          "The length of the password must be longer than 8 characters!"
        );
      } else {
        const handleResetPassword = async () => {
          await dispatch(handleActionToResetPassword({ hash, password }));
        };

        handleResetPassword();
      }
    } else {
      openNotification("Password cannot be empty!");
    }
  };

  useEffect(() => {
    const handleCheckPassword = async () => {
      await dispatch(handleActionToCheckHash({ hash }));
    };

    handleCheckPassword();
  }, []);

  if (isSuccess) {
    return (
      <div className="reset-form-container">
        <img src={gymmy} style={{ height: "25vh", width: "25vh" }} />

        <div className="reset-form-item">
          <Input.Password
            size={"large"}
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>

        <div className="reset-form-item" style={{ marginTop: "2rem" }}>
          <Button type="primary" onClick={sendPassword}>
            Submit
          </Button>
        </div>
      </div>
    );
  }

  // if(isError){
  //     return (
  //         <div>
  //             error
  //         </div>
  //     )
  // }
};
