import { useNavigate } from 'react-router';
import {
  clearSessionStorage,
  getToken,
  removeAdminAuthorityToken,
  removeToken,
} from '../../services/sessionStorage';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
const LogoutButton = ({ buttonClassName }) => {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const logout = () => {
    setIsModalVisible(false);
    clearSessionStorage();
    navigate('/login');
    removeAdminAuthorityToken();
  };

  useEffect(() => {
    if (!getToken()) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={() => {
          logout();
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <p>Are you sure to log out?</p>
      </Modal>
      <Button
        className={buttonClassName}
        type="primary"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        LOG OUT
      </Button>
    </>
  );
};
export default LogoutButton;
