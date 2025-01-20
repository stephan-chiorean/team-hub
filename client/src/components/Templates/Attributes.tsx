import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Typography,
  List,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Attribute, AttributeSection, AttributeType } from "@/types/Attribute";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Attributes: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentSection, setCurrentSection] = useState<AttributeSection | "">(
    ""
  );
  const [attributes, setAttributes] = useState<
    Record<AttributeSection, Attribute[]>
  >({
    [AttributeSection.Skills]: [],
    [AttributeSection.Traits]: [],
    [AttributeSection.Qualifications]: [],
    [AttributeSection.Details]: [],
  });

  const handleAddAttribute = (values: any) => {
    const newAttribute: Attribute = {
      attribute: values.attribute,
      type: values.type,
      required: values.required || false,
      section: currentSection as AttributeSection,
      description: values.description || "",
    };
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [currentSection as AttributeSection]: [
        ...prevAttributes[currentSection as AttributeSection],
        newAttribute,
      ],
    }));
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDeleteAttribute = (section: AttributeSection, index: number) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [section]: prevAttributes[section].filter((_, i) => i !== index),
    }));
  };

  const openModal = (section: AttributeSection) => {
    setCurrentSection(section);
    setIsModalVisible(true);
  };

  return (
    <div>
      {Object.keys(attributes).map((section) => (
        <div key={section} style={{ marginBottom: "24px" }}>
          <Title level={4}>{section}</Title>
          <Button
            type="default"
            onClick={() => openModal(section as AttributeSection)}
          >
            Add Attribute
          </Button>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              padding: "16px",
              marginTop: "16px",
              backgroundColor: "#fafafa",
            }}
          >
            <List
              dataSource={attributes[section as AttributeSection]}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Are you sure you want to delete this attribute?"
                      onConfirm={() =>
                        handleDeleteAttribute(
                          section as AttributeSection,
                          index
                        )
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link" icon={<DeleteOutlined />} />
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    title={<strong>{item.attribute}</strong>}
                    description={
                      <>
                        <div>Type: {item.type}</div>
                        <div>Required: {item.required ? "Yes" : "No"}</div>
                        {item.description && (
                          <div>Description: {item.description}</div>
                        )}
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      ))}
      <Modal
        title="Add Attribute"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddAttribute}>
          <Form.Item
            name="section"
            label="Section"
            initialValue={currentSection}
          >
            <Input value={currentSection} disabled />
          </Form.Item>
          <Form.Item
            name="attribute"
            label="Attribute"
            rules={[{ required: true, message: "Please enter the attribute" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select the type" }]}
          >
            <Select placeholder="Select Type">
              {Object.values(AttributeType).map((type) => (
                <Option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="required" valuePropName="checked">
            <Checkbox>Required</Checkbox>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Attributes;
