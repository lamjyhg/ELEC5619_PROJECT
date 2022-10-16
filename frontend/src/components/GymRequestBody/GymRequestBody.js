import React, { useEffect, useState } from 'react';
import temp_gym from './../../image/temp_gym_img.jpg';
import './GymRequestBody.scss';
import 'antd/dist/antd.css';
import { baseURL } from './../../utils/request';
import SingleGymMap from '../SingleGymMap/SingleGymMap';
import moment from 'moment';
const TimeMap = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Saturday',
  6: 'Sunday',
};
const GymRequestBody = ({ gym }) => {
  if (!gym) {
    return <></>;
  }
  const getTradingHours = (tradingHours, maximumOfAppointments) => {
    if (
      (maximumOfAppointments <= 0) | !tradingHours ||
      Object.keys(tradingHours).length <= 0
    ) {
      return <p>Currently closed, no available time</p>;
    }

    const component = [];

    for (const key in tradingHours) {
      if (tradingHours.hasOwnProperty(key)) {
        const day = TimeMap[key];
        var startTime = tradingHours[key].startTime;
        var endTime = tradingHours[key].endTime;

        var startTimeMoment = moment(startTime, 'hh:mm:ss').format('hh:mm A');
        var endTimeMoment = moment(endTime, 'hh:mm:ss').format('hh:mm A');

        const res = (
          <div>
            {' '}
            {day} : {startTimeMoment} - {endTimeMoment}
          </div>
        );
        component.push(res);
      }
    }

    return component;
  };
  return (
    <div className="single_gym_container">
      <div className="top_container">
        <div className="left_info_area">
          <div className="info_title">{gym.name}</div>

          <div className="large_size_info">
            Number of appointments: {gym.maximumOfAppointments}
          </div>

          <div className="middle_size_info">Location: {gym.address}</div>

          <div className="other_container">
            <div className="description_wrapper" style={{ marginTop: '0' }}>
              <div className="small_size_info">{gym.description}</div>
            </div>

            <div className="vertical_wrapper">
              <div className="tradingHours">
                {getTradingHours(gym.tradingHours)}
              </div>
            </div>
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
          <SingleGymMap
            geoLocation={gym.geoLocation}
            gymsList={[gym]}
          ></SingleGymMap>
        </div>
      </div>
    </div>
  );
};

export default GymRequestBody;
