import { GET } from '../constants/requests';
import request from '../utils/request';
const URL_PREFIX = 'appointments';

export const handleRequestToGetGymsAppointments = (userId) => {
  const config = {
    url: URL_PREFIX + '/',
    method: GET,
    data: { userId },
  };
  return request(config).then((res) => res.data);
};
