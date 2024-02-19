import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Input } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import "./styles.css"; // Import the CSS file for dark mode
// import Cookies from "js-cookie";
import { useDispatch, useSelector,  } from "react-redux";
import { addTodo, deleteTodoById, toggleTodo, updateTodo } from "../reducers/todoReducer";
import { Todo } from "../modals/type";
import { RootState } from "../store";



export const TodoApp: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const todos = useSelector((state: RootState) => state.todosReducer);
  const dispatch= useDispatch();

  const handleAddTodo = () => {
    if (title.trim() !== '' && text.trim() !== '') {
      dispatch(addTodo({title,text}));
      setText('');
      setTitle('');
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // const handleTitleOnChange = (title: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(title.target.value);
  // };

  // useEffect(() => {
  //   // console.log("Setting todos in cookies:", todos);
  //   if(todos.length!==0)
  //   Cookies.set("todos", JSON.stringify(todos));
  // }, [todos]);

  // useEffect(() => {
  //   const storedTodos = Cookies.get("todos");
  //   // console.log("Retrieved todos from cookies:", storedTodos);
  //   if (storedTodos) {
  //     const storedTodo= JSON.parse(storedTodos);
  //     setTodo(storedTodo);
  //   }
  // }, []);

  return (
    <div className={`container mt-5 ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">To Do App</h1>
              <div className="task-list">
                <div className="table-responsive mt-4">
                  <form className="form-control mt-3">
                    <Input
                      value={title}
                      placeholder="Title"
                      className="mt-3"
                      name="title"
                      onChange={e => setTitle(e.target.value)}
                      style={{
                        width: "20%",
                        margin: "5px",
                        float: "left",
                      }}
                      required
                    />
                    <Input
                      value={text}
                      placeholder="Enter your task"
                      name="tasks"
                      onChange={e=> setText(e.target.value)}
                      style={{
                        width: "100%",
                        margin: "5px",
                      }}
                    />
                    <div style={{ float: "right" }}>   
                      <Button
                        type="primary"
                        className="mt-3"
                        onClick={handleAddTodo}
                        icon={<CheckOutlined />}
                        name="Add"
                      ></Button>
                      &nbsp;
                      {/* <Button
                        type="primary"
                        className="mt-3"
                        // onClick={clearHandleClick}
                        icon={<DeleteOutlined />}
                      >
                        All
                      </Button>
                      &nbsp; */}
                      <Button
                        type="primary"
                        className="mt-2"
                        onClick={toggleDarkMode}
                      >
                        {darkMode ? <i>Light Mode</i> : <i>Dark Mode</i>}
                      </Button>
                    </div>
                  </form>
                </div>

                <div
                  className="table-responsive mt-4"
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    borderRadius: "3px",
                  }}
                >
                  <table className="table" style={{ height: "90%" }}>
                    <thead>
                      <tr>
                        <th style={{width: '20%'}}>Task No.</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todos.map((todo, index) => (
                        <tr key={todo.id}>
                          <td>{index + 1}.</td>
                          <td>
                            {/* this part will edit the task */}
                            {todo.completed === true ? (
                              <div>
                                <Input
                                  value={todo.title}
                                  placeholder="Title"
                                  className="mt-3"
                                  name="title"
                                  onChange={e => handleUpdateTodo(todo.id, e.target.value!,todo.text!)}
                                  style={{
                                    width: "20%",
                                    margin: "5px",
                                    float: "left",
                                  }}
                                  required
                                />
                                <Input.TextArea
                                  value={todo.text}
                                  onChange={e => handleUpdateTodo(todo.id, todo.title!,e.target.value!)}
                                  style={{
                                    width: "100%",
                                    margin: "5px",
                                    height: "100%",
                                  }}
                                />
                                <Button
                                  type="primary"
                                  onClick={()=> {
                                    handleUpdateTodo(todo.id, todo.title!, todo.text!);
                                    handleToggleTodo(todo.id); 
                                  }}
                                  style={{ float: "right" }}
                                  icon={<CheckOutlined />}
                                  name="Save-Edited"
                                />
                                
                              </div>
                            ) : (
                              <div style={{ overflow: "auto" }}>
                                <div style={{ float: "left", margin: "5px" }}>
                                  {/* {todo.text} */}
                                  {todo.title}
                                </div>
                                <div style={{ float: "right" }}>
                                  <Button
                                    type="primary"
                                    onClick={() => handleToggleTodo (todo.id)}
                                    icon={<EditOutlined />}
                                  />
                                  &nbsp;
                                  <Button
                                    type="primary"
                                    onClick={()=>handleDeleteTodo(todo.id)}
                                    icon={<DeleteOutlined />}
                                  />
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
