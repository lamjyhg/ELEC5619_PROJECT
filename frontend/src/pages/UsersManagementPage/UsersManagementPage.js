import React from 'react';
import { Layout } from 'antd';
import './UserManagementPage.scss';
import UserTable from '../../components/UserTable/UserTable';

function UserManagementPage() {
  return (
    <section className="page-userManagement">
      <h2>Users Table</h2>
      <UserTable />
    </section>
  );
}
export default UserManagementPage;
