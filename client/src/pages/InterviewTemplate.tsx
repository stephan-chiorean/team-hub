import React, { useState } from "react";
import { Tabs, Button, Typography } from "antd";
import { useParams } from "react-router-dom";
import { interviewStages } from "@/data/interviewStages";
import TemplateTable from "@/components/Templates/TemplateTable";
import QuestionModal from "@/components/Templates/QuestionModal";
import { InterviewQuestion } from "@/types/InterviewQuestion";

const { TabPane } = Tabs;
const { Text } = Typography;

const InterviewTemplate: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const [activeTab, setActiveTab] = useState("Recruiter Screen");
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      priority: values.priority || "Medium", // Default priority
    };
    stages[activeTab].push(newQuestion); // Add question to the data
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
      <Tabs defaultActiveKey="Recruiter Screen" onChange={setActiveTab}>
        {Object.keys(stages || {}).map((stage) => (
          <TabPane tab={stage} key={stage}>
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
              onUpdate={handleUpdateQuestion} // Pass onUpdate prop
            />
          </TabPane>
        ))}
      </Tabs>
      <QuestionModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleAddQuestion}
      />
    </div>
  );
};

export default InterviewTemplate;
