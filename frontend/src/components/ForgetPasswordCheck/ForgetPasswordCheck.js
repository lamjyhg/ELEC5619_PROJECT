import React, {useCallback, useEffect, useState} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleActionToGetReviews} from "../../state/Review/review.action";
import {handleActionToCheckHash} from "../../state/forgetPassword/forgetPassword.action";


export const ForgetPasswordCheck = () => {


    const {hash} = useParams();
    const [isValidHash, setIsValidHash] = useState(false)
    const dispatch = useDispatch();

    const { gym, isSuccess, isLoading, isError } = useSelector(
        (state) => state.forgetPassword.forgetPasswordPage
    );



    useEffect( () => {

        const handleCheckPassword = async () => {
            await dispatch(handleActionToCheckHash({hash}));
        };

        handleCheckPassword()
    }, [])



    if(isLoading){

        return (
            <div>
                Loading
            </div>
        )
    }

    if(isSuccess){
        return(
            <div>
                form here
            </div>
        )
    }


    if(isError){
        return (
            <div>
                error
            </div>
        )
    }
}
