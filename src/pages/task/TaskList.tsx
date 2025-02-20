import { Table, Tag, Button, Space, Row, Col, Select, DatePicker, Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TaskType } from "../../types/apiResponseType";
import { DeleteTaskByIdThunk, GetTaskList } from "../../store/features/task/TaskThunk";
import EditTaskModal from "./modals/EditTaskModal";
import { useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

const { Option } = Select;
type FilterTaskObjectType = {
  pageSize?: number;
  pageNumber?: number;
  status?: string;
  priority?: string;
  date?: string;
};
type SearchParamsType = {
  pageSize?: string;
  pageNumber?: string;
  status?: string;
  priority?: string;
  date?: string;
};
export default function TaskList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterTaskObjectType>({
    pageSize: parseInt(searchParams.get("pageSize") ?? "10"),
    pageNumber: parseInt(searchParams.get("pageNumber") ?? "1"),
    status: searchParams.get("status") ?? undefined,
    priority: searchParams.get("priority") ?? undefined,
    date: searchParams.get("date") ?? undefined,
  });

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.taskReducer);
  const users = useAppSelector((state) => state.userReducer.users);

  const columns: ColumnsType<TaskType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={
          status === "Completed" ? "green" :
          status === "In Progress" ? "blue" :
          status === "On Hold" ? "orange" : "default"
        }>
          {status}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => (
        <Tag color={
          priority === "High" ? "red" :
          priority === "Medium" ? "orange" : "green"
        }>
          {priority}
        </Tag>
      ),
    },
    {
      title: "Assignee",
      dataIndex: "assigneeId",
      key: "assignee",
      render: (assigneeId: string) => {
        const user = users.find(u => u.id === assigneeId);
        return user?.name || "Unassigned";
      },
    },
    {
      title: "Due Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TaskType) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedTask(record);
              setModalOpen(true);
            }}
          />
          <Button
            loading={loading}
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteTask(record.id!)}
          />
        </Space>
      ),
    },
  ];
  const filterTasks = () => {
    let queryParams: SearchParamsType = {
      pageSize: `${filters.pageSize}`,
      pageNumber: `${filters.pageNumber}`,
    };
    if(filters.status){
      queryParams.status = filters.status;
    }
    if(filters.priority){
      queryParams.priority = filters.priority;
    }
    if(filters.date){
      queryParams.date = filters.date;
    }
    setSearchParams(queryParams);
    dispatch(GetTaskList({ 
      params: {
        pageSize: filters.pageSize,
        pageNumber: filters.pageNumber,
        status: filters.status,
        priority: filters.priority,
        date: filters.date,
      } 
    }))
  }
  const handlePageChange = (pageNumber: number, pageSize: number) => {
    setFilters((prevObj) => ({
      ...prevObj,
      pageNumber,
      pageSize,
    }));
  };
  const handleDeleteTask = (id: string) => {
    setLoading(true);
    dispatch(DeleteTaskByIdThunk({ id }))
      .then((data) => {
        if (data.payload.success) {
          filterTasks();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    filterTasks();
  }, [dispatch, filters]);

  return (
    <div className="content">
      <Row gutter={[16, 16]}>
        
        <Col span={24}>
          <Row align="middle">
            <Col xs={{ span: 8 }}>
              <h3>Task List ({tasks.total_count})</h3>
            </Col>
            <Col xs={{ span: 16 }}>
              <Row justify="end" align="middle">
                <Pagination
                  showSizeChanger
                  current={filters.pageNumber}
                  onChange={handlePageChange}
                  total={tasks.total_count}
                  pageSize={filters.pageSize}
                  itemRender={(currentPage, type, originalElement) => {
                    if (type === "page") {
                      return (
                        <a
                          style={
                            currentPage === filters.pageNumber
                              ? {
                                  backgroundColor: "whiter",
                                  color: "black",
                                  border: "1px solid black",
                                  borderRadius: "4px",
                                }
                              : {}
                          }
                        >
                          {currentPage}
                        </a>
                      );
                    }
                    return originalElement;
                  }}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Space size="middle">
            <Select
              placeholder="Filter by Status"
              allowClear
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="To Do">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
              <Option value="On Hold">On Hold</Option>
            </Select>
            <Select
              placeholder="Filter by Priority"
              allowClear
              onChange={(value) => setFilters({ ...filters, priority: value })}
            >
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
            <DatePicker
              placeholder="Filter by Due Date"
              onChange={(date) => setFilters({
                ...filters,
                date: date?.format("DD-MM-YYYY"),
              })}
            />
          </Space>
        </Col>
      </Row>
      <div className="table-content" style={{ marginTop: "1.5rem" }}>
        <Table
          columns={columns}
          dataSource={tasks.tasks}
          loading={tasks.isLoading}
          rowKey="id"
          scroll={{ x: "100%" }}
          bordered={true}
          pagination={false}
          sticky
        />
      </div>

      <EditTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        task={selectedTask}
        filterTasks={filterTasks}
      />
    </div>
  );
} 