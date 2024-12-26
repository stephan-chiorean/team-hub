import React from "react";
import { Card, Row, Col, Button, Badge, List } from "antd";
import { Route, useNavigate } from "react-router-dom";
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
    route: "/sourcing",
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
    route: "/referrals",
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
    route: "/skill-development",
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
    route: "/team-engagement",
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
    route: "/documentation",
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
    route: "/projects",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const handleExplore = (route: string) => {
    navigate(route); // Replace history.push with navigate
  };

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
                    <Button
                      type="primary"
                      style={{ padding: 10 }}
                      onClick={() => handleExplore(card.route)}
                    >
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
