import { GET, POST } from "../constants/requests";
import request from "../utils/request";
const URL_PREFIX = "gyms";

export const handleRequestToGetGyms = () => {
  const config = {
    url: URL_PREFIX + "",
    method: GET,
  };

  return request(config).then((res) => res.data);
};

export const handleRequestToGetSingleGym = (UUID) => {
  const config = {
    url: URL_PREFIX + "/" + UUID,
    method: GET,
  };

  return request(config).then((res) => res.data);
};

export const handleRequestToCreateGym = (data) => {
  const config = {
    url: URL_PREFIX,
    method: POST,
    data,
  };

  return request(config).then((res) => res.data);
};

export const handleRequestToSaveGymPhoto = (data) => {
  const config = {
    url: URL_PREFIX + "/gym-photos",
    method: POST,
    data,
  };

  return request(config).then((res) => res.data);
};
export const handleRequestToGetNearbyGyms = (lat, lng) => {
  const config = {
    url: URL_PREFIX + "/findAllNearby?latitude=" + lat + "&longitude=" + lng,
    method: GET,
  };

  return request(config).then((res) => res.data);
};
