import { Menu } from 'antd';
import { useState } from 'react';
import { getToken } from '../../services/sessionStorage';
import { getItem } from '../../utils/antdMenuHandler';

const userItems = [
  getItem('Profile', 'gyms'),
  getItem('Gym', 'accounts'),
  getItem('Course', 'accounts'),
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
  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default AccountPageMenu;
