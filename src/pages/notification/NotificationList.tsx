import { List, Badge, Button, Row, Col, message } from "antd";
import { BellOutlined, CheckOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { NotificationType } from "../../types/apiResponseType";
import { GetNotificationList, MarkAsReadThunk } from "../../store/features/notification/notificationThunk";

export default function NotificationList() {
  const dispatch = useAppDispatch();
  const { notifications, isLoading } = useAppSelector((state) => state.notificationReducer);

  const handleMarkAsRead = async (id: string) => {
    try {
      const result = await dispatch(MarkAsReadThunk({ id })).unwrap();
      if (result.success) {
        message.success('Notification marked as read');
        dispatch(GetNotificationList({}));
      }
    } catch (error) {
      message.error('Failed to update notification');
    }
  };

  useEffect(() => {
    dispatch(GetNotificationList({}));
  }, [dispatch]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task_update':
        return <BellOutlined style={{ color: '#1890ff' }} />;
      case 'assignment':
        return <BellOutlined style={{ color: '#52c41a' }} />;
      case 'comment':
        return <BellOutlined style={{ color: '#faad14' }} />;
      case 'deadline':
        return <BellOutlined style={{ color: '#f5222d' }} />;
      default:
        return <BellOutlined />;
    }
  };

  return (
    <div className="content">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <List
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item: NotificationType) => (
              <List.Item
                actions={[
                  !item.isRead && (
                    <Button
                      icon={<CheckOutlined />}
                      onClick={() => handleMarkAsRead(item.id!)}
                    >
                      Mark as Read
                    </Button>
                  ),
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Badge dot={!item.isRead}>
                      {getNotificationIcon(item.type)}
                    </Badge>
                  }
                  title={item.message}
                  description={new Date(item.timestamp).toLocaleString()}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
} 