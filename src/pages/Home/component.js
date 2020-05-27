import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { ItemTable } from "./components/Table";
import { Button } from "../../components";
import Modal from "antd/lib/modal/Modal";
import { Form, Input, InputNumber } from "antd";
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

  const showModal = () => {
    setState({ ...state, visible: true });
  };

  const handleOk = (values) => {
    console.log(values);
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
        API.createItemDefinition(values);
        handleOk(values);
      })
      .catch((info) => console.log("Validation failed: ", info));
  };

  const { visible, confirmLoading } = state;

  return (
    <Container>
      <ControlContainer>
        <Button onClick={showModal} size="large" type="primary">
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
              label="Average Consumption"
              name="averageConsumption"
              rules={[
                {
                  required: true,
                  message: "Enter average of consumption for this item",
                },
                {
                  type: "number",
                  message: "average consumption should be a positive number",
                },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Form>
        </p>
      </Modal>
      <ItemTable items={items} />
    </Container>
  );
};
