import React from "react";
import { useParams } from "react-router-dom";
import { Table, Typography, Checkbox } from "antd";
import "./Interviews/InterviewTemplate.css";

const { Title, Text } = Typography;

interface InterviewQuestion {
  key: string;
  title: string;
  question: string;
  levels: Record<string, string[]>;
}

const interviewQuestions: Record<string, InterviewQuestion[]> = {
  "cloud-backend": [
    {
      key: "1",
      title: "Cloud Backend",
      question:
        "You are asked to build a RESTful API for a cloud based management application. It should have CRUD operations for every resource in the service. The service must be secure and also requires two levels of access. One for system administrators and one for a customer. How would you go about designing this service?",
      levels: {
        Junior: [
          "Can identify the HTTP verbs.",
          "Can talk about HTTP basic authentication.",
          "Describes a SOAP/RPC or action based API.",
          "Doesn't identify that authentication or authorization is needed.",
        ],
        Senior: [
          "Identifies a link between resources and HTTP path.",
          "Clearly delineates between query string arguments & body & when each is used.",
        ],
        Staff: [
          "Describes RESTful principles and how they apply to the API design.",
          "Identifies the need for authentication and authorization.",
        ],
        "Senior Staff": [
          "Provides a detailed design including security measures, authentication, and authorization.",
          "Discusses scalability and maintainability.",
        ],
        Principal: [
          "Designs a comprehensive solution considering all aspects including security, scalability, maintainability, and performance.",
          "Provides a clear plan for implementation and deployment.",
        ],
      },
    },
    {
      key: "2",
      title: "API Security",
      question:
        "How would you implement security for an API that handles sensitive data?",
      levels: {
        Junior: ["Mentions HTTPS.", "Identifies the need for authentication."],
        Senior: [
          "Describes OAuth 2.0 or JWT for authentication.",
          "Mentions rate limiting and throttling.",
        ],
        Staff: [
          "Explains the importance of token expiration.",
          "Discusses input validation to prevent injection attacks.",
        ],
        "Senior Staff": [
          "Details strategies for securing data at rest and in transit.",
          "Discusses monitoring and auditing access logs.",
        ],
        Principal: [
          "Designs a full-stack security plan including incident response.",
          "Considers compliance with security standards like GDPR or HIPAA.",
        ],
      },
    },
    {
      key: "3",
      title: "Scaling Cloud Services",
      question:
        "Describe how you would scale a cloud-based application to handle millions of users.",
      levels: {
        Junior: [
          "Mentions using a cloud provider.",
          "Talks about increasing server resources.",
        ],
        Senior: [
          "Describes horizontal scaling and load balancing.",
          "Explains the use of caching to improve performance.",
        ],
        Staff: [
          "Discusses auto-scaling and database sharding.",
          "Mentions using message queues to decouple services.",
        ],
        "Senior Staff": [
          "Provides examples of distributed systems like CDN for content delivery.",
          "Explains strategies for database optimization and replication.",
        ],
        Principal: [
          "Designs a comprehensive scaling strategy including cost optimization.",
          "Plans for disaster recovery and failover mechanisms.",
        ],
      },
    },
    {
      key: "4",
      title: "Monitoring and Observability",
      question:
        "What would you include in a monitoring and observability setup for a microservices architecture?",
      levels: {
        Junior: [
          "Mentions monitoring uptime and basic logs.",
          "Identifies the need for alerting.",
        ],
        Senior: [
          "Explains the use of metrics, logs, and traces.",
          "Describes setting up dashboards with tools like Grafana.",
        ],
        Staff: [
          "Discusses distributed tracing tools like Jaeger or Zipkin.",
          "Mentions monitoring SLAs, SLOs, and SLIs.",
        ],
        "Senior Staff": [
          "Plans for proactive monitoring and predictive analysis.",
          "Explains strategies for correlating logs across services.",
        ],
        Principal: [
          "Designs a full observability solution for a complex architecture.",
          "Plans for integrating monitoring with incident management workflows.",
        ],
      },
    },
  ],
  "cloud-sre": [
    {
      key: "2",
      title: "Cloud SRE",
      question: "Explain the concept of SLAs, SLOs, and SLIs.",
      levels: {
        Junior: [
          "Can define SLAs, SLOs, and SLIs.",
          "Understands the basic differences between them.",
        ],
        Senior: [
          "Can explain how SLAs, SLOs, and SLIs are used in practice.",
          "Provides examples of each.",
        ],
        Staff: [
          "Describes how to set SLAs, SLOs, and SLIs for a service.",
          "Discusses the importance of monitoring and reporting.",
        ],
        "Senior Staff": [
          "Provides a detailed plan for implementing SLAs, SLOs, and SLIs.",
          "Discusses the impact on service reliability and performance.",
        ],
        Principal: [
          "Designs a comprehensive strategy for SLAs, SLOs, and SLIs.",
          "Considers all aspects including business impact, customer satisfaction, and technical feasibility.",
        ],
      },
    },
  ],
};

const InterviewTemplate: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const dataSource = interviewQuestions[templateId || ""] || [];

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text: string) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{text}</span>
          <span style={{ color: "grey", fontSize: "12px", marginTop: "4px" }}>
            Time: 5 minutes
          </span>
        </div>
      ),
    },
    {
      title: "Junior",
      dataIndex: ["levels", "Junior"],
      key: "Junior",
      render: (levels: string[]) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {levels.map((item, index) => (
            <div key={index}>
              <Checkbox checked={false} disabled />
              <span style={{ marginLeft: 8 }}>{item}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Senior",
      dataIndex: ["levels", "Senior"],
      key: "Senior",
      render: (levels: string[]) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {levels.map((item, index) => (
            <div key={index}>
              <Checkbox checked={false} disabled />
              <span style={{ marginLeft: 8 }}>{item}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Staff",
      dataIndex: ["levels", "Staff"],
      key: "Staff",
      render: (levels: string[]) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {levels.map((item, index) => (
            <div key={index}>
              <Checkbox checked={false} disabled />
              <span style={{ marginLeft: 8 }}>{item}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Senior Staff",
      dataIndex: ["levels", "Senior Staff"],
      key: "Senior Staff",
      render: (levels: string[]) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {levels.map((item, index) => (
            <div key={index}>
              <Checkbox checked={false} disabled />
              <span style={{ marginLeft: 8 }}>{item}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Principal",
      dataIndex: ["levels", "Principal"],
      key: "Principal",
      render: (levels: string[]) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {levels.map((item, index) => (
            <div key={index}>
              <Checkbox checked={false} disabled />
              <span style={{ marginLeft: 8 }}>{item}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={4}>{dataSource[0]?.title}</Title>
      <Text>Time: 30 minutes</Text>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ verticalAlign: "top", marginTop: 16 }}
        rowClassName={() => "align-top"}
      />
    </div>
  );
};

export default InterviewTemplate;
