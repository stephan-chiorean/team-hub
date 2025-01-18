import React from "react";
import { Typography, Row, Col } from "antd";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const { Title } = Typography;

// Mock Data
const mockTraitScores = [
  { trait: "Communication", candidate: 8, avgSuccessful: 9 },
  { trait: "Leadership", candidate: 6, avgSuccessful: 8 },
  { trait: "Technical Knowledge", candidate: 9, avgSuccessful: 9 },
  { trait: "Teamwork", candidate: 7, avgSuccessful: 8 },
  { trait: "Time Management", candidate: 5, avgSuccessful: 7 },
];

const mockQuestionScores = [
  { question: "Q1", level: 1 }, // Junior
  { question: "Q2", level: 3 }, // Senior
  { question: "Q3", level: 2 }, // Staff
  { question: "Q4", level: 1 }, // Junior
  { question: "Q5", level: 3 }, // Senior
  { question: "Q6", level: 2 }, // Staff
];

const mockPriorityLevelData = [
  { priority: "Critical", Junior: 1, Senior: 1, Staff: 0 },
  { priority: "High", Junior: 1, Senior: 1, Staff: 1 },
  { priority: "Standard", Junior: 1, Senior: 0, Staff: 0 },
  { priority: "Low", Junior: 0, Senior: 0, Staff: 1 },
];

const mockPieData = [
  { name: "Technical", value: 40 },
  { name: "Leadership", value: 20 },
  { name: "Communication", value: 30 },
  { name: "Other", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const AnalysisTab: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Candidate Performance Analysis
      </Title>

      <Row gutter={[24, 24]}>
        {/* 1. Candidate Trait Scores (Radar Chart) */}
        <Col
          span={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title
            level={4}
            style={{ textAlign: "center", marginBottom: "16px" }}
          >
            Trait Overview
          </Title>
          <div style={{ flex: 1 }}>
            <RadarChart
              cx={250}
              cy={200}
              outerRadius={140}
              width={500}
              height={400}
              data={mockTraitScores}
            >
              <PolarGrid />
              <PolarAngleAxis
                dataKey="trait"
                tick={{ fontSize: 12, fill: "#333" }}
              />
              <Radar
                name="Candidate"
                dataKey="candidate"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Radar
                name="Successful Hires Average"
                dataKey="avgSuccessful"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </div>
        </Col>

        {/* 2. Candidate Question Scores by Level */}
        <Col
          span={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title
            level={4}
            style={{ textAlign: "center", marginBottom: "16px" }}
          >
            Question Scores by Level
          </Title>
          <div style={{ flex: 1 }}>
            <BarChart
              width={500}
              height={400}
              data={mockQuestionScores}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis
                type="number"
                domain={[0, 3]}
                tickFormatter={(value) =>
                  ["None", "Junior", "Senior", "Staff"][value] || ""
                }
                ticks={[1, 2, 3]}
              />
              <Tooltip
                formatter={(value) =>
                  ["None", "Junior", "Senior", "Staff"][value as number] || ""
                }
              />
              <Bar dataKey="level" fill="#82ca9d" />
            </BarChart>
          </div>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: "32px" }}>
        {/* 3. Priority vs. Level Distribution */}
        <Col
          span={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title
            level={4}
            style={{ textAlign: "center", marginBottom: "16px" }}
          >
            Priority vs. Level Distribution
          </Title>
          <div style={{ flex: 1 }}>
            <BarChart width={500} height={400} data={mockPriorityLevelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="priority" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Junior" stackId="a" fill="#0088FE" />
              <Bar dataKey="Senior" stackId="a" fill="#00C49F" />
              <Bar dataKey="Staff" stackId="a" fill="#FFBB28" />
            </BarChart>
          </div>
        </Col>

        {/* 4. General Distribution (Pie Chart) */}
        <Col
          span={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title
            level={4}
            style={{ textAlign: "center", marginBottom: "16px" }}
          >
            Candidate Attribute Distribution
          </Title>
          <div style={{ flex: 1 }}>
            <PieChart width={400} height={400}>
              <Pie
                data={mockPieData}
                dataKey="value"
                nameKey="name"
                cx={200}
                cy={200}
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {mockPieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </Col>
      </Row>
    </div>
  );
};
