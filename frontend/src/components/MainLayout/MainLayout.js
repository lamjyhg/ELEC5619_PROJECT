import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const MainLayout = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
};
export default MainLayout;
