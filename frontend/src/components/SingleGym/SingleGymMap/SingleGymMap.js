import { GoogleMap, MarkerF } from '@react-google-maps/api';

const mapStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
};

const SingleGymMap = ({ geoLocation, gymsList }) => {
  return (
    <div className="gymsMap">
      <GoogleMap mapContainerStyle={mapStyle} zoom={12} center={geoLocation}>
        {gymsList.map((each, index) => {
          return (
            <MarkerF
              key={index}
              position={each.geoLocation}
              clickable={true}
            ></MarkerF>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default SingleGymMap;
