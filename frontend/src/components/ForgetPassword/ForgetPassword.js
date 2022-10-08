import React, {useCallback, useEffect, useState} from "react"
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import "./ForgetPassword.scss"
import axios from "axios";
import {useNavigate} from "react-router-dom";



export const ForgetPassword = () => {


    const [email, setEmail] = useState();
    const navigate = useNavigate();

    const sendEmail = () => {
        console.log(email)
        if(email){
            console.log("send")
            axios.post("http://localhost:8080/forget_password", {"email":email})
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }



    return (
        <div className="change-password-container">


            <div className="change-password-item">
                Enter the email address associated to your account, we will send you a link to reset your password.
            </div>



            <div className="change-password-item">
                <Input size="large" onChange={(v) => {setEmail(v.target.value)}} placeholder="email address" style={{width:"40%"}} prefix={<MailOutlined />} />
            </div>



            <div className="change-password-item" onClick={sendEmail}>
                <Button  type="primary">Send</Button>
            </div>

        </div>
    )
}