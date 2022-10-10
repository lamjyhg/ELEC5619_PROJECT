import React, { useEffect, useState } from 'react';
import './EmailSentPage.scss';
import Lottie from 'lottie-react';
import emailSent from '../../image/lotties/email_sent.json'
import { Button } from 'antd';
import {useNavigate} from "react-router-dom";




const EmailSentPage = () => {

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToLogin = () => {
        navigate('/Login');
    };

    return (
        <div className="emailSentPage">
            <h1>Email Sent!</h1>
            <Lottie animationData={emailSent} />


            <Button type="primary" shape="round" onClick={navigateToHome}>
                Home Page
            </Button>

            <Button type="primary" shape="round" onClick={navigateToLogin}>
                Login Page
            </Button>

        </div>
    );
};

export default EmailSentPage;
