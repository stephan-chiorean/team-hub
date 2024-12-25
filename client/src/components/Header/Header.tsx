import React from "react";
import { Layout, Menu, Button } from "antd";

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader
      style={{
        backgroundColor: "#001529",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Menu theme="dark" mode="horizontal" style={{ marginLeft: "auto" }}>
        <Menu.Item key="1">
          <Button type="primary">Login</Button>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
