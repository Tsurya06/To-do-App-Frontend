import { Table, Tag, Button, Space, Row, Col, Input, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { UserType } from "../../types/apiResponseType";
import { GetUserList, DeleteUserThunk } from "../../store/features/user/userThunk";
import EditUserModal from "./modal/EditUserModal";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export default function UserList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const [searchText, setSearchText] = useState("");

  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: UserType) => (
        <a style={{color:'gray'}} onClick={() => navigate(`/users/${record.id}`)}>{name}</a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role !== "Employee" ? "red" : "green"}>
          { role && role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: UserType) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setModalOpen(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteUser(record.id!)}
          />
        </Space>
      ),
    },
  ];

  const handleDeleteUser = (id: string) => {
    Modal.confirm({
      title: 'Delete User',
      content: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const result = await dispatch(DeleteUserThunk({ id })).unwrap();
          if (result.success) {
            dispatch(GetUserList({}));
          }
        } catch (error) {
          message.error('Failed to delete user');
        }
      },
    });
  };

  useEffect(() => {
    dispatch(GetUserList({ params: { search: searchText } }));
  }, [dispatch, searchText]);

  return (
    <div className="content">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Search
            placeholder="Search users"
            allowClear
            onSearch={setSearchText}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={users}
            loading={isLoading}
            rowKey="id"
          />
        </Col>
      </Row>

      <EditUserModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          dispatch(GetUserList({ params: { search: searchText } }));
        }}
        user={selectedUser}
      />
    </div>
  );
} 