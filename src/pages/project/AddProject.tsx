import React, { useState } from "react";
import { Button, Col, DatePicker, Input, Row, Select, Form, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ProjectType } from "../../types/apiResponseType";
import { CreateProjectThunk } from "../../store/features/project/projectThunk";

const { Option } = Select;

export const AddProject: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userReducer.users);

  const initialProjectObject: ProjectType = {
    title: "",
    description: "",
    status: "Not Started",
    startDate: "",
    endDate: "",
    managerId: "",
    teamMembers: [],
  };

  const [projectObject, setProjectObject] = useState<ProjectType>(initialProjectObject);

  const handleAddProject = () => {
    if (!projectObject.title || !projectObject.description) {
      return message.error("Please fill all required fields!");
    }

    setLoading(true);
    dispatch(CreateProjectThunk({ body: projectObject }))
      .then((data) => {
        if (data.payload.success) {
          setProjectObject(initialProjectObject);
          // Optionally navigate to project list
          // navigate('/projects/all');
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
                placeholder="Project title"
                value={projectObject.title}
                onChange={(e) => setProjectObject({ ...projectObject, title: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Project Manager">
              <Select
                value={projectObject.managerId}
                onChange={(value) => setProjectObject({ ...projectObject, managerId: value })}
              >
                {users?.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Start Date">
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date) => setProjectObject({
                  ...projectObject,
                  startDate: date?.format("YYYY-MM-DD"),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="End Date">
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date) => setProjectObject({
                  ...projectObject,
                  endDate: date?.format("YYYY-MM-DD"),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Status">
              <Select
                value={projectObject.status}
                onChange={(value) => setProjectObject({ ...projectObject, status: value })}
              >
                <Option value="Not Started">Not Started</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
                <Option value="On Hold">On Hold</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Team Members">
              <Select
                mode="multiple"
                value={projectObject.teamMembers}
                onChange={(value) => setProjectObject({ ...projectObject, teamMembers: value })}
              >
                {users?.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Description" required>
              <Input.TextArea
                rows={4}
                value={projectObject.description}
                onChange={(e) => setProjectObject({ ...projectObject, description: e.target.value })}
                placeholder="Project description"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                icon={<CheckOutlined />}
                loading={loading}
                onClick={handleAddProject}
                style={{backgroundColor: "white", color: "black", border: "1px solid black"}}
              >
                Create Project
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}; 