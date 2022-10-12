import React from "react";
import { Layout } from "antd";
import { UserTable } from "../../components/AdminTable";
import "./UserManagementPage.scss";

const { Content } = Layout;

function UserManagementPage() {
  return (
    <Layout>
      <Layout className="header">
        <h2>User Table</h2>
      </Layout>
      <Content className="content">
        <UserTable />
      </Content>
    </Layout>
  );
}
export default UserManagementPage;
