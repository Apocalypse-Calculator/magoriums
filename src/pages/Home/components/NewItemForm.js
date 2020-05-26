import React from "react";
import { Form, Input, Button } from "antd";

export const NewItemForm = () => {
  const onFinish = () => console.log("finished");
  const onFinishFailed = () => console.log("finishFailed");

  return (
    <Form name="new-item" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
      <Form.Item>
        <Button type="primary" htmlType="Submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
