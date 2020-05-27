import React from "react";
import { Table, Space } from "antd";
import styled from "styled-components";
import * as API from "../../../api/api";

const handleRowDelete = (text, record) => {
  console.log(record);
  API.deleteItemDefinition(record._id);
};

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
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
    title: "Average Consumption",
    dataIndex: "averageConsumption",
    key: "averageConsumption",
  },
  {
    title: "Deleted",
    dataIndex: "deleted",
    key: "deleted",
    render: (text, record) => {
      return <p>{`${record.deleted}`}</p>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space>
        <a>Edit</a>
        <a onClick={() => handleRowDelete(text, record)}>Delete</a>
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
