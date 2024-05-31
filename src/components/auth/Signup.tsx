// src/Signup.tsx
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Input, Row, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import { signupThunk } from "../../store/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import "./auth.css";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSignup = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      username: name,
      email: email,
      password: password,
    };
    dispatch(signupThunk({ body: body }))
      .then((res) => {
        if (res.payload) {
          // navigate("/login");
          message.success(res.payload);
        } else {
          message.error(res.payload);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        message.error("Invalid email or password. Please try again.");
      });
  };
  return (
    <>
      <Row justify={"center"} style={{ width: "100%" }}>
        <Row
          justify={"center"}
          align={"middle"}
          style={{ margin: "2rem", width: "100%" }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col
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
                  <Button
                    type="text"
                    style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
                  >
                    Get Started
                  </Button>
                </Col>
                <Col span={1}></Col>
                <Col span={3} xs={24} sm={24} md={18} lg={3} xl={3}>
                  <Button type="text" style={{}}>
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
            style={{height:'100%' }}
          >
            <Row justify={"center"} align={"middle"} style={{ height: "80%",marginTop:'3rem'}}>
              <Card
                className="login-card"
                style={{alignContent:'center', borderRadius: "2rem", width: "60%", height: "85%" }}
              >
                <Row justify={"center"}>
                  <Row justify={"center"} style={{ width: "100%" }}>
                    <Col style={{ alignContent: "center" }}>
                      <h1>
                        <b style={{ fontFamily: "cursive" }}>Sign Up</b>
                      </h1>
                    </Col>
                  </Row>
                  <Row justify={"center"} style={{ width: "100%" }}>
                    <p style={{ color: "gray" }}>
                      Create your account to get started.
                    </p>
                  </Row>
                </Row>
                <Form layout="vertical">
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input
                      placeholder="Alex"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input
                      placeholder="m@example.com"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="*******"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={isLoading}
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      onClick={(e) => handleSignup(e)}
                    >
                      Sign Up
                    </Button>
                    <Row justify={"center"} style={{ marginTop: "1rem" }}>
                      <Col span={1}></Col>
                      <Col style={{ alignContent: "center" }}>
                        <Space>
                          Already a user?
                          <a
                            type="text"
                            style={{color:'black',borderBottom:'1px solid black'}}
                            onClick={() => {
                              navigate("/login");
                            }}
                          >
                            Sign in now
                          </a>
                        </Space>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </Card>
            </Row>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Signup;
