import { Modal, Form, Input, Select, Button, message } from "antd";
import { UserType } from "../../../types/apiResponseType";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { EditUserThunk } from "../../../store/features/user/userThunk";

const { Option } = Select;

type EditUserModalProps = {
  open: boolean;
  onClose: () => void;
  user?: UserType;
};

export default function EditUserModal({ open, onClose, user }: EditUserModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleSubmit = async (values: UserType) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const result = await dispatch(EditUserThunk({ 
        id: user.id,
        body: values
      })).unwrap();

      if (result.success) {
        onClose();
      }
    } catch (error) {
      message.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit User"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter user name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
        >
          <Select>
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
} 