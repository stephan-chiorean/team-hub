import React, { useState } from "react";
import { Tabs, Button, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { interviewStages } from "@/data/interviewStages";
import TemplateTable from "@/components/Templates/TemplateTable";
import QuestionModal from "@/components/Templates/QuestionModal";
import { InterviewQuestion } from "@/types/Question";
import Traits from "@/components/Templates/Attributes"; // Import Traits component

const { TabPane } = Tabs;
const { Text, Title } = Typography;

const InterviewTemplate: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAttributes, setShowAttributes] = useState(false); // Toggle between views
  const [activeTab, setActiveTab] = useState("Recruiter Screen");

  const stages = interviewStages[templateId || "cloud-backend"];
  const currentQuestions = stages ? stages[activeTab] : [];

  const handleAddQuestion = (values: any) => {
    const newQuestion: InterviewQuestion = {
      key: `${currentQuestions.length + 1}`,
      title: "Cloud Backend",
      question: values.question,
      time: values.time,
      levels: {
        Junior: values.Junior || [],
        Senior: values.Senior || [],
        Staff: values.Staff || [],
      },
      priority: values.priority || "Medium",
    };
    stages[activeTab].push(newQuestion);
    setIsModalVisible(false);
  };

  const handleUpdateQuestion = (updatedQuestion: InterviewQuestion) => {
    const questionIndex = currentQuestions.findIndex(
      (q) => q.key === updatedQuestion.key
    );
    if (questionIndex !== -1) {
      currentQuestions[questionIndex] = updatedQuestion;
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Title and Buttons above the tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          {showAttributes
            ? "Interview Focus Attributes"
            : "Interview Questions"}
        </Title>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="default"
            onClick={() => setShowAttributes(!showAttributes)}
            style={{ marginRight: "8px" }}
          >
            {showAttributes ? "Questions" : "Attributes"}
          </Button>
          <Button type="default" icon={<SettingOutlined />} />
        </div>
      </div>

      {/* Tabs remain in the same position */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: "16px" }}
      >
        {Object.keys(stages || {}).map((stage) => (
          <TabPane tab={stage} key={stage} />
        ))}
      </Tabs>

      {/* Conditional rendering of content based on state */}
      {!showAttributes ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Text type="secondary">Time: 30 minutes</Text>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Add Question
            </Button>
          </div>

          <TemplateTable
            dataSource={currentQuestions}
            onUpdate={handleUpdateQuestion}
          />
        </>
      ) : (
        <Traits />
      )}

      <QuestionModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleAddQuestion}
      />
    </div>
  );
};

export default InterviewTemplate;
