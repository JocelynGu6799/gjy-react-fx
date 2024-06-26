// src\layout\index.tsx
import React, { useState } from 'react';
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import AppHeader from '@/components/AppHeader';
import AppSider from '@/components/AppSider';
import { Outlet, useLocation } from "react-router-dom";
import AppBreadcrumb from './components/AppBreadcrumb';
import { useGjySelector } from '@/store/hooks';

const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];111

const GjyMainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
const whiteList=useGjySelector(state=>state.user.userInfo?.checkedKeys)
const {pathname}=useLocation();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
        <AppSider></AppSider>
        {/* 自己拆分的sider */}
      </Sider>
      {/* <AppSider></AppSider> */}
      <Layout>
        <AppHeader>

        </AppHeader>
        {/* 自己拆分的header */}
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}> */}
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
        <AppBreadcrumb></AppBreadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* 这里显示跳转的路由 */}
            {/* {
              whiteList?.includes(pathname)? <Outlet></Outlet>:"你小子没权限"
            } */}
           <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default GjyMainLayout;