import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { AddCommentThunk } from "../../../store/features/task/TaskThunk";

type AddCommentFormProps = {
  taskId: string;
};

export default function AddCommentForm({ taskId }: AddCommentFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: { text: string }) => {
    if (!values.text.trim()) return;

    setLoading(true);
    try {
      const result = await dispatch(AddCommentThunk({
        body: {
          taskId,
          text: values.text
        }
      })).unwrap();

      if (result.success) {
        form.resetFields();
        message.success('Comment added successfully');
      }
    } catch (error) {
      message.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="text" rules={[{ required: true, message: 'Please enter a comment' }]}>
        <Input.TextArea rows={4} placeholder="Write a comment..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{backgroundColor: "white", color: "black", border: "1px solid gray"}} htmlType="submit" loading={loading}>
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
} 