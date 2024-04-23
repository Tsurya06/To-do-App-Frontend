import React, {
  useEffect,
  //  useMemo,
  useState,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  //  Form, Image,
  Input,
  Row,
  Table,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import "./styles.css";
import { TodoType } from "../../types/apiResponseType";
// import ReactSignatureCanvas from "react-signature-canvas";
// import Modal from "antd/es/modal/Modal";
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
  // const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [editedTodos, setEditedTodo] = useState<TodoType[]>([]);
  const todos = useAppSelector((state: RootState) => state.todosReducer);
  const dispatch = useAppDispatch();
  // const [sigCanvas, setSigCanvas] = useState<ReactSignatureCanvas | null>(null);

  // const clearCanvas = () => {
  //   if (sigCanvas) {
  //     sigCanvas.clear();
  //   }
  // };

  // const handleUpdateTodo = (id: number, newTitle: string, newdescription: string) => {
  //   dispatch(updateTodo({ id, title: newTitle, description: newdescription }));
  // };

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
          // Filter out the deleted todo item
          const updatedData = editedTodos.filter(
            (todo) => todo.id !== record.id
          );
          // Update the state with the filtered array
          setEditedTodo(updatedData);
        }
      })
      .catch((error) => {
        message.error("Failed to delete todo:", error);
      });
  };
  const handleEditTodo = (editedTodos: TodoType[], id: string) => {
    // Find the todo item with the matching id
    const todoItem = editedTodos.find((todo) => todo.id === id);

    // If no matching todo item is found, return early
    if (!todoItem) {
      return message.error("Todo not found in the database!");
    }

    // Create the payload body with the single todo item
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
              type="primary"
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
            />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => handleDeleteRow(record)}
              icon={<DeleteOutlined />}
            />
          </Col>
        </Row>
      ),
    },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // const saveSignature = () => {
  //   if (sigCanvas) {
  //     const signatureData = sigCanvas.toDataURL();
  //     setSignatureUrl(signatureData);
  //   }
  // };
  // const renderSignaturePreview = () => {
  //   if (signatureUrl) {
  //     return (
  //       <Image
  //         src={signatureUrl}
  //         width={200}
  //         height={50}
  //         alt="Signature Preview"
  //       />
  //     );
  //   }
  //   return null;
  // };

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
  }, [todoAdded, dispatch]);

  return (
    <div className={`container mt-5 ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="row justify-content-center">
        <div>
          <div className="card">
            <div className="card-body" style={{ width: "100%" }}>
              <Row justify={"center"} className="description-center mt-4">
                <Button onClick={toggleDarkMode}>
                  {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </Button>
              </Row>
              <div style={{ textAlign: "center" }}>
                <h1>To Do App</h1>
              </div>

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
              <Row
                justify={"center"}
                style={{ marginTop: "1rem" }}
                gutter={[8, 8]}
              >
                <Col>
                  <Button
                    type="primary"
                    onClick={handleAddTodo}
                    icon={<CheckOutlined />}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
              {/* <div
                className="signature-pad"
                style={{ border: "1px  gray" }}
              >
                <ReactSignatureCanvas
                  ref={(ref) => setSigCanvas(ref)}
                  penColor="black"
                  canvasProps={{
                    width: 600,
                    height: "150%",
                    className: "sigCanvas",
                  }}
                />
              </div> */}
              {/* <Row style={{ marginTop: "0.5rem" }}>
                <Col span={12}>
                  <Button onClick={clearCanvas}>Clear</Button>
                </Col>
                <Col span={12}>
                  <Button onClick={saveSignature}>Save</Button>
                </Col>
              </Row>
              {renderSignaturePreview()} */}
            </div>
            <div
              className="table-responsive mt-4"
              style={{
                height: "40vh",
                overflowY: "auto",
                width: "100%",
                borderRadius: "5px",
              }}
            >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
