// src/Login.tsx
import React, { useState } from "react";
import { auth } from "../../firebase-config/firebase";
import { useNavigate } from "react-router-dom";
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

const { Title, Text } = Typography;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      setEmail(values.email);
      setPassword(values.password);
    });
    console.log(email, password)
    try {
      const userCred = await auth.signInWithEmailAndPassword(email, password);
      if (userCred.user?.emailVerified) {
        message.success("Login Success!!");
      } else {
        message.error("Email is not verified");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const navigateToSignup = () => {
    navigate("/Signup");
  };

  return (
    <>
      <Row justify={"center"} >
        <Row
          justify={"center"}
          align={"bottom"}
          style={{ margin: "2rem", }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col span={8} className="gutter-row login-left-content" xs={24} sm={24} md={18} lg={12} xl={12}>
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
              <Col span={4} xs={24} sm={24}>
                <Button type="text">Get Started</Button>
              </Col>
              <Col span={3} xs={24} sm={24}>
                <Button type="text" style={{ borderColor: "gray" }}>
                  Learn More
                </Button>
              </Col>
            </Row>
          </Col>
          
          <Col xs={24} sm={24} md={18} lg={12} xl={12} style={{height:'80%'}}>
            <Card style={{borderRadius:'2rem', width:'80%',height:'75%',marginLeft:'2rem' }}>
              <Row  justify={"start"}>
                <Space>
                  <h2>Sign in to your account</h2>
                </Space>
              </Row>
              <Row>
                <p>Enter your email and password to access your Todo List.</p>
              </Row>
              <Form layout="vertical">
                <Form.Item
                  name="email"
                  label={<Text>Email</Text>}
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="m@example.com" />
                </Form.Item>
                <Form.Item
                  label={<Text>Password</Text>}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button 
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={()=>{
                    handleLogin
                  }}
                  >
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Row>
    </>
  );
}
