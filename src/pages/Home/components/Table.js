import React from "react";
import { Table, Space } from "antd";
import styled from "styled-components";

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Unit Of Measurement",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "Consumption Average",
    dataIndex: "averageConsumption",
    key: "averageConsumption",
  },
  {
    title: "Deleted",
    dataIndex: "deleted",
    key: "deleted",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space>
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const StyledTable = styled(Table)`
  margin: 20;
`;

export const ItemTable = (props) => {
  const { items } = props;
  return <StyledTable columns={columns} dataSource={items} />;
};
