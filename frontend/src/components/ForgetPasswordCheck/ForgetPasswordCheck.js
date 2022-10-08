import React, {useCallback, useEffect, useState} from "react"
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleActionToGetReviews} from "../../state/Review/review.action";
import {handleActionToCheckHash} from "../../state/forgetPassword/forgetPassword.action";
import "./ForgetPasswordCheck.scss"
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import gymmy from '../../image/gymmy.png'
import { Button } from 'antd';
import {handleActionToResetPassword} from "../../state/forgetPassword/forgetPasswordReset.action";
import Lottie from "lottie-react";
import error from "../../image/lotties/errorPage.json";

export const ForgetPasswordCheck = () => {


    const {hash} = useParams();
    const [isValidHash, setIsValidHash] = useState(false)
    const dispatch = useDispatch();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const { gym, isSuccess, isLoading, isError } = useSelector(
        (state) => state.forgetPassword.forgetPasswordPage
    );

    const {isSuc} = useSelector(
        (state) => state.forgetPasswordReset.forgetPasswordResetPage
    )

    const navigateToHome = () => {
        navigate("/")
    }

    const navigateToForgetPassword = () => {
        navigate("/localhost")
    }


    if(isSuc){
        navigate("/Login")
    }



    const sendPassword = () => {

        if(password){
            const handleResetPassword = async () => {
                await dispatch(handleActionToResetPassword({hash, password}))
            }

            handleResetPassword();
        }
    }



    useEffect( () => {

        const handleCheckPassword = async () => {
            await dispatch(handleActionToCheckHash({hash}));
        };

        handleCheckPassword()
    }, [])




    if(isSuccess){
        return(
            <div className="reset-form-container">

                <img src={gymmy} style={{height:"25vh", width:"25vh"}}/>

                <div className="reset-form-item">
                    <Input.Password
                        size={"large"}
                        placeholder="input password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(evt) => setPassword(evt.target.value)}
                    />
                </div>

                <div className="reset-form-item" style={{marginTop:"2rem"}}>
                    <Button type="primary" onClick={sendPassword}>Submit</Button>
                </div>
            </div>
        )
    }

    if(isError){

        return(
            <div className="errorPage">
                <h1>Link is invalid or expired</h1>
                <Lottie animationData={error} />
                <Button type="primary" shape="round" onClick={navigateToHome}>
                    Home Page
                </Button>
            </div>
        )
    }


    // if(isError){
    //     return (
    //         <div>
    //             error
    //         </div>
    //     )
    // }
}
