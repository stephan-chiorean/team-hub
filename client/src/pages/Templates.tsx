import React from "react";
import { Tabs } from "antd";
import Blueprints from "@/components/Blueprints/Blueprint";
import Scorecards from "@/components/Scorecards/Scorecard";

const { TabPane } = Tabs;

const Templates = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Blueprints" key="1">
        <Blueprints />
      </TabPane>
      <TabPane tab="Scorecards" key="2">
        <Scorecards />
      </TabPane>
    </Tabs>
  );
};

export default Templates;
