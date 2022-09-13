import React from 'react';
import { Layout } from 'antd';
import Table from '../../components/UserManagementTable';
import "./UserManagementPage.scss"

const { Content} = Layout;


function UserManagementPage() {
  return(
    <Layout>
      <Layout className="header">
        <h2>User Table</h2>  
      </Layout>
      <Content className="content">
          <Table />
      </Content>
    </Layout>
  );
}
export default UserManagementPage;
