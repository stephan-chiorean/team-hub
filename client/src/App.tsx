import React from "react";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content
          style={{ margin: "24px 16px 0", padding: "24px", background: "#fff" }}
        >
          {/* Add your main content here */}
          Main Content
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Team Hub ©2023 Created by Your Company
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
