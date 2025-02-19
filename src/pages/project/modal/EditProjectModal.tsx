import { Modal, Form, Input, Select, DatePicker, Button, message } from "antd";
import { ProjectType } from "../../../types/apiResponseType";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { EditProjectThunk } from "../../../store/features/project/projectThunk";
import dayjs from "dayjs";

const { Option } = Select;

type EditProjectModalProps = {
  open: boolean;
  onClose: () => void;
  project?: ProjectType;
};

export default function EditProjectModal({ open, onClose, project }: EditProjectModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userReducer.users);

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        ...project,
        startDate: project.startDate ? dayjs(project.startDate) : null,
        endDate: project.endDate ? dayjs(project.endDate) : null,
      });
    }
  }, [project, form]);

  const handleSubmit = async (values: ProjectType) => {
    if (!project?.id) return;
    
    setLoading(true);
    try {
      const result = await dispatch(EditProjectThunk({ 
        id: project.id,
        body: {
          ...values,
          startDate: values.startDate ? dayjs(values.startDate).format("YYYY-MM-DD") : undefined,
          endDate: values.endDate ? dayjs(values.endDate).format("YYYY-MM-DD") : undefined,
        }
      })).unwrap();

      if (result.success) {
        message.success('Project updated successfully');
        onClose();
      }
    } catch (error) {
      message.error('Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Project"
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
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter project title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
        >
          <Select>
            <Option value="Not Started">Not Started</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
            <Option value="On Hold">On Hold</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="managerId"
          label="Project Manager"
        >
          <Select>
            {users?.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="teamMembers"
          label="Team Members"
        >
          <Select mode="multiple">
            {users?.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter project description" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Project
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
} 