import React, {useCallback, useEffect, useState} from "react"
import { Button } from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, FileTextOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import './ChangePassword.scss'
import {useDispatch, useSelector} from "react-redux";
import {handleActionToChangePassword} from "../../state/resetPassword/resetPassword.action";

export const ChangePassword = () => {


    const [password, setPassword] = useState();
    const [newPassword, setNewPassword]= useState();
    const dispatch = useDispatch();

    const {isSuccess, isError, isLoading} = useSelector(
        (state) => state.changePassword.changePasswordPage
    )

    const changePassword = () => {

        if(newPassword && password){


            const handleChangePassword = async () => {
                await dispatch(handleActionToChangePassword({newPassword, password}))
            }

            handleChangePassword();

        }

    }

    if(isSuccess){
        window.alert("change success!")
    }



    return (
        <div className="change-password-container">

            <div className="change-password-title">
                Change your password
            </div>


            <div className="change-password-item">
                <Input.Password onChange={(evt) => setPassword(evt.target.value)} id='password' size="large" placeholder="Current Password" prefix={<FileTextOutlined />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
            </div>


            <div className="change-password-item">
                <Input.Password onChange={(evt) => setNewPassword(evt.target.value)} id='newPassword' size="large" placeholder="New Password" prefix={<FileTextOutlined />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
            </div>



            <Button onClick={changePassword}>Submit</Button>


        </div>
    )
}
