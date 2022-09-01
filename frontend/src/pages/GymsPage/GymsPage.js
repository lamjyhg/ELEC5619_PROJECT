import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { handleActionToGetGyms } from '../../state/gyms/gyms.action';
import { Input } from 'antd';
const GymsPage = () => {
  const { gymsList, isError, isLoading, isSuccess } = useSelector((state) => {
    return state.gyms.gymsPage;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetGyms = async () => {
      await dispatch(handleActionToGetGyms());
    };
    handleGetGyms();
  }, []);

  return (
    <h1>
      <Input.Search
        allowClear
        style={{
          width: '40%',
        }}
        placeholder="search gyms by name"
      />
    </h1>
  );
};
export default GymsPage;
