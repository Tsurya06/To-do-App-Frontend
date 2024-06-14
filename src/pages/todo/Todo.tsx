import React, { useState } from "react";
import { Button, Col, DatePicker, Input, Row, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import {
  CreateTodoThunk,
} from "../../store/features/todo/TodoThunk";
import { useAppDispatch } from "../../store/store";
import { TodoType } from "../../types/apiResponseType";

export const TodoApp: React.FC = () => {
  const [todoAdded, setTodoAdded] = useState(false);
  const inititalTodoObject = {
    title: "",
    description: "",
    date: "",
  };
  const [todoObject,setTodoObject] = useState<TodoType>(inititalTodoObject);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (todoObject?.title!.trim() !== "" && todoObject?.description!.trim() !== "" && todoObject?.date) {
      const body = todoObject;
      setLoading(true);
      dispatch(CreateTodoThunk({ body: body }))
        .then(() => {
          setTodoObject({ title: "", description: "", date: "" });
          setTodoAdded(!todoAdded);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          message.error("Add karte time kuchh to fata hai!");
        });
    }
    else{
      message.error("Please fill all the fields!");
    }
  };


  return (
    <div className="content">
      {/* <Breadcrumb items={[]} />
        <Row align={'middle'}>
          <Col flex="none">
            <Button
              icon={<ArrowLeftOutlined />}
              style={{ marginRight: '0.5rem' }}
              onClick={() => {
                // navigate(-1);
              }}
            ></Button>
          </Col>
          <Col flex="auto">
            <h3>Add Stock Transfer</h3>
          </Col>
        </Row> */}
      <Row justify={"center"}>
        {/* <Button
          onClick={toggleDarkMode}
          style={{
            backgroundColor: darkMode ? "#333" : "white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            color: darkMode ? "white" : "black",
          }}
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button> */}

      </Row>
      <Row justify={"center"}>
        <Row justify={"space-between"} style={{ margin: "1rem", width: "100%"}}>
         
          <Col span={8}>
            <Input
              placeholder="Title"
              value={todoObject.title}
              onChange={(e) => {
                setTodoObject({ ...todoObject, title: e.target.value });
              }}
              style={{
                border: "1px solid gray",
               
              }}
            />
          </Col>
          <Col span={6}>
            <DatePicker
              placeholder="Select Date"
              format={"DD-MM-YYYY"}
              onChange={(_,dateString:any) => {
                setTodoObject({ ...todoObject, date: dateString });
              }}
              style={{
                width: "100%",
                border: "1px solid gray",
              }}
            />
          </Col>
        </Row>
        <Row justify={"start"} style={{ margin: "1rem", width: "100%",height:'570px', overflowX:'hidden',overflowY:'auto' }}>
          <Col span={24}>
            <Input.TextArea
              style={{
                height: "100%",
                width: "100%",
                
                border: "1px solid gray",
              }}
              placeholder="Enter your task"
              value={todoObject.description}
              onChange={(e) => setTodoObject({ ...todoObject, description: e.target.value })}
            />
          </Col>
        </Row>
        <Row justify={"center"} style={{ width: "100%", margin: "1rem", marginTop:'1rem' }}>
          <Col>
            <Button
              loading={loading}
              onClick={handleAddTodo}
              icon={<CheckOutlined />}
              style={{
                backgroundColor: "white",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                color:  "black",
                border: "1px solid gray",
              }}
            >
              Add Todo
            </Button>
          </Col>
        </Row>
      </Row>
    </div>
  );
};
