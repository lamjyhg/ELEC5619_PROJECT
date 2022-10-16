import {
  Button,
  Col,
  Input,
  notification,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleRequestToUpdateRole } from '../../services/admin';
const { Text } = Typography;

const EditUserBody = ({ user }) => {
  const navigate = useNavigate();
  const [newType, setNewType] = useState('');

  useEffect(() => {
    if (user != null) {
      setNewType(user.type);
    }
  }, [user]);

  if (user == null) {
    navigate('/error');
    return;
  }

  const { id, email, username } = user;

  const handleSave = async () => {
    const userInput = {
      role: newType,
      email: email,
    };

    notification.destroy();
    try {
      await handleRequestToUpdateRole(userInput);
      notification['success']({
        message: 'Success',
        description: 'Update user successfully ',
      });
      navigate('/admin/userManagement');
    } catch (error) {
      notification['error']({
        message: 'Error',
        description: 'Update user failed, please try again',
      });
    }
  };
  const handleChange = (value) => {
    setNewType(value);
  };

  return (
    <section className="page-editUser">
      <h2>Edit User</h2>
      <Content className="content">
        <Space direction="vertical" size={20}>
          <Input key={id} addonBefore="ID" defaultValue={id} disabled={true} />
          <Input
            key={email}
            addonBefore="Email"
            defaultValue={email}
            disabled={true}
          />
          <Input
            key={username}
            addonBefore="Username"
            defaultValue={username}
            disabled={true}
          />
          <Row className="row-editUserRow">
            <Col className="row-editUserRow_text">
              <Text strong level={2}>
                Role:
              </Text>
            </Col>
            <Col>
              <Select
                key={newType}
                value={newType}
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Select.Option value="USER">User</Select.Option>
                <Select.Option value="OWNER">Owner</Select.Option>
                <Select.Option value="ADMIN">Admin</Select.Option>
              </Select>
            </Col>
          </Row>

          <Row align={'center'} className="buttons-editUser">
            <Button
              type="primary"
              className="buttons-editUser_button"
              onClick={() => handleSave()}
            >
              Save
            </Button>
            <Button
              type="primary"
              className="buttons-editUser_button"
              onClick={() => navigate('/admin/userManagement')}
            >
              Cancel
            </Button>
          </Row>
        </Space>
      </Content>
    </section>
  );
};

export default EditUserBody;
