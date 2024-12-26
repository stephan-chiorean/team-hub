import React from "react";
import { Layout, Menu, Button, Badge, Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SimpleLogo from "../../assets/SimpleLogo.svg"; // Adjust the import path as needed

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();

  return (
    <AntHeader
      style={{
        backgroundColor: "#001529",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img
          src={SimpleLogo}
          alt="SimpleLogo"
          style={{ width: 50, height: 50 }}
        />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
      >
        <Menu.Item key="1">
          <BellOutlined style={{ fontSize: "20px", color: "#fff" }} />
        </Menu.Item>
        <Menu.Item key="2">
          <Avatar style={{ backgroundColor: "#87d068" }} />
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
