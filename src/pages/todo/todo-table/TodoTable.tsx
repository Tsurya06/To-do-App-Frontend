import { Row, Col, Table, Button, Input, message, Pagination } from "antd";
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
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
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
  const [toggleTodo, setToggleTodo] = useState<boolean>(false);
  const [toggleTodoId, setToggleTodoId] = useState<string>();
  const [editedTodos, setEditedTodo] = useState<TodoType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredTodosObject, setfilteredTodosObject] =
    useState<FilterTodoObjectType>({
      pageSize: parseInt(searchParams.get('pageSize') ?? "10"),
      currentPage: parseInt(searchParams.get('currentPage') ?? "1"),
    });
  const dispatch = useAppDispatch();
  const handleDeleteRow = (record: TodoType) => {
    dispatch(DeleteTodoByIdThunk({ id: record.id }))
      .then((data) => {
        if (data.payload) {
          const updatedData = editedTodos.filter(
            (todo) => todo.id !== record.id
          );
          filterTodos();
          setEditedTodo(updatedData);
        }
      })
      .catch((error) => {
        message.error("Failed to delete todo:", error);
      });
  };

  const handleEditTodo = (editedTodos: TodoType[], id: string) => {
    const todoItem = editedTodos.find((todo) => todo.id === id);

    if (!todoItem) {
      return message.error("Todo not found in the database!");
    }

    const payloadBody = {
      id: todoItem.id,
      title: todoItem.title,
      description: todoItem.description,
    };

    dispatch(EditTodoThunk({ body: payloadBody, id: id }))
      .then((data) => {
        if (data.payload) {
          setToggleTodo(false);
          setToggleTodoId(undefined);
          filterTodos();
        }
      })
      .catch((error) => {
        message.error("Failed to edit todo:", error);
      });
  };
  const columns: ColumnsType<TodoType> = [
    {
      title: "Task No.",
      key: "id",
      width: "5rem",
      render: (_, __, index: number) => filteredTodosObject.currentPage! * filteredTodosObject.pageSize! - filteredTodosObject.pageSize! + index + 1 ,
    },
    {
      title: <div style={{ textAlign: "center" }}>Title</div>,
      key: "title",
      width: "10rem",
      render: (record: TodoType) => {
        return (
          <>
            {toggleTodo && toggleTodoId === record.id ? (
              <>
                <Input
                  value={record.title}
                  onChange={(e) => {
                    setEditedTodo((prevObj) =>
                      prevObj.map((todo) =>
                        todo.id === toggleTodoId
                          ? { ...todo, title: e.target.value }
                          : todo
                      )
                    );
                  }}
                />
              </>
            ) : (
              <>{record.title}</>
            )}
          </>
        );
      },
    },
    {
      title: <div style={{ textAlign: "center" }}>Description</div>,
      key: "description",
      render: (record: TodoType) => {
        return (
          <>
            {toggleTodo && toggleTodoId === record.id ? (
              <>
                <Input
                  value={record.description}
                  onChange={(e) => {
                    setEditedTodo((prevObj) =>
                      prevObj.map((todo) =>
                        todo.id === toggleTodoId
                          ? { ...todo, description: e.target.value }
                          : todo
                      )
                    );
                  }}
                />
              </>
            ) : (
              <>{record.description}</>
            )}
          </>
        );
      },
    },
    {
      title: <div style={{ textAlign: "center" }}>Date</div>,
      key: "date",
      width: "10rem",
      render: (record: TodoType) => {
        return (
          <>
            {toggleTodo && toggleTodoId === record.id ? (
              <>
                <Input
                  value={record.date}
                  onChange={(e) => {
                    setEditedTodo((prevObj) =>
                      prevObj.map((todo) =>
                        todo.id === toggleTodoId
                          ? { ...todo, date: e.target.value }
                          : todo
                      )
                    );
                  }}
                />
              </>
            ) : (
              <>{record.date}</>
            )}
          </>
        );
      },
    },
    {
      title: <div style={{ textAlign: "center" }}>Action</div>,
      key: "action",
      width: "7rem",
      render: (record: TodoType) => (
        <Row justify={"center"} gutter={[16, 16]}>
          <Col>
            <Button
              onClick={() => {
                if (toggleTodo && toggleTodoId === record.id) {
                  // Save changes
                  handleEditTodo(editedTodos, record.id || "");
                } else {
                  // Toggle edit mode
                  setToggleTodo(true);
                  setToggleTodoId(record.id);
                }
              }}
              icon={
                toggleTodo && record.id === toggleTodoId ? (
                  <CheckOutlined />
                ) : (
                  <EditOutlined />
                )
              }
              style={{
                backgroundColor: "white",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                color: "black",
              }}
            />
          </Col>
          <Col>
            <Button
              onClick={() => handleDeleteRow(record)}
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
  const handlePageChange = (pageNumber: number, pageSize: number) => {
    setfilteredTodosObject((prevObj) => ({
      ...prevObj,
      currentPage:  pageNumber,
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
        params: { pageSize: filteredTodosObject.pageSize, pageNumber: filteredTodosObject.currentPage-1},
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
  }, [filteredTodosObject,todos.total_count]);
  return (
    <>
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
                  if (type === 'page') {
                    return <a style={currentPage === filteredTodosObject.currentPage ? { backgroundColor: 'whiter', color: 'black', border:'1px solid black', borderRadius:'4px' } : {}}>{currentPage}</a>;
                  }
                  return originalElement;
                }}
              />
            </Row>
          </Col>
        </Row>
        <Row className="table-content" style={{marginTop:'1.5rem'}}>
          <Col xs={{ span: 24 }}>
            <Table
              loading={todos.isLoading}
              columns={columns}
              dataSource={editedTodos}
              scroll={{ x: "100%" }}
              rowKey="id"
              bordered={true}
              pagination={false}
              size="middle"
              sticky
              //   style={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? 'white' : 'black' }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
