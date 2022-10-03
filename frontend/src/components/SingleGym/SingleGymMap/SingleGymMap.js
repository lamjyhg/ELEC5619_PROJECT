import React, { useState, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api';
import { googleMapApiKey } from '../../../services/googleMaps';

const mapStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
};

const SingleGymMap = ({ geoLocation }) => {
  return (
    <div className="gymsMap">
      <Wrapper apiKey={googleMapApiKey}>
        <GoogleMap mapContainerStyle={mapStyle} center={geoLocation} zoom={12}>
          <Marker position={geoLocation}></Marker>
        </GoogleMap>
      </Wrapper>
    </div>
  );
};

export default SingleGymMap;
