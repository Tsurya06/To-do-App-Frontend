import { ConfigProvider, Layout, Menu, MenuProps, Row, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CarryOutOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import Main from "../layout/Main";
import Router from "../../routes/Router";
import { useAppSelector } from "../../store/store";
import PencilLoader from "../../util/PencilLoader";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  additionalProps?: React.HTMLAttributes<HTMLElement>
): MenuItem {
  return { key, icon, children, label, ...additionalProps } as MenuItem;
}

export default function Sidebar() {
  const [currentKey] = useState<string>("dashboard");
  const navigate = useNavigate();
  const userState = useAppSelector((state) => state.authReducer);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: MenuItem[] = [
    getItem(
      "Tasks",
      "tasks",
      <CarryOutOutlined />,
      [
        getItem(
          "Add Task",
          "add-task",
          <CarryOutOutlined />
        ),
        getItem(
          "All Tasks",
          "all-tasks",
          <OrderedListOutlined />
        ),
      ]
    ),
    getItem(
      "Projects",
      "projects",
      <CarryOutOutlined />,
      [
        getItem(
          "Add Project",
          "add-project",
          <CarryOutOutlined />
        ),
        getItem(
          "All Projects",
          "all-projects",
          <OrderedListOutlined />
        ),
      ]
    ),
    getItem(
      "Users",
      "users",
      <OrderedListOutlined />,
      [
        getItem("Add User", "add-user", <CarryOutOutlined />),
        getItem("All Users", "all-users", <OrderedListOutlined />),
      ]
    ),
    getItem(
      "Notifications",
      "notifications",
      <OrderedListOutlined />,
      []
    ),
  ];
  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case "add-task":
        navigate("/tasks/add");
        break;
      case "all-tasks":
        navigate("/tasks/all");
        break;
      case "add-project":
        navigate("/projects/add");
        break;
      case "all-projects":
        navigate("/projects/all");
        break;
      case "add-user":
        navigate("/users/add");
        break;
      case "all-users":
        navigate("/users/all");
        break;
      case "notifications":
        navigate("/notifications");
        break;
      default:
        navigate("/notfound");
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "white",
        },
        components: {
          Layout: {},
          Menu: {
            colorPrimary: "black",
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
          style={{ backgroundColor: "ButtonHighlight" }}
        >
          <Menu
            theme="light"
            onClick={handleMenuClick}
            selectedKeys={[currentKey]}
            mode="inline"
            items={items}
            style={{ backgroundColor: "white", color: "black" }}
          />
          <div
            className="custom-trigger"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Row
              justify={"center"}
              align={"bottom"}
              style={{ backgroundColor: "ButtonHighlight" }}
            >
              {collapsed ? (
                <MenuFoldOutlined style={{ fontSize: "25px" }} />
              ) : (
                <MenuUnfoldOutlined style={{ fontSize: "25px" }} />
              )}
            </Row>
          </div>
        </Sider>

        <div className="content-outer-div">
          <Content
            style={{
              margin: "1rem 1rem",
              boxShadow: " 0px 2px 12px 0px rgba(0, 0, 0, 0.06)",
            }}
          >
            {userState.loading ? (
              <PencilLoader />
            ) : (
              <div
                style={{
                  padding: "1rem 1rem",
                  minHeight: "calc(100vh - 3.5rem - 2rem)",
                  background: colorBgContainer,
                }}
              >
                <Main>
                  <Router />
                </Main>
              </div>
            )}
          </Content>
        </div>
      </Layout>
    </ConfigProvider>
  );
}
