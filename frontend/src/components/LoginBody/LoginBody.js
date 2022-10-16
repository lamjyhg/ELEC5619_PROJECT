// Attribution: <a href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy</a>
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FileTextOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Input, notification } from 'antd';

import { FrownTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../image/gymmy.png';
import {
  getAdminAuthorityToken,
  getToken,
  setAdminAuthorityToken,
} from '../../services/sessionStorage';
import { handleLoginRequest } from '../../state/auth/login.action';
import './LoginBody.scss';
import { loginService } from '../../services/auth';

const LoginBody = () => {
  const { isSuccess, isLoading, isError, errors } = useSelector(
    (state) => state.login.loginPage
  );
  const adminAuthorityToken = getAdminAuthorityToken();
  const token = getToken();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [submitText, setSubmitText] = useState('Login');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailOnchange = (evt) => {
    setEmail(evt.target.value);
  };

  const passwordOnchange = (evt) => {
    setPassword(evt.target.value);
  };

  const openNotification = (error) => {
    console.log(error)
    if(error){
      if(error.errors){
        error = error.errors[0];
      }
    }
    notification.destroy();
    notification.open({
      message: 'Login failed',
      description: error,
    });
  };

  const submit = async () => {
    setEmailText('');
    setPasswordText('');

    var isErr = false;

    if (!email) {
      setEmailText('Email cannot be empty');
      isErr = true;
    }

    if (!password) {
      setPasswordText('password cannot be empty');
      isErr = true;
    }

    const userInput = {
      email: email,
      password: password,
    };

    if (!isErr) {
      // const handleLogin = async () => {
      //   await dispatch(handleLoginRequest(userInput));

      // };

      // handleLogin();
      try {

        notification.destroy();
        notification['success']({
          message: 'Login Success',
        });

        const result = await loginService(userInput);
        if (result && result.adminAuthorityToken) {
          setAdminAuthorityToken(result.adminAuthorityToken);
          navigate('/admin');
        } else {
          navigate('/');
        }
      } catch (error) {
        notification.destroy();
        notification['error']({
          message: 'Login failed',
          description: error.message,
        });
      }
    }
  };


  return (
    <div className="login-container">
      <div className="login-item-container">
        <div className="login-item" id="logo">
          <img id="login-logo" src={logo}></img>
        </div>

        <div className="login-item" onChange={emailOnchange}>
          <Input id="username" placeholder="email" prefix={<UserOutlined />} />
          <div className="login-item-error">{emailText}</div>
        </div>

        <div className="login-item" id="password" onChange={passwordOnchange}>
          <Input.Password
            id="password"
            placeholder="Password"
            prefix={<FileTextOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />

          <div className="login-item-error">{passwordText}</div>
        </div>

        <div className="login-item" id="buttonItem" onClick={submit}>
          <Button id="submitButton" type="primary" loading={isLoading}>
            {submitText}
          </Button>
        </div>

        <div className="login-item" id="login-links">
          <p>
            <a href="/forget_password">Forget Password</a>
          </p>
          <p>
            <a href="/Register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginBody;
