import { Button, Layout } from 'antd';
import { Header, Footer } from 'antd/lib/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';
import AccountPageMenu from '../../components/AccountPageMenu/AccountPageMenu';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import './AccountPage.scss';
const { Sider, Content } = Layout;
const AccountPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Layout>
        <Sider>
          <AccountPageMenu></AccountPageMenu>
        </Sider>
        <Layout>
          <Header className="accountPage__header">
            <LogoutButton buttonClassName="accountPage__header__logoutButton"></LogoutButton>
          </Header>
          <Content className="accountPage__content">
            {' '}
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
export default AccountPage;
