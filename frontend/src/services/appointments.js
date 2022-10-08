import { GET, POST, PUT } from "../constants/requests";
import request from "../utils/request";
const URL_PREFIX = "appointments";

export const handleRequestToGetGymAppointmentsByGymOwner = () => {
  const config = {
    url: URL_PREFIX + "/listAllByGymOwner",
    method: GET,
  };
  return request(config).then((res) => res.data);
};

export const handleRequestToGetAppointmentsByUser = () => {
  const config = {
    url: URL_PREFIX + "/listAllByUser",
    method: GET,
  };
  return request(config).then((res) => res.data);
};

export const handleRequestToCancelAppointmentByGymOwner = (id, comment) => {
  const config = {
    url: `${URL_PREFIX}/${id}/cancelByGymOwner?comment=${comment}`,
    method: PUT,
  };
  return request(config).then((res) => res.data);
};

export const handleRequestToCreateAppointment = (appointment) => {
  const config = {
    url: URL_PREFIX,
    method: POST,
    data: appointment,
  };
  return request(config).then((res) => res.data);
};
