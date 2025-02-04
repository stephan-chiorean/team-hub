import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Slider,
  Select,
  Typography,
  List,
  Popconfirm,
  Divider,
  Popover,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteOutlined,
  FileTextOutlined,
  CloseOutlined,
} from "@ant-design/icons";
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

const AttributesAssessment: React.FC = () => {
  const navigate = useNavigate();
  const { candidateId } = useParams<{ candidateId: string }>();

  const [attributes, setAttributes] = useState<
    Record<AttributeSection, Attribute[]>
  >({
    [AttributeSection.Skills]: [],
    [AttributeSection.Traits]: [],
    [AttributeSection.Qualifications]: [],
    [AttributeSection.Details]: [],
  });

  const [responses, setResponses] = useState<Record<string, any>>({});
  const [notesVisible, setNotesVisible] = useState(false);

  useEffect(() => {
    // Simulate fetching attributes from an API or local storage
    const fetchedAttributes: Record<AttributeSection, Attribute[]> = {
      [AttributeSection.Skills]: [
        {
          section: AttributeSection.Skills,
          attribute: "Programming Proficiency",
          type: AttributeType.Slider,
          required: true,
          description: "Rate the candidate's programming proficiency.",
          criteria: { min: 0, max: 100 },
        } as SliderAttribute,
        {
          section: AttributeSection.Skills,
          attribute: "Algorithmic Thinking",
          type: AttributeType.Slider,
          required: true,
          description: "Evaluate algorithmic problem-solving ability.",
          criteria: { min: 0, max: 100 },
        } as SliderAttribute,
        {
          section: AttributeSection.Skills,
          attribute: "System Design Knowledge",
          type: AttributeType.Option,
          required: false,
          description: "Rate the candidate's knowledge of system design.",
          criteria: { options: ["Excellent", "Good", "Fair", "Poor"] },
        } as OptionAttribute,
      ],
      [AttributeSection.Traits]: [
        {
          section: AttributeSection.Traits,
          attribute: "Teamwork",
          type: AttributeType.Option,
          required: false,
          description: "How well does the candidate work in a team?",
          criteria: { options: ["Excellent", "Good", "Average", "Poor"] },
        } as OptionAttribute,
        {
          section: AttributeSection.Traits,
          attribute: "Communication Skills",
          type: AttributeType.Option,
          required: true,
          description: "Rate the candidate's communication skills.",
          criteria: { options: ["Excellent", "Good", "Average", "Poor"] },
        } as OptionAttribute,
        {
          section: AttributeSection.Traits,
          attribute: "Leadership Qualities",
          type: AttributeType.Checkbox,
          required: false,
          description: "Does the candidate demonstrate leadership?",
        } as CheckboxAttribute,
      ],
      [AttributeSection.Qualifications]: [
        {
          section: AttributeSection.Qualifications,
          attribute: "Certified Scrum Master",
          type: AttributeType.Checkbox,
          required: false,
          description: "Is the candidate a certified Scrum Master?",
        } as CheckboxAttribute,
      ],
      [AttributeSection.Details]: [],
    };

    setAttributes(fetchedAttributes);

    // Initialize responses state with default values
    const initialResponses: Record<string, any> = {};
    Object.values(fetchedAttributes).forEach((section) =>
      section.forEach((attr) => {
        if (attr.type === AttributeType.Slider) {
          initialResponses[attr.attribute] = attr.criteria.min;
        } else if (attr.type === AttributeType.Option) {
          initialResponses[attr.attribute] = undefined;
        } else if (attr.type === AttributeType.Checkbox) {
          initialResponses[attr.attribute] = false;
        }
      })
    );
    setResponses(initialResponses);
  }, []);

  const handleResponseChange = (attribute: string, value: any) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [attribute]: value,
    }));
  };

  const handleDeleteResponse = (attribute: string) => {
    setResponses((prevResponses) => {
      const updatedResponses = { ...prevResponses };
      delete updatedResponses[attribute];
      return updatedResponses;
    });
  };

  const handleSubmit = () => {
    console.log("Final responses:", responses);
    navigate(`/decision/${candidateId}`);
  };

  const notesContent = (
    <div style={{ maxWidth: "300px", whiteSpace: "pre-wrap" }}>
      <Typography.Paragraph>
        Strengths:
        <br />
        - Knows how to communicate their thoughts
        <br />
        - Keeps composure under pressure.
        <br />
        <br />
        Not sure why they keep mentioning blah blah. I would've done something
        else
        <br />
        <br />
        API Design
        <br />- Shows command of the topic
      </Typography.Paragraph>
      <Button
        type="default"
        icon={<CloseOutlined />}
        onClick={() => setNotesVisible(false)}
        style={{ marginTop: "16px", width: "100%" }}
      >
        Close
      </Button>
    </div>
  );

  return (
    <div style={{ padding: "24px", position: "relative", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={2}>Attributes Assessment</Title>
        <Popover
          content={notesContent}
          title="Notes"
          trigger="click"
          open={notesVisible}
          placement="leftTop"
          overlayStyle={{ maxWidth: "350px" }}
        >
          <Button
            type="default"
            icon={<FileTextOutlined />}
            onClick={() => setNotesVisible(true)}
          >
            View notes
          </Button>
        </Popover>
      </div>

      {Object.entries(attributes).map(([section, attributeList]) =>
        attributeList.length ? (
          <div key={section} style={{ marginBottom: "24px" }}>
            <Title level={4}>{section}</Title>
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
                dataSource={attributeList}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Popconfirm
                        title="Are you sure you want to delete this response?"
                        onConfirm={() => handleDeleteResponse(item.attribute)}
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
                          {item.description && <div>{item.description}</div>}
                        </>
                      }
                    />
                    <div style={{ marginTop: "8px", width: "50%" }}>
                      {item.type === AttributeType.Slider && (
                        <Slider
                          min={item.criteria.min}
                          max={item.criteria.max}
                          value={responses[item.attribute]}
                          onChange={(value) =>
                            handleResponseChange(item.attribute, value)
                          }
                        />
                      )}
                      {item.type === AttributeType.Option && (
                        <Select
                          placeholder="Select an option"
                          value={responses[item.attribute]}
                          onChange={(value) =>
                            handleResponseChange(item.attribute, value)
                          }
                          style={{ width: "100%" }}
                        >
                          {item.criteria.options.map((option) => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      )}
                      {item.type === AttributeType.Checkbox && (
                        <Checkbox
                          checked={responses[item.attribute]}
                          onChange={(e) =>
                            handleResponseChange(
                              item.attribute,
                              e.target.checked
                            )
                          }
                        >
                          {item.attribute}
                        </Checkbox>
                      )}
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </div>
        ) : null
      )}
      <Divider />
      <div style={{ textAlign: "right", marginTop: "24px" }}>
        <Button type="primary" onClick={handleSubmit}>
          Submit Assessment
        </Button>
      </div>
    </div>
  );
};

export default AttributesAssessment;
