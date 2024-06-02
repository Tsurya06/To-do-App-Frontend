import React, {
  useEffect,
  useState,
} from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Table,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { TodoType } from "../../types/apiResponseType";
import {
  CreateTodoThunk,
  DeleteTodoByIdThunk,
  EditTodoThunk,
  GetTodoList,
} from "../../store/features/todo/TodoThunk";
import { ColumnsType } from "antd/es/table";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
export const TodoApp: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [toggleTodo, setToggleTodo] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [todoAdded, setTodoAdded] = useState(false);
  const [toggleTodoId, setToggleTodoId] = useState<string>();
  const [editedTodos, setEditedTodo] = useState<TodoType[]>([]);
  const todos = useAppSelector((state: RootState) => state.todosReducer);
  const dispatch = useAppDispatch();
 

  const handleAddTodo = () => {
    if (title.trim() !== "" && description.trim() !== "") {
      const body = { title, description };
      dispatch(CreateTodoThunk({ body: body }))
        .then(() => {
          setTitle("");
          setDescription("");
          setTodoAdded(!todoAdded);
        })
        .catch(() => {
          message.error("Add karte time kuchh to fata hai!");
        });
    }
  };

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
              style={{backgroundColor:'white', boxShadow:'0 4px 10px rgba(0, 0, 0, 0.1)', color:'black'}}
            />
          </Col>
          <Col>
            <Button
              onClick={() => handleDeleteRow(record)}
              icon={<DeleteOutlined />}
              style={{backgroundColor:'white', boxShadow:'0 4px 10px rgba(0, 0, 0, 0.1)', color:'black'}}
            />
          </Col>
        </Row>
      ),
    },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  useEffect(() => {
    dispatch(GetTodoList({ body: {} }))
      .then((data) => {
        if (data.payload) {
          setEditedTodo(data.payload.data);
        }
      })
      .catch((error) => {
        message.error("Failed to fetch todo list:", error);
      });
  }, [todoAdded]);

  return (
    <>
      <Row justify={"center"}>
        <Button onClick={toggleDarkMode} style={{backgroundColor:'white', boxShadow:'0 4px 10px rgba(0, 0, 0, 0.1)', color:'black'}}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Col span={6}>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Col>
        </Col>
        <Col span={24}>
          <Input.TextArea
            style={{ height: "200px", width: "100%" }}
            placeholder="Enter your task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
      </Row>
      <Row justify={"center"} style={{ marginTop: "1rem" }} gutter={[8, 8]}>
        <Col>
          <Button
            onClick={handleAddTodo}
            icon={<CheckOutlined />}
            style={{backgroundColor:'white', boxShadow:'0 4px 10px rgba(0, 0, 0, 0.1)', color:'black'}}
          >
            Add
          </Button>
        </Col>
      </Row>

      <Row style={{marginTop:'2rem', overflow:'auto'}}>        
      <Table
        loading={todos.isLoading}
        columns={columns}
        dataSource={editedTodos ? editedTodos : []}
        scroll={{ x: "100%" }}
        rowKey="id"
        bordered={true}
        pagination={false}
        size="middle"
        sticky
      />
      </Row>
    </>
  );
};
