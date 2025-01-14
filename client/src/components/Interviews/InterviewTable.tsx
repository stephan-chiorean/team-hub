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
  time: string; // Added time field
  stage: string;
}

interface InterviewTableProps {
  data: Interview[];
}

const getStageTag = (stage: string) => {
  return <Tag color="default">{stage}</Tag>;
};

const InterviewTable: React.FC<InterviewTableProps> = ({ data }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string, record: Interview) => (
        <div>
          {dayjs(date).format("dddd, MMMM Do, YYYY")}
          <div style={{ color: "gray", fontSize: "12px" }}>{record.time}</div>
        </div>
      ),
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
      width: "5%",
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
