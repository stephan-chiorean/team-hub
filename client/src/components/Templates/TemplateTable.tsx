import React, { useState } from "react";
import { Table, Typography, Checkbox, Button } from "antd";
import {
  ExclamationCircleFilled,
  MinusCircleFilled,
  UpCircleFilled,
  DownCircleFilled,
  EditFilled,
  DownOutlined,
  UpOutlined,
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
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
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
    setModalVisible(false);
    setSelectedQuestion(null);
  };

  const toggleProbes = (key: string) => {
    setExpandedKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text: string, record: InterviewQuestion) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <strong style={{ fontSize: "16px" }}>{text}</strong>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 8 }}
          >
            {/* Priority Icons */}
            {record.priority && priorityIcons[record.priority] && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                {priorityIcons[record.priority]}
                <Text type="secondary">Priority: {record.priority}</Text>
              </div>
            )}
            {/* Time */}
            {record.time && (
              <Text type="secondary">Time: {record.time || 0} minutes</Text>
            )}
            {/* Probes Button */}
            {record.probes && record.probes.length > 0 && (
              <div style={{ marginTop: "12px" }}>
                <Button
                  type="default"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleProbes(record.key);
                  }}
                  style={{
                    paddingLeft: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.45)", // Matches text color
                    textAlign: "left", // Aligns the text to the left
                  }}
                >
                  Probes
                  {expandedKeys.includes(record.key) ? (
                    <UpOutlined style={{ marginLeft: 2 }} />
                  ) : (
                    <DownOutlined style={{ marginLeft: 2 }} />
                  )}
                </Button>
              </div>
            )}
          </div>
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
        expandable={{
          expandedRowKeys: expandedKeys,
          expandIconColumnIndex: -1, // Hides the expand/collapse column
          expandedRowRender: (record) => (
            <div
              style={{
                padding: "16px",
                backgroundColor: "#fafafa",
              }}
            >
              <Text strong>Probes:</Text>
              <ul
                style={{
                  marginTop: "8px",
                  paddingLeft: "20px",
                  listStyleType: "disc",
                }}
              >
                {record.probes?.map((probe, index) => (
                  <li key={index} style={{ marginBottom: "4px" }}>
                    {probe}
                  </li>
                ))}
              </ul>
            </div>
          ),
          rowExpandable: (record) =>
            !!record.probes && record.probes.length > 0, // Only expandable if probes exist
        }}
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
