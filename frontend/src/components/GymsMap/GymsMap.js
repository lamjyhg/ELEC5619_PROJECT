import React, { useState, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { HeartFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  InfoBox,
  OverlayView,
} from '@react-google-maps/api';

import { CloseOutlined } from '@ant-design/icons';

import { Input, Button, Card } from 'antd';

const containerStyle = {
  width: '500px',
  height: '500px',
};

function GymsMap() {
  const [center, setCenter] = useState({ lat: -34.9, lng: 100.0 });
  const [gym, setGym] = useState(null);

  const navigate = useNavigate();

  const [gyms, setGyms] = useState([
    { id: 1, name: 'oliver_room', geolocation: { lat: -33.928, lng: 151.15 } },
    { id: 1, name: 'jay_room', geolocation: { lat: -33.828, lng: 151.15 } },
  ]);

  const handleMarkerClick = (detail) => {
    setGym(detail);
  };

  const showGymCard = () => {
    if (gym) {
      return (
        <OverlayView
          position={gym.geolocation}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <Card
            size="small"
            title={gym.name}
            extra={
              <CloseOutlined
                onClick={() => {
                  setGym(null);
                }}
              ></CloseOutlined>
            }
            style={{
              background: 'white',
              border: '1px solid #ccc',
              padding: 15,
            }}
          >
            <p> trading hours :OverlayView</p>

            <a href={'/gyms/gym/' + gym.id}>more</a>
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
        console.log(newCenter);
        setCenter(newCenter);
      });
    }
  }, []);

  return (
    <>
      <Wrapper apiKey="AIzaSyAiK11DnRIczBDNY3YzLDIKp3JpLk8C8tE">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {/* Child components, such as markers, info windows, etc. */}
          {gyms.map((each) => (
            <Marker
              position={each.geolocation}
              clickable={true}
              onClick={() => {
                handleMarkerClick(each);
              }}
            ></Marker>
          ))}
          {showGymCard()}
          <></>
        </GoogleMap>
      </Wrapper>
    </>
  );
}
export default GymsMap;
