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
    data: selectedUser,
  };

  return request(config).then((res) => res.data);
};

export const handleRequestToGetUser = (id) => {
  const config = {
    url: URL_PREFIX + '/getOne/' + id,
    method: GET,
  };

  return request(config).then((res) => res.data);
};

export const handleRequestToUpdateRole = (input) => {
  const config = {
    url: URL_PREFIX + '/updateRole/' + input.role + '/' + input.email,
    method: POST,
  };

  return request(config).then((res) => res.data);
};

export const handleRequestToGetCurrentUser = () => {
  const config = {
    url: URL_PREFIX + '/current_user',
    method: GET,
  };

  return request(config).then((res) => res.data);
};
export const handleRequestToCheckAdminAuthority = () => {
  const config = {
    url: URL_PREFIX + '/checkAdminAuthority',
    method: GET,
  };

  return request(config).then((res) => res.data);
};
