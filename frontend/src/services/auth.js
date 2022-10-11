import { POST, PUT } from "../constants/requests";
import request from "../utils/request";
const URL_PREFIX = "user";

export const registerService = (user) => {
  const config = {
    url: URL_PREFIX + "/Register",
    method: POST,
    data: user,
  };

  return request(config).then((res) => res.data);
};

export const loginService = (userInput) => {
  const config = {
    url: URL_PREFIX + "/Login",
    method: POST,
    data: userInput,
  };

  return request(config).then((res) => res.data);
};

export const handleRequestToActivateAccount = (token) => {
  const config = {
    url: URL_PREFIX + "/activate/" + token,
    method: PUT,
  };

  return request(config).then((res) => res.data);
};
