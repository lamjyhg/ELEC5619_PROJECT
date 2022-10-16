import React, { useEffect } from 'react';
import { Button, Col, Layout, notification, Row, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './GymRequestPage.scss';
import { handleActionToGetSingleGym } from '../../state/gyms/singleGym.action';
import {
  handleRequestToApproveApplication,
  handleRequestToDisapproveApplication,
} from '../../services/gyms';
import { handleActionToGetAllGymApplication } from '../../state/gyms/gyms.action';
import GymRequestBody from '../../components/GymRequestBody/GymRequestBody';
const GymBody = ({ gym, handleApprove, handleDisapprove }) => {
  const navigate = useNavigate();

  if (!gym) {
    navigate('/error');
    return;
  }
  if (gym.gymStatus) {
    return (
      <>
        <div className="gymRequestHeader">
          <div className="buttons-gymRequest">
            <Button
              type="primary"
              onClick={() => handleApprove()}
              className="buttons-gymRequest_button"
            >
              Approve
            </Button>
            <Button
              type="primary"
              onClick={() => handleDisapprove()}
              className="buttons-gymRequest_button"
            >
              Disapprove
            </Button>
            <Button
              type="primary"
              onClick={() => navigate('/admin/gymRequests')}
              className="buttons-gymRequest_button"
            >
              Cancel
            </Button>
          </div>
        </div>
        <GymRequestBody gym={gym} GID={gym.id} />
      </>
    );
  } else {
    return (
      <>
        <div className="gymRequestHeader">
          <p>This gym has been published</p>
        </div>
        <GymRequestBody gym={gym} GID={gym.id} />
      </>
    );
  }
};

function GymRequestPage() {
  const { gym_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gym, isSuccess, isLoading, isError } = useSelector(
    (state) => state.singleGym.singleGym
  );

  const handleApprove = async () => {
    notification.destroy();
    try {
      await handleRequestToApproveApplication(gym_id);
      notification['success']({
        message: 'Approve Success',
      });
      navigate('/admin/gymRequests');
    } catch (error) {
      notification['failed']({
        message: 'Approve failed',
        description: error.message,
      });
    }
  };

  const handleDisapprove = async () => {
    notification.destroy();
    try {
      await handleRequestToDisapproveApplication(gym_id);
      notification['success']({
        message: 'Disapprove Success',
      });
      navigate('/admin/gymRequests');
    } catch (error) {
      notification['failed']({
        message: 'Disapprove failed',
        description: error.message,
      });
    }
  };

  useEffect(() => {
    const handleGetGym = async (GID) => {
      await dispatch(handleActionToGetSingleGym(GID));
    };
    handleGetGym(gym_id);
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Spin></Spin>
      ) : (
        <GymBody
          gym={gym}
          handleApprove={handleApprove}
          handleDisapprove={handleDisapprove}
        ></GymBody>
      )}
    </Layout>
  );
}
export default GymRequestPage;
