// Attribution: <a href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy</a>
import {
  UserOutlined,
  FileTextOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  FrownTwoTone,
} from '@ant-design/icons';
import { Input, notification } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Space, Select } from 'antd';

import React, { useEffect, useState } from 'react';

import './RegisterBody.scss';
import logo from '../../image/gymmy.png';

import { registerService } from '../../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { handleRegisterRequest } from '../../state/auth/register.action';
import { isPending } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { isContainSpecialCharts, isSameString } from '../../utils/inputUtiles';

const RegisterBody = () => {
  const [submitText, setSubmitText] = useState('Register');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [name, setName] = useState();

  const { Option } = Select;

  const usernameOnchange = (evt) => {
    setUsername(evt.target.value);
  };
  const passwordOnchange = (evt) => {
    setPassword(evt.target.value);
  };
  const emailOnchange = (evt) => {
    setEmail(evt.target.value);
  };
  const rePasswordOnchange = (evt) => {
    setRePassword(evt.target.value);
  };
  const fullnameOnchange = (evt) => {
    setName(evt.target.value);
  };

  const [emailText, setEmailText] = useState(' ');
  const [usernameText, setUsernameText] = useState(' ');
  const [passwordText, setPassowrdText] = useState(' ');
  const [rePasswordText, setRepasswordText] = useState(' ');
  const [nameText, setNameText] = useState(' ');

  const openNotification = (error) => {
    notification.destroy();
    notification['error']({
      message: 'register failed',
      description: error,
    });
  };

  const { isSuccess, isLoading, isError, errors } = useSelector(
    (state) => state.register.registerPage
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = () => {
    var isErr = false;

    setRepasswordText('');
    setEmailText('');
    setUsernameText('');
    setPassowrdText('');
    setRepasswordText('');
    setNameText('');

    if (password && password.length < 8) {
      setPassowrdText(' Password must have more than 8 characters.');
      isErr = true;
    }

    if (isContainSpecialCharts(password)) {
      isErr = true;
      setPassowrdText('Special characters are not allowed');
    }

    if (isContainSpecialCharts(username)) {
      isErr = true;
      setUsernameText('Special characters are not allowed');
    }

    if (isContainSpecialCharts(name)) {
      isErr = true;
      setNameText('Special characters are not allowed');
    }

    if (isContainSpecialCharts(email)) {
      isErr = true;
      setEmailText('Special characters are not allowed');
    }

    if (!isSameString(password, rePassword)) {
      isErr = true;
      setRepasswordText('2 passwords must be same');
    }

    if (!email || email === ' ') {
      isErr = true;
      setEmailText('Email cannot be empty');
    }

    if (!username || email === ' ') {
      isErr = true;
      setUsernameText('Username cannot be empty');
    }

    if (!password || email === ' ') {
      isErr = true;
      setPassowrdText('Password cannot be empty');
    }

    if (!rePassword) {
      isErr = true;
      setRepasswordText('Re-entered password cannot be empty');
    }

    if (!name) {
      isErr = true;
      setNameText('Name cannot be empty');
    }

    if (!isErr) {
      const userInput = {
        email: email,
        password: password,
        username: username,
        name: name,
        type: 'unset',
      };

      const handleRegister = async () => {
        await dispatch(handleRegisterRequest(userInput));
      };

      handleRegister();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }

    if (isError) {
      if (errors) {
        if (errors === 'email send failed, this could be an API issue.') {
          openNotification('email send failed, this could be an API issue');
        }

        if (errors.errors) {
          if (errors.errors[0] === 'Invalid email format') {
            setEmailText('Invalid email format');
          }

          if (
            errors.errors[0] ===
            "Inputs cannot include special characters. e.g. '%', ''', '$', '=', '!' '`' and spaces"
          ) {
            openNotification(errors.errors[0]);
          }
        }
      }

      if (errors === 'This email has been registered.') {
        setEmailText(errors);
      }

      if (errors === 'This email has been registered.') {
        setEmailText(errors);
      }

      if (errors === 'This username has been registered.') {
        setUsernameText(errors);
      }

      if (errors === 'This username has been registered.') {
        setUsernameText(errors);
      }
    }
  }, [isSuccess, isError]);

  return (
    <div className="register-container">
      <div className="register-item-container">
        <div className="register-item" id="logo">
          <img id="register-logo" src={logo}></img>
        </div>

        <div className="register-item" onChange={emailOnchange}>
          <Input id="email" placeholder="email" prefix={<UserOutlined />} />
          <div className="register-item-error">{emailText}</div>
        </div>

        <div className="register-item" onChange={usernameOnchange}>
          <Input
            id="username"
            placeholder="username"
            prefix={<UserOutlined />}
          />
          <div className="register-item-error">{usernameText}</div>
        </div>

        <div className="register-item" onChange={fullnameOnchange}>
          <Input
            id="fullname"
            placeholder="full name"
            prefix={<UserOutlined />}
          />
          <div className="register-item-error">{nameText}</div>
        </div>

        <div
          className="register-item"
          id="password"
          onChange={passwordOnchange}
        >
          <Input.Password
            id="password"
            placeholder="Password"
            prefix={<FileTextOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <div className="register-item-error">{passwordText}</div>
        </div>

        <div className="register-item" onChange={rePasswordOnchange}>
          <Input.Password
            id="re_password"
            placeholder="Re-enter Password"
            prefix={<FileTextOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <div className="register-item-error">{rePasswordText}</div>
        </div>

        <div className="register-item" id="buttonItem" onClick={submit}>
          <Button id="submitButton" type="primary" loading={isLoading}>
            {submitText}
          </Button>
        </div>

        <div className="register-item" id="register-links">
          <p>
            <a href="/Login">Have an account?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterBody;
