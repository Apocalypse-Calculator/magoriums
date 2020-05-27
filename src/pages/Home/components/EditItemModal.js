import React from "react";
import { Form, Input, Modal } from "antd";

export const NewItemForm = () => {
  const [form] = Form.useForm();
  return (
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
        <Form form={form} layout="vertical" name="new-item" id="new-item-form">
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
  );
};
