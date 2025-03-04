import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Tag, Space, Typography, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { GetUserById, DeleteUserThunk } from "../../store/features/user/userThunk";
import EditUserModal from "./modal/EditUserModal";

const { Title, Text } = Typography;

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.user);

  const handleDeleteUser = () => {
    if (!id) return;
    setLoading(true);
    dispatch(DeleteUserThunk({ id }))
      .then((data) => {
        if (data.payload.success) {
          window.history.back();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      dispatch(GetUserById({ id }));
    }
  }, [dispatch, id]);

  if (!user) {
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
                onClick={handleDeleteUser}
              />
            </Space>
            <Title level={2}>{user.name}</Title>
          </Col>
          <Col span={24}>
            <Space direction="vertical">
              <Text strong>Email:</Text>
              <Text>{user.email}</Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical">
              <Text strong>Role:</Text>
              <Tag color={user.role === "admin" ? "red" : "blue"}>
                {user.role?.toUpperCase()}
              </Tag>
            </Space>
          </Col>
        </Row>
      </Card>

      <EditUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
      />
    </div>
  );
} 