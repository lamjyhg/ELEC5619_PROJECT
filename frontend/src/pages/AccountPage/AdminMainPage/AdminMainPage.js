import Lottie from 'lottie-react';
import adminMain from './../../../image/lotties/adminMain.json';
import './AdminMainPage.scss';

const AdminMainPage = () => {
  return (
    <div className="adminMainPage">
      <Lottie animationData={adminMain} />
      <h1> welcome back</h1>
    </div>
  );
};
export default AdminMainPage;
