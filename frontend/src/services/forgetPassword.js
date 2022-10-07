import {POST} from "../constants/requests";
import request from "../utils/request";

const URL_PREFIX = "/"

export const handleRequestToPostForgetPassword = (user) => {
    const config = {
        url: URL_PREFIX + 'forget_password',
        method: POST,
    };
    return request(config).then((res) => res.data);
};


export const handleRequestToPostForgetPasswordCheck = (hash) => {



    const config = {
        url: URL_PREFIX + 'forget_password/check',
        method: POST,
        data:{"hash":hash},
    };
    return request(config).then((res) => res.data);
};


