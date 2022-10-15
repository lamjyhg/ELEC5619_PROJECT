import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { clearSessionStorage, getToken } from '../../services/sessionStorage';
const LogoutButton = ({ buttonClassName }) => {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const logout = () => {
    setIsModalVisible(false);
    navigate('/logout');
  };

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
