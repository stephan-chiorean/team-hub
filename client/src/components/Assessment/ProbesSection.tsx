import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

interface ProbesSectionProps {
  probes: string[];
}

const ProbesSection: React.FC<ProbesSectionProps> = ({ probes }) => {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "16px",
        marginBottom: "16px",
        backgroundColor: "#fafafa",
      }}
    >
      <Title level={5}>Probes:</Title>
      <ul
        style={{
          marginTop: "8px",
          paddingLeft: "20px",
          listStyleType: "disc",
          fontSize: "16px",
        }}
      >
        {probes.map((probe, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            {probe}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProbesSection;
