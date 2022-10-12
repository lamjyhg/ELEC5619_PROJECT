import { Button } from 'antd';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import ownerMain from '../../../image/lotties/gymOwner.json';
import './GymOwnerMainPage.scss';

const GymOwnerMainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="adminMainPage">
      <Lottie animationData={ownerMain} />
      <h1> Navigate to your</h1>
      <div className="adminMainPage_buttons">
        <Button
          type="primary"
          shape="round"
          onClick={() => {
            navigate('/account/gymOwner/gyms');
          }}
        >
          Gyms
        </Button>
        <Button
          type="primary"
          shape="round"
          onClick={() => {
            navigate('/account/gymOwner/gymsAppointments');
          }}
        >
          Gyms' Appointments
        </Button>
      </div>
    </div>
  );
};
export default GymOwnerMainPage;
