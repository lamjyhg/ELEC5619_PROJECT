// Attribution: <a href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy</a>
import { UserOutlined,FileTextOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

import React, {useEffect, useState} from "react"

import './RegisterBody.scss'

const RegisterBody = () => {

    const [submitText, setSubmitText] = useState("Register")
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)

    return (
        <div className="register-container">

            <div className="register-item-container">

                <div className="register-item">
                    <Input  id='username' placeholder="Username/email" prefix={<UserOutlined />} />
                </div>

                <div className="register-item" id='password'>
                    <Input.Password id='password' placeholder="Password" prefix={<FileTextOutlined />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>

                <div className="register-item" id='re_password'>
                    <Input.Password id='re_password' placeholder="Re-enter Password" prefix={<FileTextOutlined />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>

                <div className="register-item" id='buttonItem'>
                    <Button id='submitButton' type="primary" loading={isSubmitLoading}>
                        {submitText}
                    </Button>
                </div>

                <div className="register-item" id='register-links'>
                    <p>
                        <a href="/Login">Have an account?</a>
                    </p>
                </div>



            </div>



            <div className="register-item-container">
                <div className="register-item">
                </div>
            </div>

        </div>
    )
}

export default RegisterBody