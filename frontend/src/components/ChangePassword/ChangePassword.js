import React, {useCallback, useEffect, useState} from "react"
import {Button, notification} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, FileTextOutlined, FrownTwoTone, SmileTwoTone} from '@ant-design/icons';
import { Input } from 'antd';
import './ChangePassword.scss'
import {useDispatch, useSelector} from "react-redux";
import {handleActionToChangePassword} from "../../state/resetPassword/resetPassword.action";

export const ChangePassword = () => {


    const [password, setPassword] = useState();
    const [newPassword, setNewPassword]= useState();

    const[passwordText, setPasswordText] = useState("");
    const [newPasswordText, setNewPasswordText] = useState("");
    const dispatch = useDispatch();

    const {isSuccess, isError, isLoading, errors} = useSelector(
        (state) => state.changePassword.changePasswordPage
    )

    const openNotification = (message, des, color, isErr) => {
        notification.destroy();
        notification.open({
            message: message,
            description:
            des,
            icon: isErr?<FrownTwoTone twoToneColor={color} />:<SmileTwoTone twoToneColor={color} />,
        });
    };

    const changePassword = () => {

        setNewPasswordText("");
        setPasswordText("");

        if(newPassword && password){

            if(newPassword.length < 8){
                setNewPasswordText("The length of the must must be greater than 8 characters")
            }else{
                const handleChangePassword = async () => {
                    await dispatch(handleActionToChangePassword({newPassword, password}))
                }
                handleChangePassword();
            }
        }else{
            if(!newPassword){
                setNewPasswordText("New password cannot be empty")
            }

            if(!password){
                setPasswordText("Current password cannot be empty")
            }
        }

    }



    useEffect(() => {

        if(isSuccess){
            openNotification("Reset Success!", "", "", false)
            // window.location.reload();
        }


        if(isError){
            openNotification("Reset Error", errors, "#FF0000", true)
        }



    }, [isSuccess, isError])


    return (
        <div className="change-password-container">

            <div className="change-password-title">
                Change your password
            </div>


            <div className="change-password-item">
                <Input.Password onChange={(evt) => setPassword(evt.target.value)} id='password' size="large" placeholder="Current Password" prefix={<FileTextOutlined />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                <div className="item-error">{passwordText}</div>
            </div>


            <div className="change-password-item">
                <Input.Password onChange={(evt) => setNewPassword(evt.target.value)} id='newPassword' size="large" placeholder="New Password" prefix={<FileTextOutlined />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                <div className="item-error">{newPasswordText}</div>
            </div>



            <Button onClick={changePassword}>Submit</Button>


        </div>
    )
}
