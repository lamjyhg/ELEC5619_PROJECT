import React, { useEffect } from 'react';
import { Button, Col, Layout, notification, Row, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import SingleGymView from '../../components/AdminTable/SingleGymView/SingleGymView';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './GymRequestPage.scss';
import { handleActionToGetSingleGym } from '../../state/gyms/singleGym.action';
import {
  handleRequestToApproveApplication,
  handleRequestToDisapproveApplication,
} from '../../services/gyms';

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
        <>
          {gym && gym.gymStatus === 'PRIVATE' ? (
            <div className="gymRequestHeader">
              <Row align={'center'}>
                <Col className="gutter-row" span={2}>
                  <Button type="primary" onClick={() => handleApprove()}>
                    Approve
                  </Button>
                </Col>
                <Col className="gutter-row" span={2}>
                  <Button type="primary" onClick={() => handleDisapprove()}>
                    Disapprove
                  </Button>
                </Col>
                <Col className="gutter-row" span={2}>
                  <Button
                    type="primary"
                    onClick={() => navigate('/admin/gymRequests')}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="gymRequestHeader">
              <p>This gym has been published</p>
            </div>
          )}
          <SingleGymView gym={gym} GID={gym_id} />
        </>
      )}
    </Layout>
  );
}
export default GymRequestPage;
