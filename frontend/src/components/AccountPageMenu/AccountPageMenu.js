import {
  AuditOutlined,
  CalendarOutlined,
  KeyOutlined,
  SolutionOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminAuthorityToken } from "../../services/sessionStorage";
import { getItem } from "../../utils/antdHandlers";

const userItems = [
  getItem("Profile", "profile", <UserOutlined />),
  getItem("Change Password", "change-password", <KeyOutlined />),
  getItem("Appointments", "appointments", <CalendarOutlined />),
  getItem("Gym Owner Portal", "gymOwner", <SolutionOutlined />, [
    getItem("Gyms ", "gyms"),
    getItem("Gyms Appointments", "gymsAppointments"),
  ]),
];

const adminItems = [
  getItem("User Management", "userManagement", <UserSwitchOutlined />),
  getItem("Gym requests", "gymRequests", <AuditOutlined />),
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
    navigate(e.keyPath.reverse().join("/"));
  };
  useEffect(() => {
    const adminAuthorityToken = getAdminAuthorityToken();
    if (adminAuthorityToken) {
      setItems(adminItems);
    }
  }, []);

  return (
    <Menu
      theme="dark"
      id="accountPage__sider__menu"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      onClick={onClick}
      items={items}
    />
  );
};
export default AccountPageMenu;
