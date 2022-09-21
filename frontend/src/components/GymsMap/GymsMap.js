import React, { useState, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api';
import './GymsMap.scss';
import { googleMapApiKey } from '../../services/googleMaps';

import { CloseOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { mapStyle } from './MapStyle';
import { useSelector } from 'react-redux';
import { fromNumberToWeekday, timeFormatter } from '../../utils/timeHandlers';

function GymsMap() {
  const { gymsList, isSuccess, isLoading, isError } = useSelector(
    (state) => state.gyms.gymsPage
  );
  const [center, setCenter] = useState({ lat: -34.9, lng: 100.0 });
  const [gym, setGym] = useState(null);

  // const [gyms, setGyms] = useState([
  //   { id: 1, name: 'oliver_room', geolocation: { lat: -33.928, lng: 151.15 } },
  //   { id: 1, name: 'jay_room', geolocation: { lat: -33.828, lng: 151.15 } },
  // ]);

  const handleMarkerClick = (detail) => {
    setCenter(detail.geolocation);
    setGym(detail);
  };

  const getTradingHoursString = (tradingHours) => {
    const keys = Object.keys(tradingHours).sort();
    const words = keys.map((key, index) => (
      <p className="gymCard__tradingHours" key={index}>
        {fromNumberToWeekday(key)} :{' '}
        {timeFormatter(tradingHours[key]['startTime']) +
          '-' +
          timeFormatter(tradingHours[key]['endTime'])}
      </p>
    ));
    return words;
  };

  const showGymCard = () => {
    if (gym) {
      return (
        <OverlayView
          position={gym.geoLocation}
          key={100}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <Card
            size="small"
            className="gymCard"
            title={<p className="gymCard__title">{gym.name}</p>}
            extra={
              <CloseOutlined
                onClick={() => {
                  setGym(null);
                }}
                className="gymCard__header__closeButton"
              ></CloseOutlined>
            }
          >
            <p className="gymCard__tradingHours"> trading hours :</p>
            {getTradingHoursString(gym.tradingHours)}

            <a href={'/gyms/' + gym.id}>more</a>
          </Card>
        </OverlayView>
      );
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newCenter = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
        };
        setCenter(newCenter);
      });
    }

    //getGyms by current center location
  }, []);

  return (
    <div className="gymsMap">
      <Wrapper apiKey={googleMapApiKey}>
        <GoogleMap mapContainerStyle={mapStyle} center={center} zoom={12}>
          {gymsList.map((each, index) => {
            return (
              <Marker
                key={index}
                position={each.geoLocation}
                clickable={true}
                onClick={() => {
                  handleMarkerClick(each);
                }}
              ></Marker>
            );
          })}
          {showGymCard()}
        </GoogleMap>
      </Wrapper>
    </div>
  );
}
export default GymsMap;
