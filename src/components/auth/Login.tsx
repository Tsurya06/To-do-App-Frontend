// src/Login.tsx
import React, { useState } from 'react';
import { auth } from '../../firebase-config/firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Input, Row, Space, Typography, message } from 'antd';

const { Title, Text } = Typography;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await auth.signInWithEmailAndPassword(email, password);
      if (userCred.user?.emailVerified) {
        message.success('Login Success!!');
      } else {
        message.error('Email is not verified');
      }
    } catch (error:any) {
      message.error(error.message);
    }
  };

  const navigateToSignup = () => {
    navigate('/Signup');
  };

  return (
    <>
    <Row style={{ padding: '3rem 1rem', width:'100%',border:'2px solid red'}} >
    <Row gutter={[16, 16]} style={{ padding: '0 1rem' }}>
      <Col span={10}>
        <Title level={3} style={{ marginBottom: '1rem' }}>
          Stay on top of your tasks with our Todo List app
        </Title>
        <Text style={{ maxWidth: '600px', color: '#999' }}>
          Organize your life, boost your productivity, and never forget a task again with our intuitive and
          feature-rich Todo List app.
        </Text>
        
      </Col>
      <Col  span={6}></Col>
      <Col span={8}>
        <Card title={<Title level={2}>Sign in to your account</Title>} style={{ width: '100%', maxWidth: '480px', margin: 'auto' }}>
          <Card.Meta title={<Text>Enter your email and password to access your Todo List.</Text>} />
          <Form layout="vertical" >
            <Form.Item name="email" label={<Text>Email</Text>} rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input placeholder="m@example.com" />
            </Form.Item>
            <Form.Item  label={<Text>Password</Text>} rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button 
              style={{ backgroundColor: 'black', color: 'white' }}
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
};