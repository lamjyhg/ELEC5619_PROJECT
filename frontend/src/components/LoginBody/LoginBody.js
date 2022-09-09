// Attribution: <a href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy</a>
import { UserOutlined,FileTextOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

import React, {useEffect, useState} from "react"

import './LoginBody.scss'
import logo from '../../image/gymmy.png'

const LoginBody = () => {

    const [submitText, setSubmitText] = useState("Login")
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)

    return (
        <div className="login-container">

            <div className="login-item-container">

                <div className='login-item' id='logo'>
                    <img id="login-logo" src={logo}></img>
                </div>

                <div className="login-item">
                    <Input  id='username' placeholder="Username/email" prefix={<UserOutlined />} />
                </div>

                <div className="login-item" id='password'>
                    <Input.Password id='password' placeholder="Password" prefix={<FileTextOutlined />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>

                <div className="login-item" id='buttonItem'>
                    <Button id='submitButton' type="primary" loading={isSubmitLoading}>
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



            {/* <div className="login-item-container">
                <div className="login-item">
                </div>
            </div> */}

        </div>
    )
}

export default LoginBody