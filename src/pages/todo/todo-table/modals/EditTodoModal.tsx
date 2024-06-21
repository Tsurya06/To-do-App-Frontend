import { Modal, Divider, Row, Col, Input, DatePicker, Button } from "antd";
import { TodoType } from "../../../../types/apiResponseType";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export type EditTodoModalProps = {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    loading: boolean;
    selectedTodo?: TodoType ;
    handleEditTodo: (editedTodos: TodoType, id: string) => void;
};

export default function EditTodoModal({
    modalOpen,
    setModalOpen,
    loading,
    selectedTodo,
    handleEditTodo,
}: EditTodoModalProps) {
  const [editTodo, setEditTodo] = useState<TodoType>();
  useEffect(() => {
    setEditTodo(selectedTodo);
  }, [selectedTodo]);
  return (
    <>
      <Modal
          centered
          open={modalOpen}
          title="Edit Todo"
          closable={!loading}
          maskClosable={!loading}
          confirmLoading={true}
          footer={false}
          onCancel={() => setModalOpen(false)}
        >
          <Divider />
          <Row justify={"space-evenly"}>
            <Col span={6}>
              <Input
                value={editTodo?.title}
                onChange={(e) => {
                  setEditTodo(prevTodo => {
                    return {
                      ...prevTodo,
                      title: e.target.value
                    };
                  });
                }}
                placeholder="Title"
              />
            </Col>
            <Col span={6}>
              <DatePicker 
                allowClear={false}
                value={dayjs(editTodo?.date,"DD-MM-YYYY")}
                format={"DD-MM-YYYY"}
                placeholder="Date"
                onChange={(date) => {
                  setEditTodo(prevTodo => {
                    return {
                      ...prevTodo,
                      date: date.format("DD-MM-YYYY"),
                    };
                  });
                }} />
            </Col>
          </Row>
          <Row justify={"start"} style={{ marginTop: "0.5rem" }}>
            <Col span={24}>
              <Input.TextArea
                style={{height:'10rem'}}
                value={editTodo?.description}
                onChange={(e) => {
                setEditTodo(prevObj=>{
                  return {
                    ...prevObj,
                    description:e.target.value,
                  }
                })
                }}
                placeholder="Description"
              />
            </Col>
          </Row>
          <Divider />
          <Row justify={"end"} gutter={16}>
            <Col>
              <Button
                loading={loading}
                onClick={() => {
                  handleEditTodo(editTodo!, editTodo?.id!);
                }}
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  color: "black",
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                danger
                style={{
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  color: "white",
                }}
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal>
    </>
  )
}

