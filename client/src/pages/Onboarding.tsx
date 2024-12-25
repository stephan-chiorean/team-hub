import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Card,
  Row,
  Col,
  Dropdown,
  Menu,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const Onboarding = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<any | null>(null);
  const [viewingTemplate, setViewingTemplate] = useState<any | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values: any) => {
    if (editingTemplate) {
      setTemplates(
        templates.map((template) =>
          template === editingTemplate ? values : template
        )
      );
      setEditingTemplate(null);
    } else {
      setTemplates([...templates, values]);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingTemplate(null);
  };

  const handleEdit = (template: any) => {
    setEditingTemplate(template);
    setIsModalVisible(true);
  };

  const handleDelete = (template: any) => {
    setTemplates(templates.filter((t) => t !== template));
  };

  const handleView = (template: any) => {
    setViewingTemplate(template);
    setIsViewModalVisible(true);
  };

  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setViewingTemplate(null);
  };

  const menu = (template: any) => (
    <Menu>
      <Menu.Item onClick={() => handleEdit(template)}>Edit</Menu.Item>
      <Menu.Item onClick={() => handleDelete(template)}>Delete</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <Button type="primary" onClick={showModal}>
          Create New Template
        </Button>
      </div>
      <Row gutter={16}>
        {templates.map((template, index) => (
          <Col span={8} key={index}>
            <Card
              style={{ cursor: "pointer" }}
              title={template.name}
              bordered={false}
              extra={
                <Dropdown overlay={menu(template)} trigger={["click"]}>
                  <EllipsisOutlined
                    style={{ fontSize: "24px" }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Dropdown>
              }
              onClick={() => handleView(template)}
            >
              {template.description}
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title={editingTemplate ? "Edit Template" : "Create New Template"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingTemplate || { name: "", description: "" }}
          onFinish={handleOk}
        >
          <Form.Item
            name="name"
            label="Template Name"
            rules={[
              { required: true, message: "Please input the template name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={viewingTemplate?.name}
        visible={isViewModalVisible}
        onCancel={handleViewCancel}
        footer={null}
      >
        <p>{viewingTemplate?.description}</p>
      </Modal>
    </div>
  );
};

export default Onboarding;
