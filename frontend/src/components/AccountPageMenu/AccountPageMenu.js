import { Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../services/sessionStorage';
import { getItem } from '../../utils/antdHandlers';
import {
  SolutionOutlined,
  UserOutlined,
  KeyOutlined,
  CalendarOutlined,
  UserSwitchOutlined,
  AuditOutlined,
} from '@ant-design/icons';

const userItems = [
  getItem('Profile', 'profile', <UserOutlined />),
  getItem('Change Password', 'change-password', <KeyOutlined />),
  getItem('Appointments', 'appointments', <CalendarOutlined />),
  getItem('Gym Owner Portal', 'gymOwner', <SolutionOutlined />, [
    getItem('Gyms ', 'gyms'),
    getItem('Gyms Appointments', 'gymsAppointments'),
  ]),
];

const adminItems = [
  getItem('User Management', 'userManagement', <UserSwitchOutlined />),
  getItem('Gym requests', 'gymRequests', <AuditOutlined />),
];
/*[
    getItem('Profile', 'profile'),
    getItem('Change Password', 'change-password'),
    getItem('Appointments', 'appointments'),
    getItem('Gym owner', 'gym-owner'),
    getItem('Log out', 'logout'),
  ]*/
const AccountPageMenu = () => {
  const isUser = true;
  const [items, setItems] = useState(isUser ? userItems : adminItems);
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log(e.keyPath);
    navigate(e.keyPath.reverse().join('/'));
  };

  return (
    <Menu
      theme="dark"
      id="accountPage__sider__menu"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      onClick={onClick}
      items={items}
    />
  );
};
export default AccountPageMenu;
