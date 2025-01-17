import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Select, Typography, Table, Row, Col, Checkbox } from "antd";
import {
  FaThumbsDown,
  FaThumbsUp,
  FaRegMeh,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa";
import { interviewStages } from "@/data/interviewStages";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const teamMembers = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Brown",
  "Diana Prince",
];

interface DecisionOption {
  icon: JSX.Element;
  color: string;
}

const decisionOptions: Record<string, DecisionOption> = {
  "Strong Disapprove": { icon: <FaThumbsDown />, color: "#8B0000" },
  Disapprove: { icon: <FaRegThumbsDown />, color: "#FF6347" },
  Undecided: { icon: <FaRegMeh />, color: "#FFD700" },
  Approve: { icon: <FaRegThumbsUp />, color: "#90EE90" },
  "Strong Approve": { icon: <FaThumbsUp />, color: "#006400" },
};

// Mock selected levels and criteria from the Assessment flow
const selectedLevels: Record<number, string> = {
  0: "Junior", // Question 1: Junior level selected
  1: "Senior", // Question 2: Senior level selected
  2: "Staff", // Question 3: Staff level selected
  3: "Junior", // Question 4: Junior level selected
  4: "Senior", // Question 5: Senior level selected
};

const mockData = {
  decision: "Approve",
  notes: {
    strengths: [
      "Good communication skills",
      "Strong technical knowledge",
      "Team player",
    ],
    weaknesses: [
      "Needs improvement in time management",
      "Lacks experience in project management",
    ],
  },
};

const ScoreOverview: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const [selectedMember, setSelectedMember] = useState<string>("Alice Johnson");

  const handleMemberChange = (value: string) => {
    setSelectedMember(value);
  };

  const interviewData = interviewStages["cloud-backend"]["Recruiter Screen"];
  const questions = interviewData.map((item: any, index: number) => ({
    key: index,
    question: item.question,
    levels: item.levels,
  }));

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text: string) => (
        <div style={{ fontWeight: "bold", color: "#333" }}>{text}</div>
      ),
    },
    ...["Junior", "Senior", "Staff"].map((level) => ({
      title: level,
      dataIndex: "levels",
      key: level,
      render: (levels: any, record: any) => (
        <div
          style={{
            border:
              selectedLevels[record.key] === level
                ? "2px solid blue"
                : "1px solid #d9d9d9",
            backgroundColor:
              selectedLevels[record.key] === level ? "lightblue" : "white",
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          {levels[level].map((criterion: string, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <Checkbox
                checked={selectedLevels[record.key] === level}
                disabled
              />
              <span style={{ marginLeft: "8px" }}>{criterion}</span>
            </div>
          ))}
        </div>
      ),
    })),
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>John Doe</Title>
      <Title level={4} type="secondary" style={{ marginTop: 0 }}>
        Interview Summary
      </Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Assessment" key="1">
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "16px" }}
          >
            <Col>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    marginRight: "8px",
                  }}
                >
                  Decision
                </Title>
                <div
                  style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "8px",
                    padding: "8px",
                    backgroundColor: "#fafafa",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      color: decisionOptions[mockData.decision].color,
                      marginRight: "8px",
                    }}
                  >
                    {decisionOptions[mockData.decision].icon}
                  </span>
                  <span
                    style={{
                      color: decisionOptions[mockData.decision].color,
                      fontSize: "16px",
                    }}
                  >
                    {mockData.decision}
                  </span>
                </div>
              </div>
            </Col>
            <Col>
              <Title
                level={4}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                Team Member:
                <Select
                  defaultValue={selectedMember}
                  style={{ width: 200, marginLeft: "8px" }}
                  onChange={handleMemberChange}
                >
                  {teamMembers.map((member) => (
                    <Select.Option key={member} value={member}>
                      {member}
                    </Select.Option>
                  ))}
                </Select>
              </Title>
            </Col>
          </Row>
          <Title level={4}>Notes</Title>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "24px",
              backgroundColor: "#fafafa",
            }}
          >
            <div>
              <Title level={5}>Strengths</Title>
              <ul
                style={{
                  marginTop: "8px",
                  paddingLeft: "20px",
                  listStyleType: "disc",
                }}
              >
                {mockData.notes.strengths.map((strength, index) => (
                  <li
                    key={index}
                    style={{ marginBottom: "8px", fontSize: "16px" }}
                  >
                    {strength}
                  </li>
                ))}
              </ul>
              <Title level={5} style={{ marginTop: "16px" }}>
                Weaknesses
              </Title>
              <ul
                style={{
                  marginTop: "8px",
                  paddingLeft: "20px",
                  listStyleType: "disc",
                }}
              >
                {mockData.notes.weaknesses.map((weakness, index) => (
                  <li
                    key={index}
                    style={{ marginBottom: "8px", fontSize: "16px" }}
                  >
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Title level={4}>Scoring</Title>
          <Table
            dataSource={questions}
            columns={columns}
            pagination={false}
            bordered
            style={{ marginBottom: "24px" }}
          />
        </TabPane>
        <TabPane tab="Overview" key="2">
          <Title level={4}>Overview Content</Title>
          <Text>Overview content goes here.</Text>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ScoreOverview;
