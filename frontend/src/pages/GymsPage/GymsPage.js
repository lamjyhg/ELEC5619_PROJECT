import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { handleActionToGetGyms } from '../../state/gyms/gyms.action';
import { Input, Button, Row } from 'antd';
import GymsMap from '../../components/GymsMap/GymsMap';
import { Content } from 'antd/lib/layout/layout';
import './GymsPage.scss';
const GymsPage = () => {
  const { gymsList, isError, isLoading, isSuccess } = useSelector((state) => {
    return state.gyms.gymsPage;
  });
  const [isShowingList, setIsShowingList] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetGyms = async () => {
      await dispatch(handleActionToGetGyms());
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
          <GymsMap></GymsMap>
        )}
      </>
    </Content>
  );
};
export default GymsPage;
