import React from 'react';
import { Layout } from 'antd';
import "./GymRequestsPage.scss"
import { RequestTable } from '../../components/AdminTable';

const { Content} = Layout;


function GymRequestsPage() {
  return(
    <Layout>
      <Layout className="header">
        <h2>Gym Request Page</h2>  
      </Layout>
      <Content className="content">
          <RequestTable />
      </Content>
    </Layout>
  );
}
export default GymRequestsPage;
