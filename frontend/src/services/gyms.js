import { GET } from '../constants/requests';
import request from '../utils/request';
import { gyms } from '../mocks/gyms';
const URL_PREFIX = 'gyms';

export const handleRequestToGetGyms = () => {
  const config = {
    url: URL_PREFIX + '/',
    method: GET,
  };
  //return request(config).then((res) => res.data);
  return request(config).then((res) => {
    res.status = 200;
    console.log(res.status);
    return res.data;
  });
};
