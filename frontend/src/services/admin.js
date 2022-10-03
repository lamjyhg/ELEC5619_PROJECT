import { GET } from '../constants/requests';
import request from '../utils/request';
const URL_PREFIX = 'admin';

export const handleRequestToGetAllUsers = () => {
    const config = {
        url: URL_PREFIX + '',
        method: GET,
    };

    return request(config).then((res) => res.data);
};
