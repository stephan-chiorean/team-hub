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
    "decision",
  ].includes(path)
    ? "interviews"
    : path || "dashboard";

  return (
    <Sider
      width={250}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#001529",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          height: "64px",
          padding: "8px",
          paddingLeft: "24px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <img
          src={logoCrop}
          alt="Team Hub Logo"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{
          flex: 1,
          borderRight: "3px solid blue",
          boxSizing: "border-box",
        }}
      >
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="team-management"
          icon={<TeamOutlined />}
          title="Team Management"
        >
          <Menu.Item key="team-management">
            <Link to="/team-management">View/manage team members</Link>
          </Menu.Item>
          <Menu.Item key="roles">
            <Link to="/roles">Roles</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="projects" icon={<ProjectOutlined />}>
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item key="candidates" icon={<UserAddOutlined />}>
          <Link to="/candidates">Candidates</Link>
        </Menu.Item>
        <Menu.Item key="assessments" icon={<FileTextOutlined />}>
          <Link to="/assessments">Assessments</Link>
        </Menu.Item>
        <Menu.Item key="score-overview" icon={<BarChartOutlined />}>
          <Link to="/score-overview">Score Overview</Link>
        </Menu.Item>
        <Menu.Item key="decision" icon={<FileSearchOutlined />}>
          <Link to="/decision">Decision</Link>
        </Menu.Item>
        <Menu.Item key="interviews" icon={<FileSearchOutlined />}>
          <Link to="/interviews">Interviews</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/settings">Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
