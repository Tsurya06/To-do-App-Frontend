import { Layout, Menu, Row, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Router } from "react-router-dom";
import { TodoApp } from "../../pages/todo/Todo";

interface FormData {
  username: string;
  email: string;
  message: string;
}

export const Sidebar: React.FC = () => {
  const [currentKey, setCurrentKey] = useState<string>();

  const [collapsed, setCollapsed] = useState(false);
  const [inputData, setInputData] = useState<FormData>({
    username: "",
    email: "",
    message: "",
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [submittedData, setSubmittedData] = useState<FormData[]>([]); 
  

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(submittedData.map((data)=>data.username));
    console.log(submittedData.map((data)=>data.email));
    console.log(submittedData.map((data)=>data.message));
    setSubmittedData([...submittedData, inputData]); 

    setInputData({
      username: "",
      email: "",
      message: "",
    });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  return (
    <>
     <Layout hasSider>
        <Sider
          className="custom-sider"
          collapsible
          
          width="15vw"
          collapsed={collapsed}
          trigger={null}
        >
          <Menu
            theme="dark"
            className="custome-side-menu"
            // onClick={handleMenuClick}
            selectedKeys={[currentKey || 'dashboard']}
            mode="inline"
            items={[]}
            style={{border:'2px solid red', height:'96vh'}}
          />
          <div
            className="custom-trigger"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Row justify={'center'} align={'bottom'} style={{backgroundColor:'wheat'}}>
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
              <TodoApp/>
            </div>
          </Content>
        </div>
      </Layout>
    </>
  );
};
