import { POST } from "../constants/requests";
import request from "../utils/request";

const URL_PREFIX = "/";

export const handleRequestToPostForgetPassword = (user) => {
  const config = {
    url: URL_PREFIX + "forget_password",
    method: POST,
  };
  return request(config).then((res) => res.data);
};

export const handleRequestToPostForgetPasswordCheck = (hash) => {
  const config = {
    url: URL_PREFIX + "forget_password/check",
    method: POST,
    data: { hash: hash },
  };
  return request(config).then((res) => res.data);
};

export const handleRequestToResetPassword = (hash, password) => {
  console.log(hash, password);
  const config = {
    url: URL_PREFIX + "forget_password/reset",
    method: POST,
    data: {
      hash: hash,
      password: password,
    },
  };
  return request(config).then((res) => res.data);
};
