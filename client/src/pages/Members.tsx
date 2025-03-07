import { useState } from "react";
import { Button, Tabs, Input } from "antd";
import Pods from "@/components/Members/Pods";
import MembersTable from "@/components/Members/MembersTable";
import AddPodModal from "@/components/Members/AddPodModal";

const { TabPane } = Tabs;
const { Search } = Input;

const Members = () => {
  const [searchText, setSearchText] = useState("");
  const [showPodModal, setShowPodModal] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Members" key="1">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Search
              placeholder="Search members"
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
            <Button type="primary">Invite Member</Button>
          </div>
          <MembersTable searchText={searchText} />
        </TabPane>
        <TabPane tab="Pods" key="2">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Search
              placeholder="Search pods"
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
            <Button onClick={() => setShowPodModal(true)} type="primary">
              Add Pod
            </Button>
          </div>
          <Pods />
        </TabPane>
      </Tabs>
      <AddPodModal
        visible={showPodModal}
        onCancel={() => setShowPodModal(false)}
        onCreate={() => setShowPodModal(false)}
      />
    </div>
  );
};

export default Members;
