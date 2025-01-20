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
  InputNumber,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Attribute,
  AttributeSection,
  AttributeType,
  OptionAttribute,
  SliderAttribute,
  CheckboxAttribute,
} from "@/types/Attribute";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Attributes: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentSection, setCurrentSection] = useState<AttributeSection | "">(
    ""
  );
  const [selectedType, setSelectedType] = useState<AttributeType | null>(null);
  const [attributes, setAttributes] = useState<
    Record<AttributeSection, Attribute[]>
  >({
    [AttributeSection.Skills]: [],
    [AttributeSection.Traits]: [],
    [AttributeSection.Qualifications]: [],
    [AttributeSection.Details]: [],
  });

  const handleAddAttribute = (values: any) => {
    let newAttribute: Attribute;

    switch (values.type) {
      case AttributeType.Option:
        newAttribute = {
          section: currentSection as AttributeSection,
          attribute: values.attribute,
          type: AttributeType.Option,
          required: values.required || false,
          description: values.description || "",
          criteria: {
            options: values.criteria.options || [],
          },
        } as OptionAttribute;
        break;
      case AttributeType.Slider:
        newAttribute = {
          section: currentSection as AttributeSection,
          attribute: values.attribute,
          type: AttributeType.Slider,
          required: values.required || false,
          description: values.description || "",
          criteria: {
            min: values.criteria.min || 0,
            max: values.criteria.max || 100,
          },
        } as SliderAttribute;
        break;
      case AttributeType.Checkbox:
        newAttribute = {
          section: currentSection as AttributeSection,
          attribute: values.attribute,
          type: AttributeType.Checkbox,
          required: values.required || false,
          description: values.description || "",
        } as CheckboxAttribute;
        break;
      default:
        return;
    }

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

  const handleTypeChange = (value: AttributeType) => {
    setSelectedType(value);
    form.setFieldsValue({ criteria: undefined }); // Reset criteria when type changes
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
                        {item.type === AttributeType.Option && (
                          <div>Options: {item.criteria.options.join(", ")}</div>
                        )}
                        {item.type === AttributeType.Slider && (
                          <div>
                            Scoring: {item.criteria.min} - {item.criteria.max}
                          </div>
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
            <Select placeholder="Select Type" onChange={handleTypeChange}>
              {Object.values(AttributeType).map((type) => (
                <Option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {selectedType === AttributeType.Option && (
            <Form.Item
              name={["criteria", "options"]}
              label="Options"
              rules={[
                {
                  required: true,
                  message: "Please provide at least one option",
                },
              ]}
            >
              <Select
                mode="tags"
                placeholder="Enter options"
                tokenSeparators={[","]}
              />
            </Form.Item>
          )}

          {selectedType === AttributeType.Slider && (
            <>
              <Form.Item
                name={["criteria", "min"]}
                label="Min Score"
                rules={[
                  { required: true, message: "Please enter a minimum score" },
                ]}
              >
                <InputNumber min={0} max={100} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name={["criteria", "max"]}
                label="Max Score"
                rules={[
                  { required: true, message: "Please enter a maximum score" },
                ]}
              >
                <InputNumber min={0} max={100} style={{ width: "100%" }} />
              </Form.Item>
            </>
          )}

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
