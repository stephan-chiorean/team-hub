export enum Priority {
  Critical = "Critical",
  High = "High",
  Standard = "Standard",
  Low = "Low",
  Cosmetic = "Cosmetic",
}

export interface InterviewQuestion {
  key: string;
  title: string;
  question: string;
  probes?: string[]; // Added probes property
  priority?: Priority;
  time?: number; // Optional time field for duration
  levels: Record<string, string[]>;
}

export const interviewStages: Record<
  string,
  Record<string, InterviewQuestion[]>
> = {
  "cloud-backend": {
    "Recruiter Screen": [
      {
        key: "1",
        time: 5,
        title: "Cloud Backend",
        question: "What is the purpose of RESTful APIs?",
        probes: [
          "How would you secure the endpoints?",
          "Explain the difference between PUT and PATCH.",
          "What's the difference between CORS and CSP?",
          "How would you design a versioning strategy for APIs?",
        ],
        priority: Priority.Critical,
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
      {
        key: "2",
        time: 5,
        title: "Cloud Backend",
        question: "What are the key benefits of cloud computing?",
        probes: [
          "How do you decide between IaaS, PaaS, and SaaS?",
          "What are some trade-offs between cost and scalability?",
          "Explain how autoscaling works in a cloud environment.",
          "What are common security considerations in cloud computing?",
        ],
        priority: Priority.High,
        levels: {
          Junior: [
            "Understands basic cloud concepts (e.g., IaaS, PaaS, SaaS).",
            "Can explain cost-effectiveness of the cloud.",
            "Knows common cloud providers (AWS, Azure, GCP).",
            "Understands basic scalability features.",
          ],
          Senior: [
            "Can compare on-premises vs. cloud environments.",
            "Knows about autoscaling and load balancing.",
            "Understands security aspects of the cloud.",
            "Can evaluate cloud service trade-offs.",
          ],
          Staff: [
            "Understands advanced scalability options like distributed databases.",
            "Knows how to architect a multi-region cloud setup.",
            "Understands cost optimization techniques.",
            "Can design high-availability systems in the cloud.",
          ],
        },
      },
      {
        key: "3",
        time: 5,
        title: "Cloud Backend",
        question: "Explain the concept of containerization.",
        probes: [
          "How do containers differ from virtual machines?",
          "What are the benefits of using Docker?",
          "How does Kubernetes enhance container management?",
          "What are common challenges with container security?",
        ],
        priority: Priority.Standard,
        levels: {
          Junior: [
            "Knows what containers are (e.g., Docker).",
            "Understands the benefits of containers over VMs.",
            "Knows basic container commands (build, run, stop).",
            "Can explain a container use case.",
          ],
          Senior: [
            "Understands container orchestration (e.g., Kubernetes).",
            "Knows how to write Dockerfiles.",
            "Understands container networking.",
            "Knows how to manage container lifecycle.",
          ],
          Staff: [
            "Can design a container-based microservices architecture.",
            "Knows advanced Kubernetes concepts (e.g., Helm charts, operators).",
            "Understands multi-cloud container deployments.",
            "Knows security considerations for containers.",
          ],
        },
      },
      {
        key: "4",
        time: 5,
        title: "Cloud Backend",
        question: "How do you ensure API security?",
        probes: [
          "What are the key differences between OAuth 2.0 and JWTs?",
          "How would you implement rate limiting on an API?",
          "What is the importance of input validation?",
          "Explain how to secure sensitive data in APIs.",
        ],
        priority: Priority.High,
        levels: {
          Junior: [
            "Knows the importance of HTTPS.",
            "Understands basic authentication (e.g., API keys).",
            "Can explain why CORS is important.",
            "Understands input validation.",
          ],
          Senior: [
            "Knows about OAuth 2.0 and JWTs.",
            "Understands rate limiting and throttling.",
            "Knows how to handle sensitive data (e.g., encryption).",
            "Can design APIs with secure authentication mechanisms.",
          ],
          Staff: [
            "Understands advanced authentication methods (e.g., SAML, OpenID).",
            "Can design an API with multiple access levels.",
            "Knows how to integrate monitoring for suspicious activity.",
            "Understands compliance requirements (e.g., GDPR, HIPAA).",
          ],
        },
      },
      {
        key: "5",
        time: 5,
        title: "Cloud Backend",
        question: "What are the challenges in scaling cloud services?",
        probes: [
          "How would you handle a database bottleneck during scaling?",
          "Explain the role of caching in scalable systems.",
          "What strategies would you use for multi-region deployments?",
          "How do you manage cost during horizontal scaling?",
        ],
        priority: Priority.High,
        levels: {
          Junior: [
            "Understands the need for scaling.",
            "Knows the difference between vertical and horizontal scaling.",
            "Understands the role of load balancers.",
            "Knows how databases can become a bottleneck.",
          ],
          Senior: [
            "Knows about caching strategies (e.g., Redis, Memcached).",
            "Understands distributed systems principles.",
            "Knows how to design stateless services.",
            "Understands auto-scaling policies.",
          ],
          Staff: [
            "Can design a scalable and resilient cloud architecture.",
            "Knows about eventual consistency in distributed systems.",
            "Understands trade-offs in scaling databases (e.g., sharding).",
            "Knows how to optimize cloud costs while scaling.",
          ],
        },
      },
    ],
    "Preliminary Interview": [
      {
        key: "1",
        title: "Cloud Backend",
        question: "What is the role of SLAs, SLOs, and SLIs?",
        probes: [
          "How do you measure SLIs in real-time?",
          "What are the risks of setting aggressive SLOs?",
          "How would you align SLAs with customer contracts?",
          "Explain how SLAs impact incident response strategies.",
        ],
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
        probes: [
          "What are common causes of system downtime?",
          "How would you implement a failover mechanism?",
          "Explain the importance of backups in reliability.",
          "What tools would you use for monitoring uptime?",
        ],
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
        probes: [
          "How do you correlate metrics, logs, and traces?",
          "What tools do you recommend for observability?",
          "Explain the role of anomaly detection in monitoring.",
          "How would you design a dashboard for a cloud service?",
        ],
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
        probes: [
          "What are the key steps in an incident response plan?",
          "How do you conduct a post-mortem analysis?",
          "Explain the importance of runbooks during incidents.",
          "What tools do you use for incident management?",
        ],
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
        probes: [
          "What tools would you use for load testing?",
          "How would you simulate real-world traffic patterns?",
          "Explain the difference between load and stress testing.",
          "How do you interpret the results of a load test?",
        ],
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
