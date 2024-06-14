import { Row, Col, Table, Button, Input, message } from "antd";
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

export default function TodoTable() {
  const todos = useAppSelector((state: RootState) => state.todosReducer);
  const [toggleTodo, setToggleTodo] = useState<boolean>(false);
  const [toggleTodoId, setToggleTodoId] = useState<string>();
  const [editedTodos, setEditedTodo] = useState<TodoType[]>([]);

  const dispatch = useAppDispatch();
  const handleDeleteRow = (record: TodoType) => {
    dispatch(DeleteTodoByIdThunk({ id: record.id }))
      .then((data) => {
        if (data.payload) {
          const updatedData = editedTodos.filter(
            (todo) => todo.id !== record.id
          );
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
      render: (_, __, index: number) => `${index + 1}.`,
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
                backgroundColor:  "white",
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
                color:  "black",
              }}
            />
          </Col>
        </Row>
      ),
    },
  ];
  useEffect(() => {
    dispatch(GetTodoList())
      .then((data) => {
        if (data.payload) {
          setEditedTodo(data.payload.data);
        }
      })
      .catch((error) => {
        message.error("Failed to fetch todo list:", error);
      });
  }, []);
  return (
    <>
    <div className="content">
      <Row className="table-content">
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
