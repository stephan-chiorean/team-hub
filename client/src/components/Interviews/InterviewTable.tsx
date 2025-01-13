import React from "react";
import { Table, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

interface Interview {
  key: string;
  candidate: string;
  position: string;
  date: string;
  status: string;
  stage: string;
}

interface InterviewTableProps {
  data: Interview[];
}

const getStatusTag = (status: string) => {
  let color = "";
  switch (status) {
    case "Pending":
      color = "gray";
      break;
    case "Upcoming":
      color = "lightgreen";
      break;
    default:
      color = "default";
  }
  return <Tag color={color}>{status}</Tag>;
};

const getStageTag = (stage: string) => {
  let color = "";
  switch (stage) {
    case "Recruiter Screen":
      color = "blue";
      break;
    case "Preliminary Interview":
      color = "orange";
      break;
    case "Technical Panel":
      color = "green";
      break;
    default:
      color = "default";
  }
  return <Tag color={color}>{stage}</Tag>;
};

const InterviewTable: React.FC<InterviewTableProps> = ({ data }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("dddd, MMMM Do, YYYY"),
    },
    {
      title: "Name",
      dataIndex: "candidate",
      key: "candidate",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
      render: (stage: string) => getStageTag(stage),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: Interview) => (
        <Link to={`/candidates/${record.key}`}>
          <Button type="default">View</Button>
        </Link>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default InterviewTable;
