import { POST } from "../constants/requests";
import request from "../utils/request";
const URL_PREFIX = "user";

export const handleRequestToChangePassword = (password, oldPassword) => {
  console.log(password, oldPassword);
  const config = {
    url: URL_PREFIX + "/reset",
    method: POST,
    data: {
      password: password,
      oldPassword: oldPassword,
    },
  };

  return request(config).then((res) => res.data);
};
