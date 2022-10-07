import React, {useCallback, useEffect, useState} from "react"
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import "./ForgetPassword.scss"



export const ForgetPassword = () => {


    const [email, setEmail] = useState();

    const sendEmail = () => {
        if(email){

        }
    }



    return (
        <div className="change-password-container">


            <div className="change-password-item">
                Enter the email address associated to your account, we will send you a link to reset your password.
            </div>



            <div className="change-password-item">
                <Input size="large" onChange={(v) => {console.log(v.target.value)}} placeholder="email address" style={{width:"40%"}} prefix={<MailOutlined />} />
            </div>



            <div className="change-password-item" onClick={sendEmail}>
                <Button type="primary">Send</Button>
            </div>

        </div>
    )
}