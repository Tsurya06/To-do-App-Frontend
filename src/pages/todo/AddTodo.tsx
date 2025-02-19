// import React, { useState } from "react";
// import { Button, Col, DatePicker, Input, Row, message } from "antd";
// import { CheckOutlined } from "@ant-design/icons";
// import {
//   CreateTaskThunk,
// } from "../../store/features/task/TaskThunk";
// import { useAppDispatch } from "../../store/store";
// import { TaskType } from "../../types/apiResponseType";

// export const AddTodo: React.FC = () => {
//   const [todoAdded, setTodoAdded] = useState(false);
//   const inititalTodoObject = {
//     title: "",
//     description: "",
//     date: "",
//   };
//   const [todoObject,setTodoObject] = useState<TaskType>(inititalTodoObject);
//   const [loading, setLoading] = useState<boolean>(false);
//   const dispatch = useAppDispatch();

//   const handleAddTodo = () => {
//     if (todoObject?.title!.trim() !== "" && todoObject?.description!.trim() !== "" && todoObject?.date) {
//       const body = {
//         title: todoObject.title,
//         description: todoObject.description,
//         date: todoObject.date,
//       }
//       setLoading(true);
//       dispatch(CreateTaskThunk({ body: body }))
//         .then((data) => {
//           if(data.payload.success){
//           setTodoObject(inititalTodoObject);
//           setTodoAdded(!todoAdded);
//           }
//           setLoading(false);
//         })
//         .catch(() => {
//           setLoading(false);
//           message.error("Add karte time kuchh to fata hai!");
//         });
//     }
//     else{
//       message.error("Please fill all the fields!");
//     }
//   };


//   return (
//     <div className="content">
//       <Row justify={"center"}>
//         <Row justify={"space-between"} style={{ margin: "1rem", width: "100%"}}>
         
//           <Col span={8}>
//             <Input
//               placeholder="Title"
//               value={todoObject.title}
//               onChange={(e) => {
//                 setTodoObject({ ...todoObject, title: e.target.value });
//               }}
//               style={{
//                 border: "1px solid gray",
               
//               }}
//             />
//           </Col>
//           <Col span={6}>
//             <DatePicker
//               placeholder="Select Date"
//               format={"DD-MM-YYYY"}
//               onChange={(date) => {
//                 setTodoObject((prevObj) => ({
//                   ...prevObj,
//                   date: date?.format("DD-MM-YYYY"),
//                 }));
//               }}
//               style={{
//                 width: "100%",
//                 border: "1px solid gray",
//               }}
//             />
//           </Col>
//         </Row>
//         <Row justify={"start"} style={{ margin: "1rem", width: "100%",height:'40vh', overflowX:'hidden',overflowY:'auto' }}>
//           <Col span={24}>
//             <Input.TextArea
//               style={{
//                 height: "100%",
//                 width: "100%",
                
//                 border: "1px solid gray",
//               }}
//               placeholder="Enter your task"
//               value={todoObject.description}
//               onChange={(e) => setTodoObject({ ...todoObject, description: e.target.value })}
//             />
//           </Col>
//         </Row>
//         <Row justify={"center"}>
//           <Col span={24}>
//             <Button
//               loading={loading}
//               onClick={handleAddTodo}
//               icon={<CheckOutlined />}
//               style={{
//                 backgroundColor: "white",
//                 boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//                 color:  "black",
//                 border: "1px solid gray",
//               }}
//             >
//               Add Todo
//             </Button>
//           </Col>
//         </Row>
//       </Row>
//     </div>
//   );
// };
