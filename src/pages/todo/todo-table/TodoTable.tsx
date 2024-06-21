import {
  Row,
  Col,
  Table,
  Button,
  Input,
  message,
  Pagination,
} from "antd";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { ColumnsType } from "antd/es/table";
import { TodoType } from "../../../types/apiResponseType";
import {
  DeleteTodoByIdThunk,
  EditTodoThunk,
  GetTodoList,
} from "../../../store/features/todo/TodoThunk";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import EditTodoModal from "./modals/EditTodoModal";
export type FilterTodoObjectType = {
  pageSize: number;
  currentPage: number;
};
export type SearchParamsType = {
  pageSize: string;
  currentPage: string;
};
export default function TodoTable() {
  const todos = useAppSelector((state: RootState) => state.todosReducer);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [editedTodos, setEditedTodo] = useState<TodoType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTodo, setSelectedTodo] = useState<TodoType>();
  const dispatch = useAppDispatch();
  
  const [filteredTodosObject, setfilteredTodosObject] =
    useState<FilterTodoObjectType>({
      pageSize: parseInt(searchParams.get("pageSize") ?? "10"),
      currentPage: parseInt(searchParams.get("currentPage") ?? "1"),
    });
    const [deleteLoadingId, setDeleteLoadingId] = useState<null | string>(null);

  const columns: ColumnsType<TodoType> = [
    {
      title: "Task No.",
      key: "task_no",
      width: "3rem",
      render: (_, __, index: number) =>
        filteredTodosObject.currentPage! * filteredTodosObject.pageSize! -
        filteredTodosObject.pageSize! +
        index +
        1,
    },
    {
      title: <div style={{ textAlign: "center" }}>Title</div>,
      key: "title",
      width: "6rem",
      render: (record: TodoType) => {
        return (
          <>
            <Input value={record.title} readOnly />
          </>
        );
      },
    },
    {
      title: <div style={{ textAlign: "center" }}>Description</div>,
      key: "description",
      width: "9rem",
      render: (record: TodoType) => {
        return (
          <>
            <Input value={record.description} readOnly />
          </>
        );
      },
    },
    {
      title: <div style={{ textAlign: "center" }}>Date</div>,
      key: "date",
      width: "5rem",
      render: (record: TodoType) => {
        return (
          <>
            <Input value={record.date} readOnly />
          </>
        );
      },
    },
    {
      title: <div style={{ textAlign: "center" }}>Action</div>,
      key: "action",
      width: "4rem",
      render: (record: TodoType) => (
        <Row justify={"space-evenly"}>
          <Col>
            <Button
              onClick={() => {
                setSelectedTodo(record);
                setModalOpen(true);
              }}
              icon={<EditOutlined />}
              style={{
                backgroundColor: "white",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                color: "black",
              }}
            />
          </Col>
          <Col>
            <Button
              loading={deleteLoadingId===record.id }
              onClick={() => handleDeleteRow(record.id!)}
              icon={<DeleteOutlined />}
              style={{
                backgroundColor: "white",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                color: "black",
              }}
            />
          </Col>
        </Row>
      ),
    },
  ];
  const handleDeleteRow = (id: string) => {
    setDeleteLoadingId(id);
    dispatch(DeleteTodoByIdThunk({ id: id }))
      .then((data) => {
        if (data.payload) {
          filterTodos();
          setDeleteLoadingId(null);
        }
      })
      .catch((error) => {
        message.error("Failed to delete todo:", error);
      })
  };

  const handleEditTodo = (editedTodos: TodoType, id: string) => {

    if (!editedTodos) {
      return message.error("Todo not found in the database!");
    }

    const payloadBody = {
      id: editedTodos.id,
      title: editedTodos.title,
      description: editedTodos.description,
      date: editedTodos?.date!,
    };
    setEditLoading(true);
    dispatch(EditTodoThunk({ body: payloadBody, id: id }))
      .then((data) => {
        if (data.payload) {
          filterTodos();
          setEditedTodo([]);
          setModalOpen(false);
          setEditLoading(false);
        }
      })
      .catch((error) => {
        setEditLoading(false);
        message.error("Failed to edit todo:", error);
      });
  };

  const handlePageChange = (pageNumber: number, pageSize: number) => {
    setfilteredTodosObject((prevObj) => ({
      ...prevObj,
      currentPage: pageNumber,
      pageSize,
    }));
  };
  const filterTodos = () => {
    let searchParams: SearchParamsType = {
      pageSize: `${filteredTodosObject.pageSize}`,
      currentPage: `${filteredTodosObject.currentPage}`,
    };
    setSearchParams(searchParams);

    dispatch(
      GetTodoList({
        params: {
          pageSize: filteredTodosObject.pageSize,
          pageNumber: filteredTodosObject.currentPage - 1,
        },
      })
    )
      .then((data) => {
        if (data.payload) {
          setEditedTodo(data.payload.data);
        }
      })
      .catch((error) => {
        message.error("Failed to fetch todo list:", error);
      });
  };
  useEffect(() => {
    filterTodos();
  }, [filteredTodosObject]);
  return (
    <>
      <>
        <EditTodoModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedTodo={selectedTodo}
          loading={editLoading}
          handleEditTodo={handleEditTodo}
        />
      </>
      <div className="content">
        <Row align={"middle"}>
          <Col xs={{ span: 8 }}>
            <h3>Todo List ({todos.total_count})</h3>
          </Col>
          <Col xs={{ span: 16 }}>
            <Row justify={"end"} align={"middle"}>
              <Pagination
                showSizeChanger
                current={filteredTodosObject.currentPage}
                onChange={handlePageChange}
                total={todos.total_count}
                pageSize={filteredTodosObject.pageSize}
                itemRender={(currentPage, type, originalElement) => {
                  if (type === "page") {
                    return (
                      <a
                        style={
                          currentPage === filteredTodosObject.currentPage
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
        <Row className="table-content" style={{ marginTop: "1.5rem" }}>
          <Col xs={{ span: 24 }}>
            <Table
              loading={todos.isLoading}
              columns={columns}
              dataSource={editedTodos}
              scroll={{ x: "100%" }}
              rowKey="id"
              bordered={true}
              pagination={false}
              // size="middle"
              sticky
              //   style={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? 'white' : 'black' }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
