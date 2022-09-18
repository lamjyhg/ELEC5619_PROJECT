// Attribution: <a href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy</a>
import { UserOutlined,FileTextOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

import React, {useEffect, useState} from "react"

import './LoginBody.scss'
import logo from '../../image/gymmy.png'
import {useDispatch, useSelector} from "react-redux";
import {handleLoginRequest} from "../../state/auth/login.action";

const LoginBody = () => {

    const {isSuccess, isLoading, isError } = useSelector(
        (state) => state.login.loginPage
    );

    const dispatch = useDispatch();


    const [submitText, setSubmitText] = useState("Login")
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const emailOnchange = (evt) =>{
        setEmail(evt.target.value);
    }

    const passwordOnchange = (evt) => {
        setPassword(evt.target.value);
    }


    const submit = () => {

        const userInput = {
            email: email,
            password: password
        }


        const handleLogin = async () => {
            await dispatch(handleLoginRequest(userInput));
        };

        handleLogin();

    }


    return (
        <div className="login-container">

            <div className="login-item-container">

                <div className='login-item' id='logo'>
                    <img id="login-logo" src={logo}></img>
                </div>

                <div className="login-item" onChange={emailOnchange}>
                    <Input  id='username' placeholder="email" prefix={<UserOutlined />} />
                </div>

                <div className="login-item" id='password' onChange={passwordOnchange}>
                    <Input.Password id='password' placeholder="Password" prefix={<FileTextOutlined />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>

                <div className="login-item" id='buttonItem' onClick={submit}>
                    <Button id='submitButton' type="primary" loading={isLoading}>
                        {submitText}
                    </Button>
                </div>

                <div className="login-item" id='login-links'>
                    <p>
                        <a href="#">Forget Password</a>
                    </p>
                    <p>
                        <a href="/Register">Register</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginBody