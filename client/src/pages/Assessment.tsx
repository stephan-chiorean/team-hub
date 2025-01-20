import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import Countdown, { zeroPad } from "react-countdown";
import { interviewStages } from "@/data/interviewStages";
import { CloseOutlined } from "@ant-design/icons";
import QuestionNavigation from "@/components/Assessment/QuestionNavigation";
import AssessmentTable from "@/components/Assessment/AssessmentTable";
import NotesSection from "@/components/Assessment/NotesSection";
import ProbesSection from "@/components/Assessment/ProbesSection";

// Define the shape of a question
interface InterviewQuestion {
  levels: Record<string, string[]>; // Allow any string keys for levels
  time?: number; // Optional time in minutes
  probes?: string[];
}

const Assessment: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [notes, setNotes] = useState<string>("");
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
    [key: number]: { [key: string]: boolean };
  }>({});

  const interviewData: InterviewQuestion[] =
    interviewStages["cloud-backend"]["Recruiter Screen"];

  // State to store start and end times for questions that have time allocated
  const [questionTimeMap, setQuestionTimeMap] = useState<{
    [key: number]: { startTime: number; endTime: number } | undefined;
  }>({});

  useEffect(() => {
    // Initialize the time map only if time exists in the questions
    const initialTimeMap = interviewData.reduce((acc, question, index) => {
      if (question.time) {
        const currentTime = Date.now();
        acc[index] = {
          startTime: currentTime,
          endTime: currentTime + question.time * 60000, // Convert minutes to milliseconds
        };
      }
      return acc;
    }, {} as { [key: number]: { startTime: number; endTime: number } | undefined });

    setQuestionTimeMap(initialTimeMap);
  }, []);

  const handleNext = () => {
    const currentTime = Date.now();
    const currentEndTime = questionTimeMap[currentQuestionIndex]?.endTime || 0;
    const remainingTime = currentEndTime ? currentEndTime - currentTime : 0;

    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;

      if (interviewData[nextIndex]?.time && remainingTime > 0) {
        setQuestionTimeMap((prevMap) => ({
          ...prevMap,
          [nextIndex]: {
            startTime: currentTime,
            endTime:
              currentTime +
              interviewData[nextIndex].time! * 60000 +
              remainingTime,
          },
        }));
      }

      return nextIndex;
    });

    setSelectedCell(null);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSelectedCell(null);
  };

  const handleCellClick = (level: string) => {
    setSelectedCell((prevSelected) => (prevSelected === level ? null : level));
  };

  const handleCheckboxClick = (level: string, index: number) => {
    const checkboxKey = `${level}-${index}`;
    setSelectedCheckboxes((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: {
        ...prevState[currentQuestionIndex],
        [checkboxKey]: !prevState[currentQuestionIndex]?.[checkboxKey],
      },
    }));
  };

  const handleExit = () => {
    navigate("/candidates/1");
  };

  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      return <span style={{ color: "red" }}>Time's up!</span>;
    } else {
      return (
        <span style={{ color: minutes === 0 ? "red" : "gray" }}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  const handleFinish = () => {
    console.log("Final checkbox states:", selectedCheckboxes);
    navigate(`/decision/${candidateId}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <QuestionNavigation
        currentQuestionIndex={currentQuestionIndex}
        currentQuestion={interviewData[currentQuestionIndex]}
        interviewDataLength={interviewData.length}
        selectedCell={selectedCell}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleFinish={handleFinish}
      />

      <div
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          textAlign: "center",
          display: "block",
          margin: "0 auto 16px auto",
        }}
      >
        {interviewData[currentQuestionIndex]?.time &&
        questionTimeMap[currentQuestionIndex] ? (
          <Countdown
            date={questionTimeMap[currentQuestionIndex]!.endTime}
            renderer={renderer}
          />
        ) : (
          <span style={{ color: "gray" }}>No time limit</span>
        )}
      </div>

      <AssessmentTable
        dataSource={[
          {
            key: "1",
            Junior: interviewData[currentQuestionIndex].levels.Junior,
            Senior: interviewData[currentQuestionIndex].levels.Senior,
            Staff: interviewData[currentQuestionIndex].levels.Staff,
          },
        ]}
        columns={[
          { title: "Junior", dataIndex: "Junior", key: "Junior" },
          { title: "Senior", dataIndex: "Senior", key: "Senior" },
          { title: "Staff", dataIndex: "Staff", key: "Staff" },
        ]}
        selectedCell={selectedCell}
        selectedCheckboxes={selectedCheckboxes}
        currentQuestionIndex={currentQuestionIndex}
        handleCellClick={handleCellClick}
        handleCheckboxClick={handleCheckboxClick}
      />

      <NotesSection
        notes={notes}
        handleNotesChange={(e) => setNotes(e.target.value)}
        handleKeyDown={(e) => e.key === "Tab" && e.preventDefault()}
      />

      <ProbesSection
        probes={interviewData[currentQuestionIndex].probes || []}
      />

      <Button
        type="default"
        onClick={handleExit}
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
        }}
      >
        Exit Interview <CloseOutlined />
      </Button>
    </div>
  );
};

export default Assessment;
