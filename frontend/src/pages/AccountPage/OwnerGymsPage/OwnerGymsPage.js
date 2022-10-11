import { Button, Input, notification, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GymForm from '../../../components/GymForm/GymForm';
import OwnerGymCardList from '../../../components/OwnerGymCardList/OwnerGymCardList';
import { POST, PUT } from '../../../constants/requests';
import { handleRequestToCreateGym } from '../../../services/gyms';
import {
  handleActionToCreateGym,
  handleActionToGetOwnerGyms,
  handleActionToUpdateGym,
} from '../../../state/gyms/gyms.action';
import './OwnerGymsPage.scss';
const { TextArea } = Input;

const OwnerGymsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gym, setGym] = useState(null);
  const { gymsList, isSuccess, isLoading, isError, requestType } = useSelector(
    (state) => state.gyms.ownerGymsPage
  );
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const setGymNull = () => {
    setGym(null);
  };

  const onCreate = async (values) => {
    console.log(values);
    setIsModalOpen(false);
    if (gym) {
      await dispatch(
        handleActionToUpdateGym({
          gymId: gym.id,
          body: values,
        })
      );
    } else {
      await dispatch(handleActionToCreateGym(values));
    }
    setGymNull();
  };

  const swicthToEditGym = (gym) => {
    setGym(gym);
    setIsModalOpen(true);
  };

  const getOwnerGyms = async () => {
    await dispatch(handleActionToGetOwnerGyms());
  };

  useEffect(() => {
    getOwnerGyms();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      switch (requestType) {
        case PUT:
          notification.destroy();
          notification['success']({
            message: 'Success',
            description: 'Update successfully ',
          });
          break;
        case POST:
          notification.destroy();
          notification['success']({
            message: 'Success',
            description: 'Create successfully ',
          });
          break;
        default:
      }
    }

    if (isError) {
      switch (requestType) {
        case PUT:
          notification.destroy();
          notification['error']({
            message: 'Success',
            description: 'Update failed ',
          });
          break;
        case POST:
          notification.destroy();
          notification['error']({
            message: 'Success',
            description: 'Create failed ',
          });
          break;
        default:
      }
    }
  }, [isError, isSuccess]);

  return (
    <Spin spinning={isLoading}>
      <div className="gym_list_contianer">
        <Button type="primary" onClick={showModal}>
          Create gym
        </Button>
        <GymForm
          setGymNull={setGymNull}
          open={isModalOpen}
          onCreate={onCreate}
          gym={gym}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        />
        <OwnerGymCardList
          gymsList={gymsList}
          swicthToEditGym={swicthToEditGym}
        ></OwnerGymCardList>
      </div>
    </Spin>
  );
};
export default OwnerGymsPage;
