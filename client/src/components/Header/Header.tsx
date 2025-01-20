import React from "react";
import { Layout, Menu, Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";
import logoCrop from "../../assets/logoCrop.png";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntHeader
      style={{
        position: "fixed", // Fix the header at the top
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#001529",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "48px",
        boxSizing: "border-box",
        width: "100%",
        padding: "0 24px",
        zIndex: 1100, // Ensure it's above other elements
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logoCrop}
          alt="Team Hub Logo"
          style={{ height: "48px", width: "auto" }}
        />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Menu.Item key="1" style={{ display: "flex", alignItems: "center" }}>
          <BellOutlined style={{ fontSize: "20px", color: "#fff" }} />
        </Menu.Item>
        <Menu.Item key="2" style={{ padding: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              paddingBottom: "5px",
              marginLeft: "10px",
            }}
          >
            <Avatar style={{ backgroundColor: "blue" }} />
          </div>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
