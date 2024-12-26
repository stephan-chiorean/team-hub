import React, { useState } from "react";
import { Button, Select, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface Referral {
  key: number;
  name: string;
  team: string;
  status: "Pending" | "Reviewing" | "Rejected" | "Approved";
}

const Referrals: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>("team-1");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const navigate = useNavigate();

  const handleAddReferral = () => {
    navigate(`/add-referral/${selectedTeam}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Referral["status"]) => {
        let color;
        switch (status) {
          case "Pending":
            color = "gray";
            break;
          case "Reviewing":
            color = "yellow";
            break;
          case "Rejected":
            color = "red";
            break;
          case "Approved":
            color = "green";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Select
          value={selectedTeam}
          onChange={(value) => setSelectedTeam(value)}
          style={{ width: 200 }}
        >
          <Option value="team-1">Team 1</Option>
          <Option value="team-2">Team 2</Option>
          <Option value="team-3">Team 3</Option>
        </Select>
        <Button type="primary" onClick={handleAddReferral}>
          Add Referral
        </Button>
      </div>
      <Table columns={columns} dataSource={referrals} />
    </div>
  );
};

export default Referrals;
