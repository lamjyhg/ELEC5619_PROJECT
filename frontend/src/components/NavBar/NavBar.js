import { Menu, Switch, Image, Modal, Button, Row, Col, Layout } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  Icon,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { clearSessionStorage, getToken } from '../../services/sessionStorage';
import { getItem } from '../../utils/antdHandlers';
import logo from '../../image/gymmy.png';
import './NavBar.scss';

const { Header, Footer, Sider, Content } = Layout;

const usersAccountItems = [
  getItem('', 'account', <UserOutlined id="navbar__links__account__logo" />, [
    getItem('Profile', 'profile'),
    getItem('Change Password', 'change-password'),
    getItem('Appointments', 'appointments'),
    getItem('Gym owner', 'gymOwner'),
    getItem('Log out', 'logout'),
  ]),
];
// const adminItems = [
//   getItem('Users', 'users'),
//   getItem('Gym Requests', 'gym-requests'),
// ];

const guestAccountItems = [
  getItem('', 'login', <UserOutlined id="navbar__container__account__logo" />),
];

const NavBar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [items, setItems] = useState(
    getToken() ? usersAccountItems : guestAccountItems
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onClick = (e) => {
    if (e.keyPath.reverse()[e.keyPath.length - 1] === 'logout') {
      setIsModalVisible(true);
      return;
    }
    navigate(e.keyPath.join('/'));
  };

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const logout = () => {
    setIsModalVisible(false);
    clearSessionStorage();
    navigate('/login');
  };

  return (
    <Header id="navbar">
      <Modal
        visible={isModalVisible}
        onOk={logout}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <p>Are you sure to log out?</p>
      </Modal>
      <div className="navbar__container">
        <div className="navbar__container__left">
          <img
            src={logo}
            alt="logo"
            className="navbar__container__left__logo"
            onClick={() => {
              navigate('/');
            }}
          />
          <Button
            type="link"
            theme="dark"
            id="navbar__container__left__link"
            onClick={() => {
              navigate('/gyms');
            }}
            size="large"
          >
            Gyms
          </Button>
        </div>
        <Menu
          id="navbar__container__account"
          onClick={onClick}
          mode="horizontal"
          items={items}
        />
      </div>
    </Header>
  );
};

export default NavBar;
