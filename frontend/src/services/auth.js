import { GET,POST } from '../constants/requests';
import request from '../utils/request';
const URL_PREFIX = 'user';

export const registerService = (user) => {
    const config = {
        url: URL_PREFIX + '/Register',
        method: POST,
        data: user,
    };

    console.log(user)

    return request(config).then((res) => res.data);
};

export const loginService  = (userInput) => {
    const config = {
        url: URL_PREFIX + '/Login',
        method: GET,
        data: { userInput },
    };
    return request(config).then((res) => res.data);
};
