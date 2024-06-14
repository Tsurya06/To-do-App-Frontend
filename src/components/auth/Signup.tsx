import React, { useState, useRef } from "react";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import { signupThunk } from "../../store/features/auth/authThunk";
import { useAppDispatch } from "../../store/store";
import "./auth.css";
import PencilLoader from "../../util/PencilLoader";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const signupRef = useRef<HTMLDivElement>(null);

  const handleSignup = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dispatch(signupThunk({ body })).then((res) => {
      if (res.payload.success) {
        navigate("/login");
      }
      setIsLoading(false);
    });
  };

  const handleGetStartedClick = () => {
    if (signupRef.current) {
      signupRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {isLoading ? (
        <Row justify={"center"} style={{ width: "100%" }}>
          <PencilLoader />
        </Row>
      ) : (
        <Row
          justify={"center"}
          align={"middle"}
          style={{ marginLeft: "0px", width: "100%" }}
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
                  Stay on top of your tasks with our To-do List app
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
                task again with our intuitive and feature-rich To-do List app.
              </p>
              <Row justify={"start"}>
                <Col span={4} xs={24} sm={24} md={18} lg={6} xl={4}>
                  <Button
                    type="text"
                    style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
                    onClick={handleGetStartedClick}
                  >
                    Get Started
                  </Button>
                </Col>
                <Col span={1}></Col>
                <Col span={3} xs={24} sm={24} md={18} lg={3} xl={3}>
                  <Button type="text" onClick={handleGetStartedClick}>
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
            style={{ height: "90%" }}
            ref={signupRef}
          >
            <Row
              justify={"center"}
              align={"middle"}
              style={{ height: "100%" }}
            >
              <Card
                className="login-card"
                style={{
                  alignContent: "center",
                  borderRadius: "2rem",
                  width: "60%",
                  height: "75%",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
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
                <Form layout="vertical" onFinish={handleSignup}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input placeholder="Alex" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      {
                        type: "email",
                        message: "The input is not a valid email!",
                      },
                    ]}
                  >
                    <Input placeholder="m@example.com" />
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
                    <Input.Password placeholder="*******" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={isLoading}
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      htmlType="submit"
                    >
                      Sign Up
                    </Button>
                    <Row justify={"center"} style={{ marginTop: "2rem" }}>
                      <Col>
                        <Space>
                          Already a user?
                          <Col
                            style={{
                              color: "black",
                              borderBottom: "1px solid black",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              navigate("/login");
                            }}
                          >
                            Sign in now
                          </Col>
                        </Space>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </Card>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Signup;
