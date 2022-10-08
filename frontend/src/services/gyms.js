import {GET, POST} from '../constants/requests';
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


export const handleRequestToGetSingleGym = (UUID) => {
  const config = {
    url: URL_PREFIX + '/' + UUID,
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



export const handleRequestToSubmitReview = (rating, comment, gym_id, user_id) => {
  const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');

  const data = {

    comment: comment,
    date: date,
    star: rating,
    gid: gym_id,
    uid:user_id
  }


  const config = {
    url: URL_PREFIX + '/' + gym_id + '/create_review',
    method: POST,
    data: data,
  }

  return request(config).then((res) => res.data);

};


export const handleRequestToGetReview = (gym_id) => {
  const config = {
    url: URL_PREFIX + '/' + gym_id + '/reviews' + "?gym_id=" + gym_id,
    method: GET,
  };

  return request(config).then((res) => res.data);

};
