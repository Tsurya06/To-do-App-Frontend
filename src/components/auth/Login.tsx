// src/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import './auth.css'
import { loginThunk } from "../../store/features/auth/authThunk";
import { useAppDispatch } from "../../store/store";
import Cookies from "js-cookie";
import PencilLoader from "../../util/PencilLoader";
const { Text } = Typography;

export default function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading]= useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    dispatch(loginThunk({body:body})).then((res)=>{
      if(res.payload.success){
        Cookies.set('user', JSON.stringify(res.payload));
        navigate('/dashboard');
      }
      setIsLoading(false);
    }).catch((err)=>{
      setIsLoading(false);
    });
  };

  return (
    <> {isLoading?
    (
      <Row justify={'center'} style={{width:'100%'}}>
    <PencilLoader/>
    </Row>
  ):
      <Row justify={"center"} style={{ width: "100%" }}>
        <Row
          justify={"center"}
          align={"middle"}
          style={{ margin: "2rem", width: "100%" }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col
            span={8}
            className="gutter-row login-left-content"
            xs={24}
            sm={20}
            md={18}
            lg={12}
            xl={12}
          >
            <Col
              className="login-left-content-box"
              style={{ alignContent: "center", margin: "2rem" }}
            >
              <h1>
                <p className="sedan-sc-regular">
                  Stay on top of your tasks with our Todo List app
                </p>
              </h1>
              <p
                style={{
                  maxWidth: "720px",
                  color: "#999",
                  fontFamily: "cursive",
                }}
              >
                Organize your life, boost your productivity, and never forget a
                task again with our intuitive and feature-rich Todo List app.
              </p>
              <Row justify={"start"}>
                <Col span={4} xs={24} sm={24} md={18} lg={6} xl={4}>
                  <Button type="text" style={{boxShadow:'0 4px 10px rgba(0, 0, 0, 0.1)'}}>Get Started</Button>
                </Col>
                <Col span={1}></Col>
                <Col span={3} xs={24} sm={24} md={18} lg={3} xl={3}>
                  <Button type="text">
                    Learn More <ExportOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Col>

          <Col
            xs={24}
            sm={20}
            md={18}
            lg={12}
            xl={12}
            style={{ height: "100%" }}
          >
            <Row justify={"center"} align={"middle"} style={{ height: "100%" }}>
              <Card
                className="login-card"
                style={{ borderRadius: "2rem", width: "60%", height: "55%" }}
              >
                <Row justify={"center"}>
                  <Row justify={"center"} align={'bottom'} style={{ width: "100%" }}>
                    <Col >
                      <h1>
                        <b style={{ fontFamily: "cursive" }}>Sign In</b>
                      </h1>
                    </Col>
                  </Row>
                  <Row justify={"center"} style={{ width: "100%" }}>
                    <p style={{ color: "gray" }}>
                      Sign in to access the todos.
                    </p>
                  </Row>
                </Row>
                <Form layout="vertical">
                  <Form.Item
                    name="email"
                    label={<Text>Email</Text>}
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input 
                    placeholder="mf@example.com" 
                    onChange={(e)=>{
                      setEmail(e.target.value);
                    }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label={<Text>Password</Text>}
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password 
                      placeholder="***********"
                      onChange={(e)=>{
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item >
                      <Button
                        loading={isLoading}
                        style={{ backgroundColor: "black", color: "white" }}
                        onClick={(e) => handleLogin(e)}
                      >
                        Sign In
                      </Button>
                    <Row justify={'center'} style={{marginTop:'1rem'}}>
                    <Col span={1}></Col>
                    <Col style={{alignContent:'baseline'}}>
                      <Space>New user? <a type="text" style={{color:'black',borderBottom:'1px solid black'}} onClick={()=>{
                        navigate("/Signup");
                      }}>Signup now</a></Space>
                    </Col>
                  </Row>
                  </Form.Item>
                </Form>
              </Card>
            </Row>
          </Col>
        </Row>
      </Row>}
    </>
  );
}
