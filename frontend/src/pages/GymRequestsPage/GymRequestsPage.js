import React from 'react';
import { Layout } from 'antd';
import './GymRequestsPage.scss';
import GymRequestsTable from '../../components/GymRequestsTable/GymRequestsTable';

const { Content } = Layout;

function GymRequestsPage() {
  return (
    <section className="page-gymRequests">
      <h2>Gym Request Page</h2>
      <GymRequestsTable />
    </section>
  );
}
export default GymRequestsPage;
