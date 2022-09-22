import { Button, Layout } from 'antd';
import { Header, Footer } from 'antd/lib/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';
import AccountPageMenu from '../../components/AccountPageMenu/AccountPageMenu';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import './AccountPage.scss';
import logo from './../../image/gymmy.png';
import {
  MenuFoldOutlined,
  CloseOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
const { Sider, Content } = Layout;
const AccountPage = () => {
  const navigate = useNavigate();

  const [disPlaySiderBar, setDisPlaySiderBar] = useState(false);

  return (
    <Layout>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={disPlaySiderBar}
          id="accountPage__siderBar"
        >
          <img
            src={logo}
            alt="logo"
            className="accountPage__siderBar__logo"
            onClick={() => {
              navigate('/');
            }}
          ></img>
          <AccountPageMenu></AccountPageMenu>
        </Sider>
        <Layout>
          <Header className="accountPage__header">
            <Button
              className="accountPage__header__menuButton"
              type="primary"
              icon={
                disPlaySiderBar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              }
              onClick={() => {
                setDisPlaySiderBar(!disPlaySiderBar);
              }}
            />
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

// import { Button, Layout } from 'antd';
// import { Header, Footer } from 'antd/lib/layout/layout';
// import { Outlet, useNavigate } from 'react-router-dom';
// import AccountPageMenu from '../../components/AccountPageMenu/AccountPageMenu';
// import LogoutButton from '../../components/LogoutButton/LogoutButton';
// import './AccountPage.scss';
// import logo from './../../image/gymmy.png';
// import { MenuFoldOutlined, CloseOutlined } from '@ant-design/icons';
// import { useEffect, useState } from 'react';
// const { Sider, Content } = Layout;
// const AccountPage = () => {
//   const navigate = useNavigate();
//   const [disPlaySiderBar, setDisPlaySiderBar] = useState(false);

//   if (window.innerWidth > 800) {
//     console.log(111);
//   }
//   useEffect(() => {
//     console.log(1111);
//   }, [window.screen.width]);

//   var siderBarClassName = disPlaySiderBar
//     ? 'accountPage__top__siderBar accountPage__top__siderBar--shown'
//     : 'accountPage__top__siderBar accountPage__top__siderBar--hidden';

//   return (
//     <div className="accountPage">
//       <div className="accountPage__top">
//         <div className={siderBarClassName}>
//           <CloseOutlined
//             className="accountPage__top__siderBar__closeButton"
//             onClick={() => {
//               setDisPlaySiderBar(false);
//             }}
//           />
//           <img
//             src={logo}
//             alt="logo"
//             className="accountPage__top__siderBar__logo"
//             onClick={() => {
//               navigate('/');
//             }}
//           ></img>
//           <AccountPageMenu></AccountPageMenu>
//         </div>
//         <div className="accountPage__top__right">
//           <header className="accountPage__top__right__header">
//             <Button
//               className="accountPage__top__right__header__menuButton"
//               type="primary"
//               icon={<MenuFoldOutlined />}
//               onClick={() => {
//                 setDisPlaySiderBar(!disPlaySiderBar);
//               }}
//             />
//             <LogoutButton buttonClassName="accountPage__top__right__header__logoutButton"></LogoutButton>
//           </header>
//           <section className="accountPage__top__right__content">
//             {' '}
//             <Outlet></Outlet>
//           </section>
//         </div>
//       </div>
//       <footer>Footer</footer>
//     </div>
//   );
// };
// export default AccountPage;
