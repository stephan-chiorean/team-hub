import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Table, Input, Checkbox, Tooltip } from "antd";
import Countdown, { zeroPad } from "react-countdown";
import { interviewStages } from "./InterviewTemplate";

const { Title } = Typography;
const { TextArea } = Input;

const Assessment: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [notes, setNotes] = useState<string>(""); // Single notes variable for the entire session
  const [started, setStarted] = useState(true); // Start immediately
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
    [key: string]: boolean;
  }>({});
  const [timerKey, setTimerKey] = useState(0);

  const interviewData = interviewStages["cloud-backend"]["Recruiter Screen"];
  const currentQuestion = interviewData[currentQuestionIndex];

  useEffect(() => {
    if (started) {
      setTimerKey((prevKey) => prevKey + 1);
    }
  }, [currentQuestionIndex, started]);

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedCell(null);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSelectedCell(null);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert a tab character at the cursor position
      const newValue =
        textarea.value.substring(0, start) +
        "\t" +
        textarea.value.substring(end);
      setNotes(newValue);

      // Move the cursor after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      });
    }
  };

  const handleCellClick = (level: string) => {
    setSelectedCell((prevSelected) => (prevSelected === level ? null : level));
  };

  const handleCheckboxClick = (level: string, index: number) => {
    const checkboxKey = `${level}-${index}`;
    setSelectedCheckboxes((prevSelectedCheckboxes) => ({
      ...prevSelectedCheckboxes,
      [checkboxKey]: !prevSelectedCheckboxes[checkboxKey],
    }));
  };

  const columns = [
    {
      title: "Junior",
      dataIndex: "Junior",
      key: "Junior",
      render: (items: string[]) => (
        <div
          style={{
            border:
              selectedCell === "Junior"
                ? "2px solid blue"
                : "1px solid #d9d9d9",
            backgroundColor: selectedCell === "Junior" ? "lightblue" : "white",
            cursor: "pointer",
            padding: "8px",
            height: "100%",
            borderRadius: "8px",
          }}
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName !== "INPUT") {
              handleCellClick("Junior");
            }
          }}
        >
          {items.map((item, index) => {
            const checkboxKey = `Junior-${index}`;
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
                  checked={selectedCheckboxes[checkboxKey]}
                  onClick={() => handleCheckboxClick("Junior", index)}
                />
                <span style={{ marginLeft: "8px" }}>{item}</span>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      title: "Senior",
      dataIndex: "Senior",
      key: "Senior",
      render: (items: string[]) => (
        <div
          style={{
            border:
              selectedCell === "Senior"
                ? "2px solid blue"
                : "1px solid #d9d9d9",
            backgroundColor: selectedCell === "Senior" ? "lightblue" : "white",
            cursor: "pointer",
            padding: "8px",
            height: "100%",
            borderRadius: "8px",
          }}
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName !== "INPUT") {
              handleCellClick("Senior");
            }
          }}
        >
          {items.map((item, index) => {
            const checkboxKey = `Senior-${index}`;
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
                  checked={selectedCheckboxes[checkboxKey]}
                  onClick={() => handleCheckboxClick("Senior", index)}
                />
                <span style={{ marginLeft: "8px" }}>{item}</span>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      title: "Staff",
      dataIndex: "Staff",
      key: "Staff",
      render: (items: string[]) => (
        <div
          style={{
            border:
              selectedCell === "Staff" ? "2px solid blue" : "1px solid #d9d9d9",
            backgroundColor: selectedCell === "Staff" ? "lightblue" : "white",
            cursor: "pointer",
            padding: "8px",
            height: "100%",
            borderRadius: "8px",
          }}
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName !== "INPUT") {
              handleCellClick("Staff");
            }
          }}
        >
          {items.map((item, index) => {
            const checkboxKey = `Staff-${index}`;
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
                  checked={selectedCheckboxes[checkboxKey]}
                  onClick={() => handleCheckboxClick("Staff", index)}
                />
                <span style={{ marginLeft: "8px" }}>{item}</span>
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      Junior: currentQuestion.levels.Junior,
      Senior: currentQuestion.levels.Senior,
      Staff: currentQuestion.levels.Staff,
    },
  ];

  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>Time's up!</span>;
    } else {
      const isLessThanOneMinute = minutes === 0;
      return (
        <span style={{ color: isLessThanOneMinute ? "red" : "black" }}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  const handleFinish = () => {
    navigate(`/decision/${candidateId}`);
  };

  return (
    <div style={{ padding: "24px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={4}>Question: {currentQuestion.question}</Title>
        <Countdown
          key={timerKey}
          date={Date.now() + (currentQuestion.time || 0) * 60000}
          renderer={renderer}
        />
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
      <TextArea
        rows={8}
        value={notes}
        onChange={handleNotesChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter your notes here"
        style={{ marginTop: "16px", whiteSpace: "pre-wrap" }}
      />
      <div style={{ marginTop: "16px" }}>
        {currentQuestionIndex > 0 && (
          <Button style={{ marginRight: "8px" }} onClick={handlePrev}>
            Previous
          </Button>
        )}
        {currentQuestionIndex < interviewData.length - 1 ? (
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
    </div>
  );
};

export default Assessment;
