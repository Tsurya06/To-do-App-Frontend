import React, { useState, useEffect } from "react";
import { Button, Col, DatePicker, Input, Row, Select, Form, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TaskType, UserType } from "../../types/apiResponseType";
import { CreateTaskThunk } from "../../store/features/task/TaskThunk";
import { GetUserList } from "../../store/features/user/userThunk";
import { GetProjectList } from "../../store/features/project/projectThunk";
import dayjs from "dayjs";
const { Option } = Select;

export const AddTask: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userReducer.users);
  const projects = useAppSelector((state) => state.projectReducer.projects);

  const initialTaskObject: TaskType = {
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    date: undefined,
    assigneeId: "",
    projectId: "",
    tags: [],
  };

  const [taskObject, setTaskObject] = useState<TaskType>(initialTaskObject);

  useEffect(() => {
    // Fetch users and projects if not already loaded
    if (users.length === 0) {
      dispatch(GetUserList({}));
    }
    if (projects.length === 0) {
      dispatch(GetProjectList({}));
    }
  }, [dispatch, users.length, projects.length]);

  const handleAddTask = () => {
    if (!taskObject.title || !taskObject.description) {
      return message.error("Please fill all required fields!");
    }
    const body = {
      title: taskObject.title,
      description: taskObject.description,
      status: taskObject.status,
      priority: taskObject.priority,
      date: taskObject.date,
      assigneeId: taskObject.assigneeId,
      projectId: taskObject.projectId,
    }
    setLoading(true);
    dispatch(CreateTaskThunk({ body: body }))
      .then((data) => {
        if (data.payload.success) {
          setTaskObject(initialTaskObject);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="content">
      <Form layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Title" required>
              <Input
                placeholder="Task title"
                value={taskObject.title}
                onChange={(e) => setTaskObject({ ...taskObject, title: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Due Date">
              <DatePicker
                style={{ width: "100%" }}
                format={"DD-MM-YYYY"}
                value={taskObject.date? dayjs(taskObject.date, "DD-MM-YYYY") : null}
                onChange={(date) => setTaskObject({
                  ...taskObject,
                  date: date?.format("DD-MM-YYYY"),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Status">
              <Select
                value={taskObject.status}
                onChange={(value) => setTaskObject({ ...taskObject, status: value })}
              >
                <Option value="To Do">To Do</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
                <Option value="On Hold">On Hold</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Priority">
              <Select
                value={taskObject.priority}
                onChange={(value) => setTaskObject({ ...taskObject, priority: value })}
              >
                <Option value="High">High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Assignee">
              <Select
                value={taskObject.assigneeId}
                onChange={(value) => setTaskObject({ ...taskObject, assigneeId: value })}
              >
                {users?.map((user: UserType) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Project">
              <Select
                value={taskObject.projectId}
                onChange={(value) => setTaskObject({ ...taskObject, projectId: value })}
              >
                {projects?.map((project) => (
                  <Option key={project.id} value={project.id}>
                    {project.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Description" required>
              <Input.TextArea
                rows={4}
                value={taskObject.description}
                onChange={(e) => setTaskObject({ ...taskObject, description: e.target.value })}
                placeholder="Task description"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                loading={loading}
                onClick={handleAddTask}
                style={{
                  backgroundColor: "white",
                  color:  "black",
                  border: "1px solid gray",
                }}
              >
                Create Task
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}; 