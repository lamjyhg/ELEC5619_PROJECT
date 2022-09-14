// Attribution: <a href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy</a>
import { UserOutlined,FileTextOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Space, Select } from 'antd';

import React, {useEffect, useState} from "react"


import './RegisterBody.scss'
import logo from '../../image/gymmy.png'

import {registerService} from "../../services/auth";

const RegisterBody = () => {

    const [submitText, setSubmitText] = useState("Register")
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [name, setName] = useState();


    const { Option } = Select;

    const usernameOnchange = (evt) =>{setUsername(evt.target.value)}
    const passwordOnchange = (evt) => {setPassword(evt.target.value)}
    const emailOnchange = (evt) => {setEmail(evt.target.value)}
    const rePasswordOnchange = (evt) => {setRePassword(evt.target.value)}

    const submit = () => {
        const userInput = {
            "email":email,
            "password":password,
            "username":username,
            "name":"unset",
            "type":"unset",
        }


        registerService(userInput)
            .then( res => {console.log(res)})
            .catch( err => console.log(err))
    }





    return (
        <div className="register-container">

            <div className="register-item-container">

                <div className='register-item' id='logo'>
                    <img id="register-logo" src={logo}></img>
                </div>


                <div className="register-item" onChange={emailOnchange}>
                    <Input  id='email' placeholder="email" prefix={<UserOutlined />} />
                </div>

                <div className="register-item" onChange={usernameOnchange}>
                    <Input  id='username' placeholder="username" prefix={<UserOutlined />} />
                </div>

                <div className="register-item" id='password' onChange={passwordOnchange}>
                    <Input.Password id='password' placeholder="Password" prefix={<FileTextOutlined />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>

                <div className="register-item" onChange={rePasswordOnchange}>
                    <Input.Password id='re_password' placeholder="Re-enter Password" prefix={<FileTextOutlined />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>

                <div className="register-item" id='buttonItem' onClick={submit}>
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


        </div>
    )
}

export default RegisterBody