// src/Signup.tsx
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase-config/firebase';
import { Button, Card, Col, Form, Input, Row, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExportOutlined } from '@ant-design/icons';
import './Login.css';
import { signupThunk } from '../../store/features/auth/authThunk';
import { useAppDispatch, useAppSelector } from '../../store/store';

const Signup: React.FC = () => {
 const navigate=useNavigate();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isLoading,setIsLoading]= useState(false);
 const { loading, error } = useAppSelector((state) => state.authReducer);

 const dispatch= useAppDispatch();

 const handleSignup = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      username: email.split('@')[0], 
      email: email,
      password: password,
    };
    dispatch(signupThunk({body:body})).then((res)=>{
      if(res.payload.success){
        navigate("/login");
        message.success('Signup Success!! Please login to continue.');
        setIsLoading(false);
      }
    }).catch(()=>{
      setIsLoading(false);
      message.error("Invalid email or password. Please try again.");
    });
     
 };
 //for Firebase
//  const handleSignup = async (e: React.FormEvent) => {
//     setIsLoading(true);
//     e.preventDefault();
//     try {
//       const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//       // Send verification email
//       await userCredential.user?.sendEmailVerification().then(()=>{
//         setIsLoading(false)
//         message.success('Verification email sent. Please check your inbox.');
//       });
//     } catch (error:any) {
//         setIsLoading(false)
//         message.error("Invalid email or password. Please try again.");   
//     }
//  };

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
            style={{ height: "80%" }}
          >
            <Row justify={"center"} align={"middle"} style={{ height: "100%" }}>
              <Card
                className="login-card"
                style={{ borderRadius: "2rem", width: "60%", height: "70%" }}
              >
                <Row justify={"start"}>
                  <Space>
                    <h2>Sign in to your account</h2>
                  </Space>
                  <p style={{color:'gray'}}>Enter your email and password to access your Todo List.</p>
                </Row>
                <Form layout="vertical">
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input 
                    placeholder="m@example.com" 
                    onChange={(e)=>{
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
                      onChange={(e)=>{
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item >
                      <Button
                        loading={isLoading}
                        style={{ backgroundColor: "black", color: "white",boxShadow:'0 4px 12px rgba(0, 0, 0, 0.1)' }}
                        onClick={(e) => handleSignup(e)}
                      >
                        Sign Up
                      </Button>
                    <Row justify={'center'} style={{marginTop:'1rem'}}>
                    <Col span={1}></Col>
                    <Col style={{alignContent:'center'}}>
                      <Space>Already a user? <a type="text" onClick={()=>{
                        navigate('/login')
                      }}>Sign in now</a></Space>
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
