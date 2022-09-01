import { Menu, Layout, Switch } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { getToken } from '../../services/sessionStorage';

const { Header, Footer, Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const usersItems = [
  getItem('Gyms', 'gyms'),
  getItem('', 'accounts', <UserOutlined />, [
    getItem('Profile', 'profile'),
    getItem('Change Password', 'change-password'),
    getItem('Appointments', 'appointments'),
    getItem('Gym owner', 'gym-owner'),
    getItem('Log out', 'logout'),
  ]),
];
const adminItems = [
  getItem('Users', 'users'),
  getItem('Gym Requests', 'gym-requests'),
];

const guestItems = [
  getItem('Gyms', 'gyms'),
  getItem('', 'login', <UserOutlined />),
];

const NavBar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [items, setItems] = useState(getToken() ? usersItems : guestItems);

  const onClick = (e) => {
    navigate(e.keyPath.reverse().join('/'));
  };

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <Header>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="horizontal"
        items={items}
      />
    </Header>
  );
};

export default NavBar;
