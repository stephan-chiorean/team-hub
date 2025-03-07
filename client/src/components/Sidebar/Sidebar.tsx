import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ProjectOutlined,
  UserAddOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  FileSearchOutlined,
  AreaChartOutlined,
  CloudOutlined,
  DatabaseOutlined,
  LikeOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import logoCrop from "../../assets/logoCrop.png";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const selectedKey = [
    "interviews",
    "assessments",
    "candidates",
    "score-overview",
  ].includes(path)
    ? "interviews"
    : path || "dashboard";

  return (
    <div
      style={{
        width: 250,
        position: "fixed",
        left: 0,
        top: 48, // Starts below the header
        bottom: 0,
        backgroundColor: "#001529",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1000,
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            marginBottom: 16,
          }}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="members" icon={<TeamOutlined />}>
            <Link to="/members">Members</Link>
          </Menu.Item>
          <Menu.Item
            key="templates"
            icon={<DatabaseOutlined />}
            title="Templates"
          >
            <Link to="/templates">Templates</Link>
          </Menu.Item>
          <Menu.Item key="interviews" icon={<FileSearchOutlined />}>
            <Link to="/interviews">Interviews</Link>
          </Menu.Item>
          <Menu.Item key="integrations" icon={<CloudOutlined />}>
            <Link to="/integrations">Integrations</Link>
          </Menu.Item>
          <Menu.Item key="jobs" icon={<GlobalOutlined />}>
            <Link to="/jobs">Jobs</Link>
          </Menu.Item>

          {/* Spacer to push settings to the bottom */}
          <div style={{ flex: 1 }}></div>

          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
