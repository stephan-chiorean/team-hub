import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Checkbox, Select, Button, Divider } from "antd";
import { FaCalendarAlt, FaFileExcel, FaDatabase } from "react-icons/fa";
import { SiNotion, SiGreenhouse } from "react-icons/si";

const { Option } = Select;

const integrationIcons: Record<string, JSX.Element> = {
  greenhouse: <SiGreenhouse size={40} />,
  notion: <SiNotion size={40} />,
  calendar: <FaCalendarAlt size={40} />,
  sheets: <FaFileExcel size={40} />,
  datadog: <FaDatabase size={40} />,
};

const triggerEvents = [
  { key: "interview_completed", label: "On Interview Completed" },
  { key: "hire_made", label: "On Hire for a Job" },
];

const dataAttributes = [
  { key: "candidate_name", label: "Candidate Name" },
  { key: "candidate_status", label: "Candidate Status" },
  { key: "panel_scores", label: "Panelist Scores" },
  { key: "final_decision", label: "Final Decision" },
  { key: "time_taken", label: "Time Taken" },
  { key: "criteria_met", label: "Criteria Met" },
  { key: "hiring_manager_notes", label: "Hiring Manager Notes" },
];

const Integration = () => {
  const { integrationId } = useParams<{ integrationId: string }>();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  const handleEventChange = (value: string) => {
    setSelectedEvent(value);
    setSelectedAttributes([]);
  };

  const handleAttributeToggle = (checked: boolean, key: string) => {
    setSelectedAttributes((prev) =>
      checked ? [...prev, key] : prev.filter((attr) => attr !== key)
    );
  };

  const handleSave = () => {
    console.log("Saving Integration Config:", {
      integrationId,
      selectedEvent,
      selectedAttributes,
    });
  };

  // Capitalize and format the integration label
  const formattedLabel = integrationId
    ? integrationId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Integration";

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <Card
        title={`Configure ${formattedLabel}`}
        style={{ textAlign: "center" }}
      >
        {/* Centered Integration Icon */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {integrationIcons[integrationId ?? ""] || "🔌"}
        </div>

        <Divider />

        {/* Trigger Event Selection */}
        <div style={{ marginBottom: "20px" }}>
          <p>
            <strong>Trigger Event:</strong>
          </p>
          <Select
            placeholder="Select an event"
            value={selectedEvent}
            onChange={handleEventChange}
            style={{ width: "100%" }}
          >
            {triggerEvents.map((event) => (
              <Option key={event.key} value={event.key}>
                {event.label}
              </Option>
            ))}
          </Select>
        </div>

        {/* Data Attributes Selection */}
        {selectedEvent && (
          <div>
            <p>
              <strong>Data to Send:</strong>
            </p>
            {dataAttributes.map((attr) => (
              <Checkbox
                key={attr.key}
                checked={selectedAttributes.includes(attr.key)}
                onChange={(e) =>
                  handleAttributeToggle(e.target.checked, attr.key)
                }
              >
                {attr.label}
              </Checkbox>
            ))}
          </div>
        )}

        <Divider />

        <Button type="primary" onClick={handleSave} disabled={!selectedEvent}>
          Save Configuration
        </Button>
      </Card>
    </div>
  );
};

export default Integration;
