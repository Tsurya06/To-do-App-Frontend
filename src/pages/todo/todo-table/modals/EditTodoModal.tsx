import { Modal, Divider, Row, Col, Input, DatePicker, Button } from "antd";
import { TodoType } from "../../../../types/apiResponseType";

export type EditTodoModalProps = {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    loading: boolean;
    selectedTodo?: TodoType ;
    editedTodos: TodoType[];
    setEditedTodo?: (value: TodoType[]) => void;
    handleEditTodo: (editedTodos: TodoType[], id: string) => void;
};

export default function EditTodoModal({
    modalOpen,
    setModalOpen,
    loading,
    selectedTodo,
    editedTodos,
    setEditedTodo,
    handleEditTodo,
}: EditTodoModalProps) {
  return (
    <>
      <Modal
          centered
          open={modalOpen}
          title="Edit Todo"
          closable={loading}
          maskClosable={loading}
          confirmLoading={true}
          footer={false}
        >
          <Divider />
          <Row justify={"space-evenly"}>
            <Col span={6}>
              <Input
                value={selectedTodo?.title}
                onChange={(e) => {
                //   setEditedTodo((prevObj) =>
                //     prevObj.map((todo) =>
                //       todo.id === selectedTodo?.id
                //         ? { ...todo, title: e.target.value }
                //         : todo
                //     )
                //   );
                }}
                placeholder="Title"
              />
            </Col>
            <Col span={6}>
              <DatePicker placeholder="Date" />
            </Col>
          </Row>
          <Row justify={"start"} style={{ marginTop: "0.5rem" }}>
            <Col span={24}>
              <Input
                value={selectedTodo?.description}
                onChange={(e) => {
                //   setEditedTodo((prevObj) => {
                //     return prevObj.map((itr) => {
                //       if (itr.id === selectedTodo?.id)
                //         return {
                //           ...itr,
                //           description: e.target.value,
                //         };
                //       return itr;
                //     });
                //   });
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
                  handleEditTodo(editedTodos, selectedTodo?.id!);
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

