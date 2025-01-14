import React, { useState } from "react";
import { Table, Typography, Checkbox } from "antd";
import {
  ExclamationCircleFilled,
  MinusCircleFilled,
  UpCircleFilled,
  DownCircleFilled,
  EditFilled,
} from "@ant-design/icons";
import { InterviewQuestion, Priority } from "@/types/InterviewQuestion";
import EditQuestionModal from "./EditQuestionModal";

const { Text } = Typography;

interface TemplateTableProps {
  dataSource: InterviewQuestion[];
  onUpdate: (updatedQuestion: InterviewQuestion) => void;
}

const TemplateTable: React.FC<TemplateTableProps> = ({
  dataSource,
  onUpdate,
}) => {
  const [selectedQuestion, setSelectedQuestion] =
    useState<InterviewQuestion | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const priorityIcons: Record<Priority, React.ReactNode> = {
    [Priority.Critical]: (
      <ExclamationCircleFilled style={{ color: "purple", marginRight: 8 }} />
    ),
    [Priority.High]: (
      <UpCircleFilled style={{ color: "red", marginRight: 8 }} />
    ),
    [Priority.Standard]: (
      <MinusCircleFilled style={{ color: "orange", marginRight: 8 }} />
    ),
    [Priority.Low]: (
      <DownCircleFilled style={{ color: "blue", marginRight: 8 }} />
    ),
    [Priority.Cosmetic]: (
      <EditFilled style={{ color: "gray", marginRight: 8 }} />
    ),
  };

  const handleRowClick = (record: InterviewQuestion) => {
    setSelectedQuestion(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedQuestion(null);
  };

  const handleModalSave = (updatedQuestion: InterviewQuestion) => {
    onUpdate(updatedQuestion);
    handleModalClose();
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text: string, record: InterviewQuestion) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <strong style={{ fontSize: "16px" }}>{text}</strong>
          <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
            {record.priority && priorityIcons[record.priority] && (
              <>
                <div style={{ marginRight: 8 }}>
                  <Text type="secondary">Priority: </Text>
                </div>
                {priorityIcons[record.priority]}
                <Text type="secondary">{record.priority}</Text>
              </>
            )}
          </div>
          {record.time && (
            <Text type="secondary">Time: {record.time || 0} minutes</Text>
          )}
        </div>
      ),
      onCell: () => ({
        style: {
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #e8e8e8",
          verticalAlign: "top",
          padding: "16px",
        },
      }),
    },
    ...["Junior", "Senior", "Staff"].map((level) => ({
      title: level,
      dataIndex: ["levels", level],
      key: level,
      render: (items: string[]) => (
        <div>
          {items.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <Checkbox disabled />
              <span style={{ marginLeft: 8 }}>{item}</span>
            </div>
          ))}
        </div>
      ),
      onCell: () => ({
        style: {
          verticalAlign: "top",
        },
      }),
    })),
  ];

  return (
    <>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: "pointer" },
        })}
      />
      <EditQuestionModal
        visible={isModalVisible}
        questionData={selectedQuestion}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </>
  );
};

export default TemplateTable;
