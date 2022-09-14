import { GET, POST, PUT } from '../constants/requests';
import request from '../utils/request';
const URL_PREFIX = 'appointments';

export const handleRequestToGetGymAppointments = () => {
  const config = {
    url: URL_PREFIX + '',
    method: GET,
  };
  return request(config).then((res) => res.data);
};

export const handleRequestToCreateAppointment = (appointment) => {
  const config = {
    url: URL_PREFIX + '',
    method: POST,
    data: { appointment },
  };
  return request(config).then((res) => res.data);
};

export const handleRequestToCancelAppointment = (id) => {
  const config = {
    url: URL_PREFIX + '/' + id,
    method: PUT,
  };
  return request(config).then((res) => res.data);
};
