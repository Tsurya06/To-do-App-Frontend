import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import { TaskType } from "../../../types/apiResponseType";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { EditTaskThunk } from "../../../store/features/task/TaskThunk";
import dayjs from "dayjs";

const { Option } = Select;

type EditTaskModalProps = {
  open: boolean;
  onClose: () => void;
  task?: TaskType;
  filterTasks: () => void;
}

export default function EditTaskModal({ open, onClose, task, filterTasks }: EditTaskModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userReducer.users);

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        date: task.date ? dayjs(task.date) : null,
      });
    }
  }, [task, form]);

  const handleSubmit = async (values: TaskType) => {
    if (!task?.id) return;
    
    setLoading(true);
    dispatch(EditTaskThunk({ 
      id: task.id,
      body: {
        ...values,
        date: values.date ? dayjs(values.date).format("DD-MM-YYYY") : undefined,
      }
    }))
    .then((data) => {
      if (data.payload.success) {
        onClose();
        filterTasks();
      }
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <Modal
        title="Edit Task"
        open={open}
        onCancel={onClose}
        footer={null}
        width={650}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter task title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
          >
            <Select>
              <Option value="To Do">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
              <Option value="On Hold">On Hold</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
          >
            <Select>
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="assigneeId"
            label="Assignee"
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
            name="date"
            label="Due Date"
          >
            <DatePicker 
              style={{ width: "100%" }} 
              format={"DD-MM-YYYY"} 
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter task description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{
                backgroundColor: "white",
                color:  "black",
                border: "1px solid gray",
              }}>
              Update Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
} 