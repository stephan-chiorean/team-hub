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
import teamHubLogo from "../../assets/teamHubLogo.svg";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      width={250}
      style={{
        minHeight: "100vh",
        backgroundColor: "#001529",
      }}
    >
      <div style={{ paddingRight: "25px", textAlign: "center" }}>
        <img
          src={teamHubLogo}
          alt="Team Hub Logo"
          style={{ maxWidth: 200, maxHeight: 100 }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ flex: 1 }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.SubMenu
          key="sub1"
          icon={<TeamOutlined />}
          title="Team Management"
        >
          <Menu.Item key="2">View/manage team members</Menu.Item>
          <Menu.Item key="3">Role assignments</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" icon={<ProjectOutlined />} title="Projects">
          <Menu.Item key="4">Access ongoing and completed projects</Menu.Item>
          <Menu.Item key="5">Assign tasks</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub3" icon={<UserAddOutlined />} title="Recruitment">
          <Menu.Item key="6">Sourcing personas</Menu.Item>
          <Menu.Item key="7">Job requisitions</Menu.Item>
          <Menu.Item key="8">Candidate interviews</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="9" icon={<FileTextOutlined />}>
          Onboarding
        </Menu.Item>
        <Menu.SubMenu
          key="sub4"
          icon={<BarChartOutlined />}
          title="Reports/Analytics"
        >
          <Menu.Item key="10">Team performance metrics</Menu.Item>
          <Menu.Item key="11">Project progress</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub5" icon={<SettingOutlined />} title="Settings">
          <Menu.Item key="12">General settings for the user or team</Menu.Item>
          <Menu.Item key="13">Themes, preferences, etc.</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
