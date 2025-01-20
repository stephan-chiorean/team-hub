import React from "react";
import { Table, Checkbox } from "antd";

interface AssessmentTableProps {
  dataSource: any[];
  columns: any[];
  selectedCell: string | null;
  selectedCheckboxes: { [key: number]: { [key: string]: boolean } };
  currentQuestionIndex: number;
  handleCellClick: (level: string) => void;
  handleCheckboxClick: (level: string, index: number) => void;
}

const AssessmentTable: React.FC<AssessmentTableProps> = ({
  dataSource,
  columns,
  selectedCell,
  selectedCheckboxes,
  currentQuestionIndex,
  handleCellClick,
  handleCheckboxClick,
}) => {
  const renderColumn = (items: string[], level: string) => (
    <div
      style={{
        border: selectedCell === level ? "2px solid blue" : "1px solid #d9d9d9",
        backgroundColor: selectedCell === level ? "lightblue" : "white",
        cursor: "pointer",
        padding: "8px",
        height: "100%",
        borderRadius: "8px",
      }}
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== "INPUT") {
          handleCellClick(level);
        }
      }}
    >
      {items.map((item, index) => {
        const checkboxKey = `${level}-${index}`;
        const isChecked =
          selectedCheckboxes[currentQuestionIndex]?.[checkboxKey] || false;
        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <Checkbox
              checked={isChecked}
              onClick={() => handleCheckboxClick(level, index)}
            />
            <span style={{ marginLeft: "8px" }}>{item}</span>
          </div>
        );
      })}
    </div>
  );

  const tableColumns = columns.map((col) => ({
    ...col,
    render: (items: string[]) => renderColumn(items, col.key),
  }));

  return (
    <Table
      dataSource={dataSource}
      columns={tableColumns}
      pagination={false}
      bordered
    />
  );
};

export default AssessmentTable;
