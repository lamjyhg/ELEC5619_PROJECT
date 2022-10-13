import { Wrapper } from '@googlemaps/react-wrapper';
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { googleMapApiKey } from '../../services/googleMaps';
import './GymsMap.scss';

import { CloseOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { fromNumberToWeekday, timeFormatter } from '../../utils/timeHandlers';
import { mapStyle } from './MapStyle';

function GymsMap({ currentLatitude, currentLongitude, additionalList }) {
  const { gymsList, isSuccess, isLoading, isError } = useSelector(
    (state) => state.gyms.gymsPage
  );

  if (additionalList && additionalList.length > 0) {
    additionalList.map((element, index) => {
      gymsList.add(element);
    });
  }

  const [center, setCenter] = useState({
    lat: currentLatitude,
    lng: currentLongitude,
  });
  const [gym, setGym] = useState(null);

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

  useEffect(() => {
    setCenter({ lat: currentLatitude, lng: currentLongitude });
  }, [currentLatitude, currentLongitude]);

  const showGymCard = () => {
    if (gym) {
      return (
        <OverlayView
          position={gym.geoLocation}
          key={100}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <Card
            size="large"
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
  return (
    <div className="gymsMap">
      <Wrapper googleMapsApiKey={googleMapApiKey}>
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
