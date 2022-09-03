import { Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../services/sessionStorage';
import { getItem } from '../../utils/antdHandlers';

const userItems = [
  getItem('Profile', 'profile'),
  getItem('Change Password', 'change-password'),
  getItem('Appointments', 'appointments'),
  getItem('Gym Owner Portal', 'gymOwner', null, [
    getItem('Gyms ', 'gyms'),
    getItem('Gyms Appointments', 'gymsAppointments'),
  ]),
];

const adminItems = [
  getItem('User Management', 'userManagement'),
  getItem('Gym requests', 'gymRequests'),
];
/*[
    getItem('Profile', 'profile'),
    getItem('Change Password', 'change-password'),
    getItem('Appointments', 'appointments'),
    getItem('Gym owner', 'gym-owner'),
    getItem('Log out', 'logout'),
  ]*/
const AccountPageMenu = () => {
  const [items, setItems] = useState(userItems);
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(e.keyPath.reverse().join('/'));
  };

  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      onClick={onClick}
      items={items}
    />
  );
};
export default AccountPageMenu;
