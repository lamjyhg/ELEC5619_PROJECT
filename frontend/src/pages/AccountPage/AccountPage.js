import { Button, Layout } from 'antd';
import { Header, Footer } from 'antd/lib/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';
import AccountPageMenu from '../../components/AccountPageMenu/AccountPageMenu';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
const { Sider, Content } = Layout;
const AccountPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Sider>
          <AccountPageMenu></AccountPageMenu>
        </Sider>
        <Layout>
          <Header>
            <LogoutButton></LogoutButton>
          </Header>
          <Content>
            {' '}
            <Outlet></Outlet>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default AccountPage;
