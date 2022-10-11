import { FrownTwoTone, MailOutlined } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.scss";

import validator from "validator";

export const ForgetPassword = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const openNotification = (error) => {
    notification.destroy();
    notification.open({
      message: "Invalid email",
      description: error,
      icon: <FrownTwoTone twoToneColor="#FF0000" />,
    });
  };

  const toLogin = () => {
    navigate("/Login");
  };

  const sendEmail = () => {
    if (email) {
      if (!validator.isEmail(email)) {
        openNotification("Invalid email format");
      } else {
        axios
          .post("http://localhost:8080/forget_password", { email: email })
          .then((res) => navigate("/email_sent"))
          .catch((err) => {
            openNotification(err.response.data);
          });
      }
    } else {
      openNotification("Email cannot be empty");
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-item">
        Enter the email address associated to your account, we will send you a
        link to reset your password.
      </div>

      <div className="change-password-item">
        <Input
          size="large"
          onChange={(v) => {
            setEmail(v.target.value);
          }}
          placeholder="email address"
          style={{ width: "40%" }}
          prefix={<MailOutlined />}
        />
      </div>

      <div className="same-line-wrapper">
        <div className="change-password-item" onClick={sendEmail}>
          <Button type="primary">Send</Button>
        </div>

        <div className="change-password-item" onClick={toLogin}>
          <a href="#">To login</a>
        </div>
      </div>
    </div>
  );
};
