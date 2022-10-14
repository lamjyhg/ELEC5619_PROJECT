import {
  Button,
  Col,
  Input,
  Layout,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleActionToGetUser,
  handleActionToUpdateRole,
} from "../../state/user/user.action";

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

function UserEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isSuccess, isLoading, isError } = useSelector(
    (state) => state.user.user
  );
  const { id } = useParams();
  const [newType, setType] = useState("");

  let userID = "";
  let email = "";
  let username = "";
  let name = "";
  let password = "";
  let type = "";

  if (isSuccess) {
    userID = users.id;
    email = users.email;
    username = users.username;
    name = users.name;
    password = users.password;
    type = users.type;
  }
  useEffect(() => {
    const getUser = async () => {
      await dispatch(handleActionToGetUser(id));
    };

    getUser();
  }, []);

  const handleChange = (value) => {
    
    type = value;
    setType(value);
  };
  const handleSave = () => {
    
    
    const userInput = {
      role: newType,
      email: email,
    };
    const updateRole = async () => {
      await dispatch(handleActionToUpdateRole(userInput));
    };

    updateRole();
    navigate("/admin/userManagement");
  };

  return (
    <Layout>
      <Layout className="header">
        <h2>Edit User</h2>
      </Layout>
      <Content className="content">
        <Space direction="vertical">
          <Input
            key={userID}
            addonBefore="ID"
            defaultValue={userID}
            disabled={true}
          />
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
          <Row align={"center"}>
            <Col className="gutter-row" span={3}>
              <Text strong level={2} align={"center"}>
                Role
              </Text>
            </Col>
            <Col className="gutter-row" span={6}>
              <Select
                key={type}
                defaultValue={type}
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="user">User</Option>
                <Option value="owner">Owner</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Col>
          </Row>

          <Row align={"center"}>
            <Col className="gutter-row" span={6}>
              <Button type="primary" onClick={() => handleSave()}>
                Save
              </Button>
            </Col>
            <Col className="gutter-row" span={6} offset={4}>
              <Button
                type="primary"
                onClick={() => navigate("/admin/userManagement")}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}
export default UserEditPage;
