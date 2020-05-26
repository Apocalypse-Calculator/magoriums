import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { ItemTable } from "./components/Table";
import { Button } from "../../components";
import Modal from "antd/lib/modal/Modal";
import { Form, Input } from "antd";
import definitions from "./data";
import * as API from "../../api/api";

const Container = styled.div`
  background: #fff;
  padding: 24px;
  min-height: 600px;
  flex: 1 1 auto;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
`;

export const Home = () => {
  const [state, setState] = useState({
    visible: false,
    confirmLoading: false,
    modelText: "Content of the modal",
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await API.fetchItemDeinitions();
      setItems(data);
    };
    fetchData();
  }, [setItems]);

  const [form] = Form.useForm();

  //   const items = definitions.map((definition) => {
  //     const { deleted, name, unit, averageConsumption } = definition;
  //     return { deleted, name, unit, averageConsumption };
  //   });

  const showModal = () => {
    setState({ ...state, visible: true });
  };

  const onFinish = () => console.log("finished");
  const onFinishFailed = () => console.log("finishFailed");
  const handleOk = () => {
    setState({ ...state, confirmLoading: true, modelText: "closing ..." });
    setTimeout(() => {
      setState({ ...state, confirmLoading: false, visible: false });
    });
  };

  const handleCancel = () => {
    setState({ ...state, visible: false });
  };

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        handleOk();
      })
      .catch((info) => console.log("Validation failed: ", info));
  };

  const { visible, confirmLoading, modelText } = state;

  return (
    <Container>
      <ControlContainer>
        <Button onClick={showModal} size="large">
          Add New Item
        </Button>
      </ControlContainer>

      <Modal
        closable={true}
        Title="Add New Item"
        visible={visible}
        confirmLoading={confirmLoading}
        okText="Create"
        cancelText="Cancel"
        onOk={handleCreate}
        onCancel={handleCancel}
      >
        <p>
          <Form
            form={form}
            layout="vertical"
            name="new-item"
            id="new-item-form"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "item name is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Unit"
              name="unit"
              rules={[{ required: true, message: "item unit is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="ConsumptionAverage"
              name="consumptionAverage"
              rules={[
                {
                  required: true,
                  message: "Enter average of consumption for this item",
                },
                {
                  type: "number",
                  message: "average consumption should be a positive number",
                },
                {
                  min: 0,
                  message: "average consumption should be more than 0",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </p>
      </Modal>
      <ItemTable items={items} />
    </Container>
  );
};
