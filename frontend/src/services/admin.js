import { GET, POST } from '../constants/requests';
import request from '../utils/request';
const URL_PREFIX = 'user';

export const handleRequestToGetAllUsers = () => {
    const config = {
        url: URL_PREFIX + '/getAll',
        method: GET,
    };

    return request(config).then((res) => res.data);
};

export const handleRequestToDeleteUser = (selectedUser) => {
    const config = {
        url: URL_PREFIX + '/deleteUser',
        method: POST,
        data:selectedUser
    };

    return request(config).then((res) => res.data);
};
