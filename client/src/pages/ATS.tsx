import React, { useState } from "react";
import { Select, Input, Button, message, Form, Typography } from "antd";

const { Option } = Select;
const { Title } = Typography;

const ATS = () => {
  const [selectedATS, setSelectedATS] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const atsOptions = ["Workday", "Greenhouse", "Rippling", "Lever"]; // Replace with actual ATS options

  const handleTestConnection = () => {
    setLoading(true);
    // Replace with actual API call to test connection
    setTimeout(() => {
      setLoading(false);
      if (apiKey) {
        message.success("Connection successful!");
      } else {
        message.error("Connection failed. Please check your API key.");
      }
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Form
        style={{ width: "300px" }}
        layout="vertical"
        onFinish={handleTestConnection}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Select Your ATS
        </Title>
        <Form.Item label="ATS" required>
          <Select
            value={selectedATS}
            onChange={setSelectedATS}
            placeholder="Select your ATS"
          >
            {atsOptions.map((ats) => (
              <Option key={ats} value={ats}>
                {ats}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="API Key" required>
          <Input
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Test Connection
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ATS;
