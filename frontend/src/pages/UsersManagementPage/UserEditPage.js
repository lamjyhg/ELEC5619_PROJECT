import {Layout, Input, Space, Select, Button} from "antd";
import React, {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {handleActionToGetUser} from "../../state/user/user.action";
import {useNavigate} from "react-router-dom";
const { Content} = Layout;

function UserEditPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;

    const { users, isSuccess, isLoading, isError } = useSelector(
        (state) => state.user.user
    );
    const { id } = useParams();
    const typeList = [<Option key={0}>{'user'}</Option>, <Option key={1}>{"owner"}</Option>, <Option key={2}>{"admin"}</Option>];

    console.log("id is" + id);
    if(isSuccess){
        console.log("user is" + JSON.stringify(users.id));
    }

    console.log("isSuccess is " + isSuccess);
    console.log("isLoading is " + isLoading);
    console.log("isError  is " + isError);

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
            const selectedUser = {
                email: JSON.stringify(id),
            }
            await dispatch(handleActionToGetUser(id));
        }

        getUser();
    }, [])

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const handleSave = () => {
        navigate("/admin/userManagement");
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
                    <Button type="primary" onClick={() => handleSave()}>Save</Button>
                </Space>
            </Content>
        </Layout>
    );
}
export default UserEditPage;
