import React from "react";
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  Position,
} from "react-flow-renderer";
import { Typography, Button } from "antd";
import {
  FaGoogle,
  FaCalendarAlt,
  FaFileExcel,
  FaDatabase,
} from "react-icons/fa";
import { SiNotion, SiGreenhouse } from "react-icons/si";
import SimpleLogo from "../assets/SimpleLogo.svg";
const { Title, Text } = Typography;

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <div style={{ textAlign: "center" }}>
          <SiGreenhouse size={24} />
          <div>Greenhouse</div>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            ATS
          </Text>
        </div>
      ),
    },
    position: { x: 0, y: 159 },
    sourcePosition: Position.Right,
  },
  {
    id: "2",
    data: {
      label: <div style={{ textAlign: "center" }}>TeamHub</div>,
    },
    position: { x: 200, y: 180 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "3",
    data: {
      label: (
        <div style={{ textAlign: "center" }}>
          <SiNotion size={24} />
          <div>Notion</div>
        </div>
      ),
    },
    position: { x: 500, y: 0 },
    targetPosition: Position.Left,
  },
  {
    id: "4",
    data: {
      label: (
        <div style={{ textAlign: "center" }}>
          <FaCalendarAlt size={24} />
          <div>Google Calendar</div>
        </div>
      ),
    },
    position: { x: 500, y: 100 },
    targetPosition: Position.Left,
  },
  {
    id: "5",
    data: {
      label: (
        <div style={{ textAlign: "center" }}>
          <FaFileExcel size={24} />
          <div>Google Sheets</div>
        </div>
      ),
    },
    position: { x: 500, y: 200 },
    targetPosition: Position.Left,
  },
  {
    id: "6",
    data: {
      label: (
        <div style={{ textAlign: "center" }}>
          <FaDatabase size={24} />
          <div>Datadog</div>
        </div>
      ),
    },
    position: { x: 500, y: 300 },
    targetPosition: Position.Left,
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#1677ff" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "#1677ff" },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
    style: { stroke: "#1677ff" },
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    animated: true,
    style: { stroke: "#1677ff" },
  },
  {
    id: "e2-6",
    source: "2",
    target: "6",
    animated: true,
    style: { stroke: "#1677ff" },
  },
];

const Integrations = () => {
  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Integration Flow
        </Title>
        <Button type="primary">Add Integration</Button>
      </div>
      <ReactFlowProvider>
        <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default Integrations;
