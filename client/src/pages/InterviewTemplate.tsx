import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Typography, Checkbox, Tabs } from "antd";
import "./Interviews/InterviewTemplate.css";

const { Title } = Typography;
const { TabPane } = Tabs;

interface InterviewQuestion {
  key: string;
  title: string;
  question: string;
  levels: Record<string, string[]>;
}

const interviewStages: Record<string, Record<string, InterviewQuestion[]>> = {
  "cloud-backend": {
    "Recruiter Screen": [
      {
        key: "1",
        title: "Cloud Backend",
        question: "What is the purpose of RESTful APIs?",
        levels: {
          Junior: [
            "Can define RESTful APIs.",
            "Understands HTTP methods like GET, POST, PUT, DELETE.",
            "Knows the difference between HTTP and HTTPS.",
            "Can describe a basic API use case.",
          ],
          Senior: [
            "Explains RESTful principles (statelessness, resource identification).",
            "Knows when to use query params vs. request body.",
            "Understands HTTP status codes.",
            "Can design a basic RESTful API.",
          ],
          Staff: [
            "Understands security aspects of RESTful APIs (CORS, authentication).",
            "Knows how to implement pagination and filtering.",
            "Understands idempotency in HTTP methods.",
            "Can design an API for scalability and maintainability.",
          ],
        },
      },
      // 4 more questions as previously provided.
    ],
    "Preliminary Interview": [
      {
        key: "1",
        title: "Cloud Backend",
        question: "What is the role of SLAs, SLOs, and SLIs?",
        levels: {
          Junior: [
            "Knows what SLAs, SLOs, and SLIs stand for.",
            "Understands the relationship between them.",
            "Knows why they are important.",
            "Can provide an example of an SLA.",
          ],
          Senior: [
            "Can describe how SLAs affect service guarantees.",
            "Knows how to monitor SLIs effectively.",
            "Understands the trade-offs in setting aggressive SLOs.",
            "Can align SLAs with customer expectations.",
          ],
          Staff: [
            "Can design a monitoring system for SLAs and SLOs.",
            "Knows how to negotiate SLAs with stakeholders.",
            "Understands the financial implications of SLAs.",
            "Knows how to adjust SLAs based on system performance.",
          ],
        },
      },
      {
        key: "2",
        title: "Cloud Backend",
        question:
          "What are the primary challenges in maintaining system reliability?",
        levels: {
          Junior: [
            "Understands the concept of uptime.",
            "Can identify common sources of system downtime.",
            "Knows the importance of backups.",
            "Can describe basic failover mechanisms.",
          ],
          Senior: [
            "Knows how to design systems for high availability.",
            "Understands the role of load balancers in reliability.",
            "Can explain replication strategies.",
            "Knows the trade-offs of active-passive vs. active-active setups.",
          ],
          Staff: [
            "Can implement advanced reliability measures like quorum consensus.",
            "Understands chaos engineering and its benefits.",
            "Knows how to design disaster recovery plans.",
            "Can balance reliability with cost considerations.",
          ],
        },
      },
      {
        key: "3",
        title: "Cloud Backend",
        question:
          "Explain the importance of monitoring and observability in cloud systems.",
        levels: {
          Junior: [
            "Knows the basic tools for monitoring (e.g., CloudWatch, Prometheus).",
            "Understands the importance of logs.",
            "Can describe an alerting mechanism.",
            "Knows what a dashboard is used for.",
          ],
          Senior: [
            "Knows how to correlate metrics, logs, and traces.",
            "Can design a basic observability setup for an application.",
            "Understands thresholds and anomaly detection.",
            "Knows how to debug issues using monitoring tools.",
          ],
          Staff: [
            "Can design a full-stack observability strategy.",
            "Understands distributed tracing for microservices.",
            "Knows how to monitor SLAs effectively.",
            "Can integrate observability into CI/CD pipelines.",
          ],
        },
      },
      {
        key: "4",
        title: "Cloud Backend",
        question: "Describe the lifecycle of an incident response.",
        levels: {
          Junior: [
            "Knows the basic steps in incident response.",
            "Can describe what a runbook is.",
            "Understands the importance of post-mortems.",
            "Knows what an incident severity level means.",
          ],
          Senior: [
            "Knows how to lead an incident response team.",
            "Can identify common root causes of incidents.",
            "Understands how to create actionable incident reports.",
            "Knows how to design runbooks for common issues.",
          ],
          Staff: [
            "Can implement automated incident detection and resolution systems.",
            "Knows how to design a culture of continuous improvement.",
            "Understands the role of incident response in regulatory compliance.",
            "Knows how to scale incident response for global teams.",
          ],
        },
      },
      {
        key: "5",
        title: "Cloud Backend",
        question:
          "How would you design a load-testing strategy for a cloud application?",
        levels: {
          Junior: [
            "Understands what load testing is.",
            "Knows basic tools like JMeter and Locust.",
            "Can describe a simple load test scenario.",
            "Knows the importance of benchmarking.",
          ],
          Senior: [
            "Knows how to simulate real-world traffic patterns.",
            "Can identify bottlenecks through load testing.",
            "Understands the difference between load and stress testing.",
            "Knows how to scale test environments.",
          ],
          Staff: [
            "Can design a comprehensive load-testing strategy.",
            "Knows how to integrate load tests into CI/CD.",
            "Understands the implications of load testing on cloud costs.",
            "Knows how to interpret and act on test results.",
          ],
        },
      },
    ],
    "Technical Panel": [
      {
        key: "1",
        title: "Cloud Backend",
        question: "Describe a microservices architecture.",
        levels: {
          Junior: [
            "Knows what microservices are.",
            "Understands the benefits over monoliths.",
            "Can describe basic communication between services.",
            "Knows about RESTful APIs in microservices.",
          ],
          Senior: [
            "Knows about service discovery and dynamic routing.",
            "Understands distributed tracing and logging.",
            "Knows how to handle service dependencies.",
            "Can describe failure handling in microservices.",
          ],
          Staff: [
            "Can design a highly available microservices system.",
            "Knows how to use service mesh (e.g., Istio).",
            "Understands event-driven architectures.",
            "Knows how to implement circuit breakers.",
          ],
        },
      },
      {
        key: "2",
        title: "Cloud Backend",
        question: "How would you secure a distributed system?",
        levels: {
          Junior: [
            "Knows basic security practices (e.g., HTTPS).",
            "Understands the need for authentication.",
            "Knows about access control.",
            "Can describe a simple data encryption strategy.",
          ],
          Senior: [
            "Knows how to implement OAuth and JWTs.",
            "Understands secure communication between services.",
            "Knows how to secure API endpoints.",
            "Understands how to prevent injection attacks.",
          ],
          Staff: [
            "Can design a security strategy for a distributed system.",
            "Knows how to secure sensitive data in transit and at rest.",
            "Understands compliance requirements for security.",
            "Knows how to perform security audits.",
          ],
        },
      },
      {
        key: "3",
        title: "Cloud Backend",
        question: "How would you design a fault-tolerant system?",
        levels: {
          Junior: [
            "Knows what fault tolerance means.",
            "Understands the concept of retries.",
            "Knows basic failover mechanisms.",
            "Can describe redundancy in a system.",
          ],
          Senior: [
            "Knows how to use replication for fault tolerance.",
            "Understands active-passive vs. active-active setups.",
            "Knows how to implement health checks.",
            "Understands trade-offs in fault tolerance design.",
          ],
          Staff: [
            "Can design a system with fault isolation (e.g., circuit breakers).",
            "Knows how to handle cascading failures.",
            "Understands how to design systems for disaster recovery.",
            "Can balance fault tolerance with system performance and cost.",
          ],
        },
      },
      {
        key: "4",
        title: "Cloud Backend",
        question: "What strategies would you use for database scaling?",
        levels: {
          Junior: [
            "Knows the difference between vertical and horizontal scaling.",
            "Understands read vs. write workloads.",
            "Knows about database indexes.",
            "Can describe a simple use case for replication.",
          ],
          Senior: [
            "Understands database sharding.",
            "Knows about caching strategies (e.g., Redis, Memcached).",
            "Can design a read replica setup.",
            "Understands trade-offs in consistency vs. availability.",
          ],
          Staff: [
            "Can design a multi-region database architecture.",
            "Knows how to use partitioning effectively.",
            "Understands the impact of latency on database performance.",
            "Can design a database migration strategy for scaling.",
          ],
        },
      },
      {
        key: "5",
        title: "Cloud Backend",
        question:
          "How would you optimize the performance of a backend service?",
        levels: {
          Junior: [
            "Knows the basics of profiling tools.",
            "Understands the role of caching.",
            "Knows how to optimize database queries.",
            "Can describe basic API response optimization.",
          ],
          Senior: [
            "Knows how to reduce latency in service calls.",
            "Understands the role of asynchronous processing.",
            "Knows how to implement efficient data serialization.",
            "Can design a load-balancing strategy.",
          ],
          Staff: [
            "Can optimize a service for high concurrency.",
            "Knows how to use distributed caches effectively.",
            "Understands the trade-offs of synchronous vs. asynchronous communication.",
            "Can identify and resolve performance bottlenecks in complex systems.",
          ],
        },
      },
    ],
  },
};

const InterviewTemplate: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const [activeTab, setActiveTab] = useState("Recruiter Screen");

  const dataSource =
    interviewStages[templateId || "cloud-backend"]?.[activeTab] || [];

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text: string) => (
        <div style={{ display: "flex", flexDirection: "column" }}>{text}</div>
      ),
    },
    ...["Junior", "Senior", "Staff"].map((level) => ({
      title: level,
      dataIndex: ["levels", level],
      key: level,
      render: (items: string[]) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {items.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "start" }}>
              <Checkbox checked={false} disabled />
              <span style={{ marginLeft: 8 }}>{item}</span>
            </div>
          ))}
        </div>
      ),
    })),
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={4}>
        {templateId ? `Template: Cloud Backend` : "Template"}
      </Title>
      <Tabs
        defaultActiveKey="Recruiter Screen"
        onChange={(key) => setActiveTab(key)}
      >
        {Object.keys(interviewStages[templateId || "cloud-backend"] || {}).map(
          (stage) => (
            <TabPane tab={stage} key={stage}>
              <Table
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                style={{ verticalAlign: "top" }}
              />
            </TabPane>
          )
        )}
      </Tabs>
    </div>
  );
};

export default InterviewTemplate;
