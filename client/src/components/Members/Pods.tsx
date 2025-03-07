import React from "react";
import { Table, Button } from "antd";

const Pods = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hiring Manager",
      dataIndex: "hiringManager",
      key: "hiringManager",
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (_: any, record: any) => (
        <Button type="default" onClick={() => handleView(record)}>
          View
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Pod 1",
      id: "001",
      hiringManager: "John Doe",
    },
    {
      key: "2",
      name: "Pod 2",
      id: "002",
      hiringManager: "Jane Smith",
    },
    {
      key: "3",
      name: "Pod 3",
      id: "003",
      hiringManager: "Alice Jones",
    },
  ];

  const handleView = (record: any) => {
    console.log("View pod:", record);
    // Add your view logic here
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Pods;
