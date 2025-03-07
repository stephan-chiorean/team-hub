import React from "react";
import { Card } from "antd";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
`;

const TemplateCard = styled(Card)`
  width: 280px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    border: 1px solid #1677ff;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const mockScorecards = [
  { id: "1", title: "Scorecard 1", description: "Description for Scorecard 1" },
  { id: "2", title: "Scorecard 2", description: "Description for Scorecard 2" },
  { id: "3", title: "Scorecard 3", description: "Description for Scorecard 3" },
  { id: "4", title: "Scorecard 4", description: "Description for Scorecard 4" },
];

const Scorecards = () => {
  return (
    <Grid>
      {mockScorecards.map((scorecard) => (
        <TemplateCard key={scorecard.id} title={scorecard.title}>
          <p>{scorecard.description}</p>
        </TemplateCard>
      ))}
    </Grid>
  );
};

export default Scorecards;
