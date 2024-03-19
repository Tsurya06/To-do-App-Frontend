import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Form, Input, Row, Table } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import "./styles.css";


import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodoById,
  toggleTodo,
  updateTodo,
} from "../reducers/todoReducer";
import { Todo } from "../modals/type";
import { RootState } from "../store";
import ReactSignatureCanvas from "react-signature-canvas";

export const TodoApp: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const todos = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  const [sigCanvas, setSigCanvas] = useState<ReactSignatureCanvas | null>(null);

  const clearCanvas = () => {
    if (sigCanvas) {
      sigCanvas.clear();
    }
  };
  const handleAddTodo = (values: { title: string; text: string }) => {
    if (values.title.trim() !== "" && values.text.trim() !== "") {
      dispatch(addTodo({ title: values.title, text: values.text }));
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodoById(id));
  };

  const handleUpdateTodo = (id: number, newTitle: string, newText: string) => {
    dispatch(updateTodo({ id, title: newTitle, text: newText }));
  };

  const columns = [
    {
      title: "Task No.",
      dataIndex: "id",
      key: "id",
      width: "5rem",
      render: (text: any, record: Todo, index: number) => `${index + 1}.`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Todo) => (
        <div>
          <div>
            {record.completed ? (
              <div>
                <Input
                  value={record.title}
                  placeholder="Title"
                  onChange={(e) =>
                    handleUpdateTodo(record.id, e.target.value, record.text!)
                  }
                  style={{ width: "20%", margin: "5px", float: "left" }}
                  required
                />
                <Input.TextArea
                  value={record.text}
                  onChange={(e) =>
                    handleUpdateTodo(record.id, record.title!, e.target.value)
                  }
                  style={{ width: "100%", margin: "5px", height: "100%" }}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    handleUpdateTodo(record.id, record.title!, record.text!);
                    handleToggleTodo(record.id);
                  }}
                  style={{ float: "right" }}
                  icon={<CheckOutlined />}
                  name="Save-Edited"
                />
              </div>
            ) : (
              <div style={{ overflow: "auto" }}>
                <div style={{ float: "left", margin: "5px" }}>
                  {record.title}
                </div>
                <div style={{ float: "right" }}>
                  <Button
                    type="primary"
                    onClick={() => handleToggleTodo(record.id)}
                    icon={<EditOutlined />}
                  />
                  &nbsp;
                  <Button
                    type="primary"
                    onClick={() => handleDeleteTodo(record.id)}
                    icon={<DeleteOutlined />}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);

  const saveSignature = () => {
    if (sigCanvas) {
      const signatureData = sigCanvas.toDataURL();
      setSignatureUrl(signatureData);
    }
  };
  const renderSignaturePreview = () => {
    if (signatureUrl) {
      return <img src={signatureUrl} alt="Signature Preview" />;
    }
    return null;
  };



  return (
    <div className={`container mt-5 ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">To Do App</h1>
              <div className="task-list">
                <div
                  className="table-responsive mt-4"
                  style={{ height: "30vh" }}
                >
                  <Form
                    onFinish={handleAddTodo}
                    layout="inline"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Row gutter={34}>
                      <Col span={6}>
                        <Form.Item
                          name="title"
                          rules={[
                            {
                              required: true,
                              message: "Please input the title!",
                            },
                          ]}
                        >
                          <Input placeholder="Title" />
                        </Form.Item>
                      </Col>
                      <Col span={15}>
                        <Form.Item
                          name="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input the task!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter your task" />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            icon={<CheckOutlined />}
                          >
                            Add
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                  <div className="signature-pad" style={{border: '1px  gray'}}>
                    <ReactSignatureCanvas
                      ref={(ref) => setSigCanvas(ref)}
                      penColor="black"
                      canvasProps={{
                        width: 600,
                        height: '150%',
                        className: "sigCanvas",
                      }}
                      
                    />
                  </div>
                  <Row style={{marginTop: '0.5rem'}}>
                    <Col span={12}>
                      <Button onClick={clearCanvas}>Clear</Button>
                    </Col>
                    <Col span={12}>
                      <Button onClick={saveSignature}>Save</Button>
                    </Col>
                  </Row>
                  {renderSignaturePreview()}
                </div>
                <div
                  className="table-responsive mt-4"
                  style={{
                    height: "300px",
                    overflowY: "auto",
                    borderRadius: "3px",
                  }}
                >
                  <Table
                    dataSource={todos}
                    scroll={{ y: "70%" }}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    size="middle"
                    sticky
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <Button onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
      </div>
    </div>
  );
};
