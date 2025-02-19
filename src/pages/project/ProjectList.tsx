import { Table, Tag, Button, Space, Row, Col, Select, DatePicker, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ProjectType } from "../../types/apiResponseType";
import { GetProjectList, DeleteProjectThunk } from "../../store/features/project/projectThunk";
import EditProjectModal from "./modal/EditProjectModal";
import { useSearchParams } from "react-router-dom";
const { Option } = Select;

export type SearchParamsType = {
  status?: string;
  startDate?: string;
  endDate?: string;
  pageSize?: string;
  pageNumber?: string;
};
type FiltersType = {
  status?: string;
  startDate?: string;
  endDate?: string;
  pageSize?: string;
  pageNumber?: string;
};
export default function ProjectList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FiltersType>({
    status: searchParams.get("status") ?? undefined,
    startDate: searchParams.get("startDate") ?? undefined,
    endDate: searchParams.get("endDate") ?? undefined,
    pageSize: searchParams.get("pageSize") ?? undefined,
    pageNumber: searchParams.get("pageNumber") ?? undefined,
  });

  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projectReducer.projects);
  const users = useAppSelector((state) => state.userReducer.users);
  const { isLoading } = useAppSelector((state) => state.projectReducer);
  const [loading, setLoading] = useState(false);
  const columns = [
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
      title: "Project Manager",
      dataIndex: "managerId",
      key: "manager",
      render: (managerId: string) => {
        const manager = users.find(u => u.id === managerId);
        return manager?.name || "Unassigned";
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Team Size",
      dataIndex: "teamMembers",
      key: "teamSize",
      render: (teamMembers: string[]) => teamMembers?.length || 0,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ProjectType) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedProject(record);
              setModalOpen(true);
            }}
          />
          <Button
            loading={loading}
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteProject(record.id!)}
          />
        </Space>
      ),
    },
  ];
  const filterProjects = () => {
    let queryParams: SearchParamsType = {
      pageSize: filters.pageSize,
      pageNumber: filters.pageNumber,
    };
    if(filters.status){
      queryParams.status = filters.status;
    }
    if(filters.startDate){
      queryParams.startDate = filters.startDate;
    }
    
    setSearchParams(queryParams);
    dispatch(GetProjectList({ 
      params: {
        status: filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
      } 
    }));
  }
  const handleDeleteProject = (id: string) => {
    Modal.confirm({
      title: 'Delete Project',
      content: 'Are you sure you want to delete this project?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk:  () => {
        setLoading(true);
       dispatch(DeleteProjectThunk({ id }))
          .then((data) => {
            if (data.payload.success) {
              filterProjects();
          }
        })
        .finally(() => {
          setLoading(false);
        });
      },
    });
  };

  useEffect(() => {
    filterProjects();
  }, [filters]);

  return (
    <div className="content">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space size="middle">
            <Select
              placeholder="Filter by Status"
              allowClear
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="Not Started">Not Started</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
              <Option value="On Hold">On Hold</Option>
            </Select>
            <DatePicker
              placeholder="Filter by Start Date"
              onChange={(date) => setFilters({
                ...filters,
                startDate: date?.format("YYYY-MM-DD"),
              })}
            />
            <DatePicker
              placeholder="Filter by End Date"
              onChange={(date) => setFilters({
                ...filters,
                endDate: date?.format("YYYY-MM-DD"),
              })}
            />
          </Space>
        </Col>
        <Col span={24}>
        </Col>
      </Row>
      <div className="table-content" style={{ marginTop: "1.5rem" }}>
          <Table
            columns={columns}
            dataSource={projects}
            loading={isLoading}
            rowKey="id"
            pagination={false}
            sticky
            scroll={{x: "100%"}}
            size="small"
          />
      </div>

      <EditProjectModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          dispatch(GetProjectList({ params: filters }));
        }}
        project={selectedProject}
      />
    </div>
  );
} 