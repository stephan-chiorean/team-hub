import { Layout, Menu, Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader
      style={{
        backgroundColor: "#001529",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "3px solid blue",
        height: "64px",
        boxSizing: "border-box",
      }}
    >
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
              paddingBottom: "10px",
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
