import React from "react";
import { Button, Col, Layout, Row } from "antd";
import { useParams } from "react-router-dom";
import SingleGymView from "../../components/AdminTable/SingleGymView/SingleGymView";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  handleActionToApproveApplication,
  handleActionToDisapproveApplication,
} from "../../state/gyms/gyms.action";

function GymRequestPage() {
  const { gym_id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleApprove = () => {
    
    const ApproveApp = async () => {
      await dispatch(handleActionToApproveApplication(gym_id));
    };

    ApproveApp();
    navigate("/admin/gymRequests");
  };

  const handleDisapprove = () => {
    
    const DisapproveApp = async () => {
      await dispatch(handleActionToDisapproveApplication(gym_id));
    };

    DisapproveApp();
    navigate("/admin/gymRequests");
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
