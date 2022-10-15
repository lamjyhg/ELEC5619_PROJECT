import React from "react";
import {Button, Col, Layout, notification, Row} from "antd";
import { useParams } from "react-router-dom";
import SingleGymView from "../../components/AdminTable/SingleGymView/SingleGymView";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  handleActionToApproveApplication,
  handleActionToDisapproveApplication,
} from "../../state/gyms/gyms.action";
import {loginService} from "../../services/auth";
import {setAdminAuthorityToken} from "../../services/sessionStorage";
import {handleRequestToApproveApplication, handleRequestToDisapproveApplication} from "../../services/gyms";

function GymRequestPage() {
  const { gym_id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { status, isSuccess, isLoading, isError } = useSelector(
      (state) => state.gyms.approveStatus
  );

  const handleApprove = async() => {
    try {
      notification.destroy();

      const result = await handleRequestToApproveApplication(gym_id);
      if(result && result.request.status == 200){
        notification['success']({
          message: 'Approve Success',
        });
        navigate("/admin/gymRequests");
      }
      else{
        notification['failed']({
          message: 'Approve failed',
          description: 'Server responded with an error code',
        });
      }
    } catch (error) {
      notification.destroy();
      notification['failed']({
        message: 'Approve failed',
        description: error.message,
      });
    }

  };

  const handleDisapprove = async() => {
    try {
      notification.destroy();

      const result = await handleRequestToDisapproveApplication(gym_id);
      if(result && result.request.status == 200){
        notification['success']({
          message: 'Disapprove Success',
        });
        navigate("/admin/gymRequests");
      }
      else{
        notification['failed']({
          message: 'Disapprove failed',
          description: 'Server responded with an error code',
        });
      }
    } catch (error) {
      notification.destroy();
      notification['failed']({
        message: 'Approve failed',
        description: error.message,
      });
    }

  };

  return (
    <Layout>
      <Row align={"center"}>
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
          <Button type="primary" onClick={() => navigate("/admin/gymRequests")}>
            Cancel
          </Button>
        </Col>
      </Row>

      <SingleGymView GID={gym_id} />
    </Layout>
  );
}
export default GymRequestPage;
