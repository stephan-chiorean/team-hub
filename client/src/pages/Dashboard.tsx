import React from "react";
import { Card, Row, Col, Button, Badge, List } from "antd";
import "./Dashboard/Dashboard.css"; // Import custom CSS for positioning the badge

const cardData = [
  {
    title: "Sourcing",
    description: "Find and attract the best talent for your team.",
    hasNotification: true,
    links: [
      "Job Boards",
      "Social Media",
      "Recruitment Agencies",
      "Employee Referrals",
      "Career Fairs",
      "Internal Mobility",
    ],
  },
  {
    title: "Referrals",
    description: "Manage employee referrals and track their progress.",
    hasNotification: false,
    links: [
      "Submit Referral",
      "Referral Status",
      "Referral Rewards",
      "Referral Policy",
      "Top Referrers",
      "Referral Analytics",
    ],
  },
  {
    title: "Skill Development",
    description: "Enhance the skills of your team members.",
    hasNotification: true,
    links: [
      "Training Programs",
      "Certifications",
      "Workshops",
      "Mentorship",
      "E-Learning",
      "Skill Assessments",
    ],
  },
  {
    title: "Team Engagement",
    description: "Boost team morale and engagement with activities.",
    hasNotification: false,
    links: [
      "Team Events",
      "Surveys",
      "Recognition Programs",
      "Feedback Sessions",
      "Wellness Programs",
      "Engagement Analytics",
    ],
  },
  {
    title: "Documentation",
    description: "Maintain and access important team documents.",
    hasNotification: true,
    links: [
      "Policies",
      "Procedures",
      "Guidelines",
      "Templates",
      "Forms",
      "Knowledge Base",
    ],
  },
  {
    title: "Projects",
    description: "Manage and track the progress of team projects.",
    hasNotification: false,
    links: [
      "Project Dashboard",
      "Task Management",
      "Milestones",
      "Resource Allocation",
      "Project Reports",
      "Project Archives",
    ],
  },
];

const Dashboard = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        {cardData.map((card, index) => (
          <Col span={8} key={index}>
            <div className="card-container">
              <Badge
                dot={card.hasNotification}
                className="notification-badge"
              />
              <Card
                title={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {card.title}
                    <Button type="primary" style={{ padding: 10 }}>
                      Explore
                    </Button>
                  </div>
                }
                bordered={true}
              >
                <p className="card-description">{card.description}</p>
                <List
                  size="small"
                  dataSource={card.links}
                  renderItem={(link) => (
                    <List.Item style={{ color: "#1890ff", cursor: "pointer" }}>
                      {link}
                    </List.Item>
                  )}
                  grid={{ column: 2 }}
                />
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
