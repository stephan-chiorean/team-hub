import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

interface NotesSectionProps {
  notes: string;
  handleNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  handleNotesChange,
  handleKeyDown,
}) => {
  return (
    <TextArea
      rows={8}
      value={notes}
      onChange={handleNotesChange}
      onKeyDown={handleKeyDown}
      placeholder="Enter your notes here"
      style={{ marginTop: "16px", whiteSpace: "pre-wrap" }}
    />
  );
};

export default NotesSection;
