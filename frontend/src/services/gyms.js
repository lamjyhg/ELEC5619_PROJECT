import { GET } from '../constants/requests';
import request from '../utils/request';
import { gyms } from '../mocks/gyms';
const URL_PREFIX = 'gyms';

export const handleRequestToGetGyms = () => {
  const config = {
    url: URL_PREFIX + '',
    method: GET,
  };

  return request(config).then((res) => res.data);
};

export const handleRequestToGetNearbyGyms = (lat, lng) => {
  const config = {
    url: URL_PREFIX + '/findAllNearby?latitude=' + lat + '&longitude=' + lng,
    method: GET,
  };

  return request(config).then((res) => res.data);
};
