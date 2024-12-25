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
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import teamHubLogo from "../../assets/teamHubLogo.svg";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      width={250}
      style={{
        minHeight: "100vh",
        backgroundColor: "#001529",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ flex: 1 }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="sub1"
          icon={<TeamOutlined />}
          title="Team Management"
        >
          <Menu.Item key="2">
            <Link to="/team-management">View/manage team members</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/team-management/roles">Role assignments</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" icon={<ProjectOutlined />} title="Projects">
          <Menu.Item key="4">
            <Link to="/projects">Access ongoing and completed projects</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/projects/tasks">Assign tasks</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub3" icon={<UserAddOutlined />} title="Recruitment">
          <Menu.Item key="6">
            <Link to="/recruitment">Sourcing personas</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/recruitment/job-requisitions">Job requisitions</Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/recruitment/interviews">Candidate interviews</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="9" icon={<FileTextOutlined />}>
          <Link to="/onboarding">Onboarding</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="sub4"
          icon={<BarChartOutlined />}
          title="Reports/Analytics"
        >
          <Menu.Item key="10">
            <Link to="/reports-analytics">Team performance metrics</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/reports-analytics/progress">Project progress</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub5" icon={<SettingOutlined />} title="Settings">
          <Menu.Item key="12">
            <Link to="/settings">General settings for the user or team</Link>
          </Menu.Item>
          <Menu.Item key="13">
            <Link to="/settings/themes">Themes, preferences, etc.</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <div style={{ padding: "20px", textAlign: "center", marginTop: "auto" }}>
        <img
          src={teamHubLogo}
          alt="Team Hub Logo"
          style={{ maxWidth: "100%", marginBottom: "20px" }}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
