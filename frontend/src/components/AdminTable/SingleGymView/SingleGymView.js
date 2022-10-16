import React, { useEffect, useState } from 'react';
import temp_gym from '../../../image/temp_gym_img.jpg';
import './SingleGymView.scss';
import 'antd/dist/antd.css';
import { baseURL } from '../../../utils/request';
import SingleGymMap from '../../SingleGymMap/SingleGymMap';

const SingleGymView = ({ GID, gym }) => {
  if (!gym) {
    return <></>;
  }
  return (
    <div className="single_gym_container">
      <div className="top_container">
        <div className="left_info_area">
          <div className="info_title">{gym.name}</div>

          <div className="large_size_info">
            Number of appointments: {gym.maximumOfAppointments}
          </div>

          <div className="middle_size_info">Location: {gym.address}</div>

          <div className="description_wrapper">
            <div className="small_size_info">{gym.description}</div>
          </div>
        </div>

        <div className="right_image_area">
          <div className="mid_img">
            <img
              className="large_img"
              alt={`${gym.name}'s logo`}
              src={gym.imageUrl ? baseURL + gym.imageUrl : temp_gym}
            />
          </div>
        </div>
      </div>

      <div className="bot_container">
        <div className="small_map">
          <SingleGymMap geoLocation={gym.geoLocation}></SingleGymMap>
        </div>
      </div>
    </div>
  );
};

export default SingleGymView;
