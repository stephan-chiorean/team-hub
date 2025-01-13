import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Row, Col, Tooltip } from "antd";
import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface CandidateProfileParams extends Record<string, string | undefined> {
  candidateId: string;
}

const CandidateProfile: React.FC = () => {
  const { candidateId } = useParams<CandidateProfileParams>();
  const navigate = useNavigate();

  const handleBeginInterview = () => {
    navigate(`/assessments/${candidateId}`);
  };

  const handleAdvanceStage = () => {
    // Logic to advance the candidate's stage
  };

  const handleReject = () => {
    // Logic to reject the candidate
  };

  const handleStageClick = (stage: string) => {
    // Logic to handle stage click
    console.log(`Navigating to ${stage}`);
  };

  const stages = [
    { title: "Recruiter Screen", active: false, clickable: true },
    { title: "Preliminary Interview", active: true, clickable: false },
    { title: "Technical Panel", active: false, clickable: false },
    { title: "System Design", active: false, clickable: false },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2}>John Doe</Title>
          <Text type="secondary" style={{ fontSize: "18px" }}>
            Cloud Backend
          </Text>
        </Col>
        <Col>
          <Button
            type="default"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={handleAdvanceStage}
            style={{ marginRight: "8px" }}
          >
            Advance Stage
          </Button>
          <Button
            type="default"
            size="large"
            icon={<CloseOutlined />}
            onClick={handleReject}
            style={{
              marginRight: "8px",
              backgroundColor: "#f5222d",
              color: "#fff",
            }}
          >
            Reject
          </Button>
          <Button type="primary" size="large" onClick={handleBeginInterview}>
            Begin Interview
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Title level={4}>Overview</Title>
          <Text style={{ fontSize: "16px" }}>
            John Doe is an experienced Cloud Backend developer with a strong
            background in RESTful APIs, cloud computing, and containerization.
            He has worked on multiple high-scale projects and has a deep
            understanding of cloud infrastructure and services. John is
            proficient in designing and implementing scalable and reliable
            backend systems. He is also experienced in containerization and
            orchestration technologies such as Docker and Kubernetes.
          </Text>
        </Col>
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Title level={4}>Focus Areas</Title>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              backgroundColor: "#fafafa",
            }}
          >
            <Title level={5}>API Design</Title>
            <Text style={{ fontSize: "16px" }}>
              Evaluate John's ability to design secure and scalable APIs. Focus
              on his strategies for authentication, versioning, and
              rate-limiting.
            </Text>
          </div>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              backgroundColor: "#fafafa",
            }}
          >
            <Title level={5}>Cloud Infrastructure</Title>
            <Text style={{ fontSize: "16px" }}>
              Assess his experience with GCP, cost optimization, and
              infrastructure as code. Discuss challenges with workload
              migration.
            </Text>
          </div>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              backgroundColor: "#fafafa",
            }}
          >
            <Title level={5}>Containerization</Title>
            <Text style={{ fontSize: "16px" }}>
              Review his expertise with Docker and Kubernetes, particularly in
              scaling applications and managing production issues.
            </Text>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Title level={4}>Stages</Title>
          {stages.map((stage, index) => (
            <Tooltip
              key={index}
              title={stage.clickable ? "View Assessment" : ""}
            >
              <div
                onClick={() => stage.clickable && handleStageClick(stage.title)}
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  backgroundColor: stage.active
                    ? "#e6f7ff"
                    : stage.clickable
                    ? "#ffffff"
                    : "#f0f0f0",
                  cursor: stage.clickable ? "pointer" : "default",
                  opacity: stage.active ? 1 : stage.clickable ? 1 : 0.6,
                  fontWeight: stage.clickable ? "bold" : "normal",
                }}
              >
                <Title level={5} style={{ margin: 0 }}>
                  {stage.title}
                </Title>
              </div>
            </Tooltip>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default CandidateProfile;
