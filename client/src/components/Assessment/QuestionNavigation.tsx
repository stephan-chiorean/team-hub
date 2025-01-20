import React from "react";
import { Button, Tooltip, Row, Col, Typography } from "antd";

const { Title } = Typography;

interface QuestionNavigationProps {
  currentQuestionIndex: number;
  currentQuestion: any;
  interviewDataLength: number;
  selectedCell: string | null;
  handlePrev: () => void;
  handleNext: () => void;
  handleFinish: () => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  currentQuestionIndex,
  currentQuestion,
  interviewDataLength,
  selectedCell,
  handlePrev,
  handleNext,
  handleFinish,
}) => {
  return (
    <Row
      justify="space-between"
      align="middle"
      style={{ marginBottom: "16px" }}
    >
      <Col>
        <Title level={4}>Question: {currentQuestion.question}</Title>
      </Col>
      <Col>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {currentQuestionIndex > 0 && (
            <Button style={{ marginRight: "8px" }} onClick={handlePrev}>
              Previous
            </Button>
          )}
          {currentQuestionIndex < interviewDataLength - 1 ? (
            <Tooltip
              title={
                selectedCell
                  ? ""
                  : "Please select a level before continuing assessment"
              }
              overlayInnerStyle={{
                textAlign: "center",
                maxWidth: "300px",
                whiteSpace: "normal",
              }}
            >
              <Button
                type="primary"
                onClick={handleNext}
                disabled={!selectedCell}
              >
                Next
              </Button>
            </Tooltip>
          ) : (
            <Tooltip
              title={
                selectedCell
                  ? ""
                  : "Please select a level before finishing assessment"
              }
              overlayInnerStyle={{
                textAlign: "center",
                maxWidth: "300px",
                whiteSpace: "normal",
              }}
            >
              <Button
                type="primary"
                onClick={handleFinish}
                disabled={!selectedCell}
                style={{ marginLeft: "8px" }}
              >
                Finish
              </Button>
            </Tooltip>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default QuestionNavigation;
