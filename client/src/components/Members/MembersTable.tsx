import React from "react";
import { Table, Button } from "antd";

const MembersTable = ({ searchText }: { searchText: string }) => {
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filteredValue: [searchText],
      onFilter: (value: any, record: any) => record.email.includes(value),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
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
      email: "john.doe@example.com",
      role: "Hiring Manager",
      department: "HR",
    },
    {
      key: "2",
      email: "jane.smith@example.com",
      role: "Recruiter",
      department: "Recruitment",
    },
    {
      key: "3",
      email: "alice.jones@example.com",
      role: "Admin",
      department: "Administration",
    },
    {
      key: "4",
      email: "bob.brown@example.com",
      role: "Team Member",
      department: "Engineering",
    },
  ];

  const handleView = (record: any) => {
    console.log("View member:", record);
    // Add your view logic here
  };

  return <Table columns={columns} dataSource={data} />;
};

export default MembersTable;
