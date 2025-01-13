import React, { useState } from "react";
import { Typography, Row, Col, Button, Alert } from "antd";
import {
  FaThumbsDown,
  FaThumbsUp,
  FaRegMeh,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const Decision: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();
  const { candidateId } = useParams<{ candidateId: string }>();

  const options = [
    { label: "Strong Disapprove", icon: <FaThumbsDown />, color: "#8B0000" },
    { label: "Disapprove", icon: <FaRegThumbsDown />, color: "#FF6347" },
    { label: "Undecided", icon: <FaRegMeh />, color: "#FFD700" },
    { label: "Approve", icon: <FaRegThumbsUp />, color: "#90EE90" },
    { label: "Strong Approve", icon: <FaThumbsUp />, color: "#006400" },
  ];

  const handleOptionClick = (label: string) => {
    setSelectedOption(label);
  };

  const handleSubmit = () => {
    navigate(`/score-overview/${candidateId}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "24px", height: "100vh" }}>
      <Title level={2}>Assessment</Title>
      <Row
        justify="center"
        gutter={[64, 32]} // Increased horizontal spacing
        style={{ marginTop: "48px" }} // Added margin from the top
      >
        {options.map((option, index) => (
          <Col key={index}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={() => handleOptionClick(option.label)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "80px", // Reduced size
                  height: "80px", // Reduced size
                  borderRadius: "50%",
                  backgroundColor: option.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "36px", // Reduced font size
                  marginBottom: "16px",
                  border:
                    selectedOption === option.label ? "4px solid #000" : "none",
                }}
              >
                {option.icon}
              </div>
              <span
                style={{
                  fontSize: "20px", // Reduced font size
                  fontWeight:
                    selectedOption === option.label ? "bold" : "normal",
                  color: option.color,
                }}
              >
                {option.label}
              </span>
            </motion.div>
          </Col>
        ))}
      </Row>
      {selectedOption === "Undecided" && (
        <Alert
          message="Undecided"
          description="Selecting 'Undecided' will indicate to your team that further discussion is required."
          type="warning"
          showIcon
          style={{ marginTop: "24px" }}
        />
      )}
      <Button
        type="primary"
        size="large"
        disabled={!selectedOption}
        onClick={handleSubmit}
        style={{ marginTop: "48px" }} // Added margin for the submit button
      >
        Submit
      </Button>
    </div>
  );
};

export default Decision;
