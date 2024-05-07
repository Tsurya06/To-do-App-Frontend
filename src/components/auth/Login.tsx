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
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <Row justify={"center"} style={{ padding: "3rem 1rem", width: "100%" }}>
        <Row
          justify={"center"}
          align={"middle"}
          style={{ margin: "5rem", width: "100%" }}
        >
          <Col span={12} className="login-left-content">
            <h1>
              <p className="sedan-sc-regular">
                Stay on top of your tasks with our Todo List app
              </p>
            </h1>
            <p
              style={{
                maxWidth: "600px",
                color: "#999",
                fontFamily: "cursive",
              }}
            >
              Organize your life, boost your productivity, and never forget a
              task again with our intuitive and feature-rich Todo List app.
            </p>
            <Row justify={"start"}>
              <Col span={4}>
                <Button type="text">Get Started</Button>
              </Col>
              <Col span={3}>
                <Button type="text" style={{ borderColor: "gray" }}>
                  Learn More
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={4}></Col>
          <Col span={8}>
            <Card style={{ width: "100%", maxWidth: "480px", borderRadius:'2rem', border:'1px solid gray' }}>
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
