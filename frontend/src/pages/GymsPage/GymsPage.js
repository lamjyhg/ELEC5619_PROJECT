import { Button, Row } from "antd";
import Search from "antd/lib/input/Search";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import GymCardList from "../../components/GymCardList/GymCardList";
import GymsMap from "../../components/GymsMap/GymsMap";
import {
  handleActionToGetGymsBySearchWord,
  handleActionToGetNearbyGyms,
} from "../../state/gyms/gyms.action";
import "./GymsPage.scss";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const GymsPage = () => {
  let query = useQuery();
  console.log(query.get("searchWord"));

  const [isSearching, setIsSearching] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  const [isShowingList, setIsShowingList] = useState(true);
  const [currentGeoLocation, setCurrentGeoLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const dispatch = useDispatch();

  const { gymsList, isError, isLoading, isSuccess } = useSelector((state) => {
    return state.gyms.gymsPage;
  });

  const handleSearchWordOnchange = (evt) => {
    setSearchWord(evt.target.value);
  };

  const handleOnSearch = async () => {
    console.log(1111666666);
    navigate("/gyms?searchWord=" + searchWord);
  };

  useEffect(() => {
    var newCenter = currentGeoLocation;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        newCenter = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
        };
        setCurrentGeoLocation(newCenter);
      });
    }

    //getGyms by current center location
    const handleGetGyms = async () => {
      await dispatch(
        handleActionToGetNearbyGyms({ lat: newCenter.lat, lng: newCenter.lng })
      );
    };

    if (query.get("searchWord") === null) {
      console.log(111);
      handleGetGyms();
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      await dispatch(handleActionToGetGymsBySearchWord(searchWord));
    };

    console.log("in effect the query body is ");
    console.log(query);
    if (query.get("searchWord") !== null) {
      console.log(111111);
      handleSearch();
      setIsSearching(true);
    }
  }, [query.get("searchWord")]);

  if (isSuccess) {
    console.log("Success and the the gymLIst is ");
    console.log(gymsList);
  }
  return (
    <Content className="gymsPage">
      <Search
        style={{
          width: "40%",
        }}
        value={searchWord}
        onSearch={handleOnSearch}
        onChange={handleSearchWordOnchange}
        id="gymsPage__search"
        placeholder="search gyms by name"
      />
      {isSearching ? null : (
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
      )}

      {isSearching ? (
        <GymCardList></GymCardList>
      ) : (
        <>
          <h1>Nearby Gyms</h1>
          {isShowingList ? (
            <GymCardList />
          ) : (
            <GymsMap
              currentLatitude={currentGeoLocation.lat}
              currentLongitude={currentGeoLocation.lng}
            ></GymsMap>
          )}
        </>
      )}
    </Content>
  );
};
export default GymsPage;
