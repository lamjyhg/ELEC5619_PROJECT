import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  handleActionToGetGyms,
  handleActionToGetNearbyGyms,
} from '../../state/gyms/gyms.action';
import { Input, Button, Row } from 'antd';
import GymsMap from '../../components/GymsMap/GymsMap';
import { Content } from 'antd/lib/layout/layout';
import './GymsPage.scss';
const GymsPage = () => {
  const { gymsList, isError, isLoading, isSuccess } = useSelector((state) => {
    return state.gyms.gymsPage;
  });

  const [isShowingList, setIsShowingList] = useState(true);
  const [currentGeoLocation, setCurrentGeoLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    var newCenter = currentGeoLocation;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        newCenter = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
        };
        console.log(newCenter);
        setCurrentGeoLocation(newCenter);
      });
    }

    //getGyms by current center location
    const handleGetGyms = async () => {
      console.log(newCenter.lat, newCenter.lng);
      await dispatch(
        handleActionToGetNearbyGyms({ lat: newCenter.lat, lng: newCenter.lng })
      );
    };

    handleGetGyms();
  }, []);

  return (
    <Content className="gymsPage">
      <Input.Search
        allowClear
        style={{
          width: '40%',
        }}
        id="gymsPage__search"
        placeholder="search gyms by name"
      />
      <Row className="gymsPage__buttonsHeader">
        <Button
          size="large"
          onClick={() => {
            setIsShowingList(true);
          }}
        >
          List View
        </Button>
        <Button
          size="large"
          onClick={() => {
            setIsShowingList(false);
          }}
        >
          Map View
        </Button>
      </Row>

      <>
        {isShowingList ? (
          <h1>把component 放这， 美女：）</h1>
        ) : (
          <GymsMap
            currentLatitude={currentGeoLocation.lat}
            currentLongitude={currentGeoLocation.lng}
          ></GymsMap>
        )}
      </>
    </Content>
  );
};
export default GymsPage;
