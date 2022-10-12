import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";
import { googleMapApiKey } from "../../../../services/googleMaps";

const mapStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
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
