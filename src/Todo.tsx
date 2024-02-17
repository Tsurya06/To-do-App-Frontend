import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Input } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import "./styles.css"; // Import the CSS file for dark mode
import Cookies from "js-cookie";


interface TodoList {
  id: number;
  text: string;
  isEditable?: boolean;
  taskNo: number;
  title: string;
}

export const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<TodoList[]>([]);
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleClick = () => {
    text.trim();
    title.trim();
    if (text !== "" && title !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: text,
          isEditable: false,
          taskNo: todos.length + 1,
          title: title,
        },
      ]);
    }
    setText("");
    setTitle("");
  };

  const clearHandleClick = () => {
    setTodos([]);
  };

  const onChangeInput = (str: React.ChangeEvent<HTMLInputElement>) => {
    setText(str.target.value);
  };

  const editTodo = (id: number) => {
    setTodos(
      todos.map((prev) => {
        if (prev.id === id) {
          return { ...prev, isEditable: true };
        }
        return prev;
      })
    );
  };

  const updateTodo = (id: number, newText: string, newTitle: string) => {
    setTodos(
      todos.map((prev) => {
        if (prev.id === id) {
          return {
            ...prev,
            text: newText,
            title: newTitle,
          };
        }
        return prev;
      })
    );
  };

  const saveEdited = (id: number, updatedTitle: string) => () => {
    setTodos(
      todos.map((prev) => {
        if (prev.id === id) {
          return {
            ...prev,
            isEditable: false,
            title: updatedTitle,
          };
        }
        return prev;
      })
    );
  };

  const deleteTodo = (id: number) => () => {
    console.log(
      "Task with id : ",
      id,
      " is deleted",
      todos.filter((todo) => todo.id === id)
    );
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

 

  const handleTitleOnChange = (title: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(title.target.value);
  };

  useEffect(() => {
    console.log("Setting todos in cookies:", todos);
    Cookies.set("todos", JSON.stringify(todos));
  }, [todos]);
  
  useEffect(() => {
    const storedTodos = Cookies.get("todos");
    console.log("Retrieved todos from cookies:", storedTodos);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  
  
  return (
    <div className={`container mt-5 ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body" >
              <h1 className="card-title text-center" >To Do App</h1>
              <div className="task-list">
                <div className="table-responsive mt-4"  >
                <form className="form-control mt-3"  >
                  <Input
                    value={title}
                    placeholder="Title"
                    className="mt-3"
                    name="title"
                    onChange={handleTitleOnChange}
                    style={{
                      width: "20%",
                      margin: "5px",
                      float: "left"
                    }}
                    required
                  />
                  <Input
                    value={text}
                    placeholder="Enter your task"
                    name="tasks"
                    onChange={onChangeInput}
                    style={{
                      width: "100%",
                      margin: "5px",
                    }}
                  />
                  <div style={{ float: "right" }}>
                    <Button
                      type="primary"
                      className="mt-3"
                      onClick={handleClick}
                      icon={<CheckOutlined />}
                      name="Add"
                    ></Button>&nbsp;
                    <Button
                      type="primary"
                      className="mt-3"
                      onClick={clearHandleClick}
                      icon={<DeleteOutlined />}
                    >
                      All
                    </Button>&nbsp;
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

                
                <div className="table-responsive mt-4" style={{ maxHeight: "300px", overflowY: "auto" ,borderRadius: '3px'}}>
                  <table className="table" style={{height:'90%'}}>
                    <thead>
                      <tr>
                        <th>Task No.</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todos.map((todo, index) => (
                        <tr key={todo.id}>
                          <td>{index + 1}.</td>
                          <td>
                            {/* this part will edit the task */}
                            {todo.isEditable === true ? (
                              <div>
                                <Input.TextArea
                                  value={todo.text}
                                  onChange={(e) =>
                                    updateTodo(
                                      todo.id,
                                      e.target.value,
                                      todo.title
                                    )
                                  }
                                  style={{ width: "100%", margin: "5px", height: "100%" }}
                                />
                                <Button
                                  type="primary"
                                  onClick={saveEdited(todo.id, todo.title)}
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
                                    onClick={() => editTodo(todo.id)}
                                    icon={<EditOutlined />}
                                  />&nbsp;
                                  <Button
                                    type="primary"
                                    onClick={deleteTodo(todo.id)}
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
