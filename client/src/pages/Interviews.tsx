import React from "react";
import { Table, Card, Row, Col, Typography, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Link } = Typography;

interface Interview {
  key: string;
  candidate: string;
  position: string;
  date: string;
  status: string;
}

interface InterviewTemplate {
  title: string;
  id: string;
}

const myInterviewsData: Interview[] = [
  {
    key: "1",
    candidate: "John Doe",
    position: "Cloud Backend",
    date: "2023-10-01",
    status: "Pending",
  },
  {
    key: "2",
    candidate: "Jane Smith",
    position: "Cloud SRE",
    date: "2023-10-05",
    status: "Upcoming",
  },
  // Add more interview data as needed
];

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

const interviewColumns = [
  {
    title: "Candidate",
    dataIndex: "candidate",
    key: "candidate",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => getStatusTag(status),
  },
];

const interviewTemplates: InterviewTemplate[] = [
  { title: "Cloud Backend", id: "cloud-backend" },
  { title: "Cloud SRE", id: "cloud-sre" },
  { title: "Lake", id: "lake" },
  { title: "Lake Pair Programming", id: "lake-pair-programming" },
  {
    title: "Cloud Backend Pair Programming",
    id: "cloud-backend-pair-programming",
  },
];

const Interviews: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/interviews/${id}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>My Interviews</h2>
        <Link href="#" style={{ fontSize: "16px" }}>
          See More
        </Link>
      </div>
      <Table
        dataSource={myInterviewsData}
        columns={interviewColumns}
        pagination={false}
      />
      <div style={{ marginTop: "24px" }}>
        <h2>Interview Templates</h2>
        <Row gutter={[16, 16]}>
          {interviewTemplates.map((template) => (
            <Col span={8} key={template.id}>
              <Card
                onClick={() => handleCardClick(template.id)}
                style={{ textAlign: "center", cursor: "pointer" }}
              >
                {template.title}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Interviews;
