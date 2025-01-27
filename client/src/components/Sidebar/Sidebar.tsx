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
    <Sider
      width={250}
      style={{
        position: "fixed",
        left: 0,
        top: 48, // Starts below the header
        bottom: 0,
        backgroundColor: "#001529",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{
          flex: 1,
          boxSizing: "border-box",
        }}
      >
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="members" icon={<TeamOutlined />}>
          <Link to="/members">Members</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="templates"
          icon={<DatabaseOutlined />}
          title="Templates"
        >
          <Menu.Item key="team-management">
            <Link to="/team-management">Interviews</Link>
          </Menu.Item>
          <Menu.Item key="roles">
            <Link to="/roles">1 on 1s</Link>
          </Menu.Item>
          <Menu.Item key="roles">
            <Link to="/roles">Onboarding</Link>
          </Menu.Item>
          <Menu.Item key="roles">
            <Link to="/roles">Career Development</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="engagement"
          icon={<LikeOutlined />}
          title="Engagement"
        >
          <Menu.Item key="team-management">
            <Link to="/team-management">Feedback</Link>
          </Menu.Item>
          <Menu.Item key="roles">
            <Link to="/roles">Referrals</Link>
          </Menu.Item>
          <Menu.Item key="roles">
            <Link to="/roles">Surveys</Link>
          </Menu.Item>
          <Menu.Item key="roles">
            <Link to="/roles">Initiatives</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="interviews" icon={<FileSearchOutlined />}>
          <Link to="/interviews">Interviews</Link>
        </Menu.Item>
        <Menu.Item key="candidates" icon={<UserAddOutlined />}>
          <Link to="/candidates">Candidates</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="integrations"
          icon={<CloudOutlined />}
          title="Integrations"
        >
          <Menu.Item key="ats">
            <Link to="/ats">ATS</Link>
          </Menu.Item>
          <Menu.Item key="workflows">
            <Link to="/workflows">Workflows</Link>
          </Menu.Item>
          <Menu.Item key="destinations">
            <Link to="/destinations">Destinations</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="jobs" icon={<GlobalOutlined />}>
          <Link to="/jobs">Jobs</Link>
        </Menu.Item>
        <Menu.Item key="analytics" icon={<AreaChartOutlined />}>
          <Link to="/analytics">Analytics</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/settings">Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
