import {Layout, Input, Space, Select, Button, Col, Row, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {handleActionToGetUser, handleActionToUpdateRole} from "../../state/user/user.action";
import {useNavigate} from "react-router-dom";

const { Content} = Layout;
const { Text} = Typography
const { Option } = Select;


function UserEditPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, isSuccess, isLoading, isError } = useSelector(
        (state) => state.user.user
    );
    const { id } = useParams();
    const [newType, setType]= useState("");

    let userID = "";
    let email = "";
    let username = "";
    let name = "";
    let password = "";
    let type = "";

    if(isSuccess){
        userID = users.id;
        email = users.email;
        username = users.username;
        name = users.name;
        password = users.password;
        type = users.type;

    }
    useEffect( () => {
        const getUser = async () => {
            await dispatch(handleActionToGetUser(id));
        }

        getUser();
    }, [])

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        type = value;
        setType(value);
    };
    const handleSave = () => {
        console.log("new role is " + newType);
        console.log("email is " + email);
        const userInput = {
            role: type,
            email: email,
        }
        const updateRole = async () => {
            await dispatch(handleActionToUpdateRole(userInput));
        }

        updateRole();
        //navigate("/admin/userManagement");
    }

    return(
        <Layout>
            <Layout className="header">
                <h2>Edit User</h2>
            </Layout>
            <Content className="content">
                <Space direction="vertical">
                    <Input key={userID} addonBefore="ID" defaultValue={userID} disabled={true}/>
                    <Input key={email} addonBefore="Email" defaultValue={email} disabled={true}/>
                    <Input key={username} addonBefore="Username" defaultValue={username} disabled={true}/>
                    <Input key={password} addonBefore="Password" defaultValue={password} disabled={true}/>
                    {/*
                    <Select
                        key={type}
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={[type]}
                        onChange={handleChange}
                    >
                        {typeList}
                    </Select>
                    */}
                    <Row align={"center"}>
                        <Col className="gutter-row" span={3}>
                            <Text strong level={2} align={"center"}>Role</Text>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Select key={type} defaultValue={type} style={{ width: 120 }} onChange={handleChange}>
                                <Option value="user">User</Option>
                                <Option value="owner">Owner</Option>
                                <Option value="admin">Admin</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row align={"center"}>
                        <Col className="gutter-row" span={6}>
                            <Button type="primary" onClick={() => handleSave()}>Save</Button>
                        </Col>
                        <Col className="gutter-row" span={6} offset={4}>
                            <Button type="primary" onClick={() => navigate("/admin/userManagement")}>Cancel</Button>
                        </Col>
                    </Row>

                </Space>
            </Content>
        </Layout>
    );
}
export default UserEditPage;
