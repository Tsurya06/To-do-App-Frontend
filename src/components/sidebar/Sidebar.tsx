import { ConfigProvider, Layout, Menu, MenuProps, Row, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './Sidebar.css';
import Main from "../layout/Main";
import Router from "../../routes/Router";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  additionalProps?: React.HTMLAttributes<HTMLElement>
): MenuItem {
  return {key,icon,children,label,...additionalProps} as MenuItem;
}

export default function Sidebar (){
  const [currentKey, setCurrentKey] = useState<string>('dashboard');
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: MenuItem[] = [
    getItem('dashboard', 'dashboard', <CarryOutOutlined />),
  ];
  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      default:
        navigate('/notfound');
    }
  };

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: 'rgb(223,223,223)',
      },
      components: {
        Layout: {},
        Menu: {
          colorPrimary: 'black',
          // itemBorderRadius: 2,
        },
      },
    }}
  >
     <Layout hasSider>
        <Sider
          className="custom-sider"
          collapsible
          width="15vw"
          collapsed={collapsed}
          trigger={null}
          style={{ backgroundColor: 'white' }}
        >
          <Menu
            theme="light"
            className="custome-side-menu"
            onClick={handleMenuClick}
            selectedKeys={[currentKey]}
            mode="inline"
            items={items}
          />
          <div
            className="custom-trigger"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Row justify={'center'} align={'bottom'} style={{backgroundColor:'White'}}>
              {collapsed ? (
                <MenuFoldOutlined style={{ fontSize: '20px' }} />
              ) : (
                <MenuUnfoldOutlined style={{ fontSize: '20px' }} />
              )}
            </Row>
          </div>
        </Sider>
        <div className="content-outer-div">
          <Content
            style={{
              margin: '1rem 1rem',
              boxShadow: ' 0px 2px 12px 0px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div
              style={{
                padding: '1rem 1rem',
                minHeight: 'calc(100vh - 3.5rem - 2rem)',
                background: colorBgContainer,
              }}
            >
              {/* <Main>
                <Router/>
              </Main> */}
            </div>
          </Content>
        </div>
      </Layout>
    </ConfigProvider>
  );
};
