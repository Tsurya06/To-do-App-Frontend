import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../store/store";
import { UserType } from "../../types/apiResponseType";
import { CreateUserThunk } from "../../store/features/user/userThunk";

const { Option } = Select;

export const AddUser: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const initialUserObject: UserType = {
    name: "",
    email: "",
    role: "user",
    password: "",
  };

  const [form] = Form.useForm();

  const handleAddUser = async (values: UserType) => {
    setLoading(true);
    try {
      const result = await dispatch(CreateUserThunk({ body: values })).unwrap();
      if (result.success) {
        message.success('User created successfully');
        form.resetFields();
      }
    } catch (error) {
      message.error('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <Form 
        form={form}
        layout="vertical" 
        onFinish={handleAddUser}
        initialValues={initialUserObject}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter password" },
                { min: 6, message: "Password must be at least 6 characters" }
              ]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select role" }]}
            >
              <Select>
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<CheckOutlined />}
                loading={loading}
              >
                Create User
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}; 