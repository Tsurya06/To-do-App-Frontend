import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Tag, Space, Typography, Button, Divider, List } from "antd";
import { EditOutlined, DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { CommentType } from "../../types/apiResponseType";
import { GetTaskByIdThunk, DeleteTaskByIdThunk } from "../../store/features/task/TaskThunk";
import EditTaskModal from "./modals/EditTaskModal";
import AddCommentForm from "./comments/AddCommentForm";

const { Title, Text } = Typography;

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();       
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.taskReducer.task);
  const users = useAppSelector((state) => state.userReducer.users);
  const projects = useAppSelector((state) => state.projectReducer.projects);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "green";
      case "In Progress":
        return "blue";
      case "On Hold":
        return "orange";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "default";
    }
  };

  const handleDeleteTask = () => {
    if (!id) return;
    setLoading(true);
    dispatch(DeleteTaskByIdThunk({ id }))
      .then((data) => {
        if (data.payload.success) {
          window.history.back();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAssigneeName = (assigneeId: string) => {
    const user = users.find(u => u.id === assigneeId);
    return user?.name || "Unassigned";
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.title || "No Project";
  };

  useEffect(() => {
    if (id) {
      dispatch(GetTaskByIdThunk({ id }));
    }
  }, [dispatch, id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space style={{ float: 'right' }}>
              <Button 
                icon={<EditOutlined />}
                onClick={() => setModalOpen(true)}
              />
              <Button 
                danger 
                icon={<DeleteOutlined />}
                loading={loading}
                onClick={handleDeleteTask}
              />
            </Space>
            <Title level={2}>{task.title}</Title>
          </Col>

          <Col span={24}>
            <Space size="large">
              <Space>
                <Text strong>Status:</Text>
                <Tag color={getStatusColor(task.status || "")}>
                  {task.status}
                </Tag>
              </Space>
              <Space>
                <Text strong>Priority:</Text>
                <Tag color={getPriorityColor(task.priority || "")}>
                  {task.priority}
                </Tag>
              </Space>
              <Space>
                <Text strong>Assignee:</Text>
                <Text>{getAssigneeName(task.assigneeId || "")}</Text>
              </Space>
              <Space>
                <Text strong>Project:</Text>
                <Text>{getProjectName(task.projectId || "")}</Text>
              </Space>
              <Space>
                <Text strong>Due Date:</Text>
                <Text>{task.dueDate}</Text>
              </Space>
            </Space>
          </Col>

          <Col span={24}>
            <Divider />
            <Title level={4}>Description</Title>
            <Text>{task.description}</Text>
          </Col>

          {task.subtasks && task.subtasks.length > 0 && (
            <Col span={24}>
              <Divider />
              <Title level={4}>Subtasks</Title>
              <List
                dataSource={task.subtasks}
                renderItem={(subtask) => (
                  <List.Item>
                    <Text>{subtask.title}</Text>
                  </List.Item>
                )}
              />
            </Col>
          )}

          <Col span={24}>
            <Divider />
            <Title level={4}>
              <Space>
                <MessageOutlined />
                Comments
              </Space>
            </Title>
            <List
              dataSource={task.comments}
              renderItem={(comment: CommentType) => (
                <List.Item>
                  <List.Item.Meta
                    title={comment.user?.name}
                    description={
                      <>
                        <div>{comment.text}</div>
                        <small>{new Date(comment.timestamp).toLocaleString()}</small>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
            <AddCommentForm taskId={id || ""} />
          </Col>
        </Row>
      </Card>

      <EditTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        task={task}
        filterTasks={() => {
          if (id) {
            dispatch(GetTaskByIdThunk({ id }));
          }
        }}
      />
    </div>
  );
}
