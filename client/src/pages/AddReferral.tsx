import React from "react";
import { Form, Input, Select, Upload, Button, Row, Col, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { Option } = Select;

interface Template {
  persona: {
    description: string;
    examples: string[];
  };
  skills: {
    required: string[];
    preferred: string[];
  };
  experience: {
    minYears: number;
    description: string;
  };
  education: {
    required: string;
    preferred: string;
  };
  teamFit: {
    description: string;
    examples: string[];
  };
  location: {
    type: string;
    preferredRegions: string[];
  };
}

const teamTemplates: Record<string, Template> = {
  "team-1": {
    persona: {
      description:
        "Key characteristics or personality traits that align with the team culture.",
      examples: [
        "Collaborative and team-oriented",
        "Proactive problem-solver",
        "Adaptable to fast-paced environments",
      ],
    },
    skills: {
      required: [
        "Specific hard or technical skills required for the role, e.g., JavaScript, UX Design, Sales Negotiation",
      ],
      preferred: [
        "Additional skills that would be a bonus, e.g., React.js, Financial Modeling",
      ],
    },
    experience: {
      minYears: 3,
      description:
        "Ideal number of years of experience or types of previous roles, e.g., '3+ years in B2B sales', 'experience managing teams'",
    },
    education: {
      required: "Bachelor's degree in Computer Science or equivalent",
      preferred: "Master's degree in a related field",
    },
    teamFit: {
      description: "Qualities that align with the team culture or work style.",
      examples: [
        "Enjoys pair programming",
        "Comfortable with asynchronous communication",
        "Aligns with our mission to promote sustainable energy",
      ],
    },
    location: {
      type: "Remote or Onsite",
      preferredRegions: ["North America", "Europe"],
    },
  },
  "team-2": {
    persona: {
      description:
        "Key characteristics or personality traits that align with the team culture.",
      examples: [
        "Collaborative and team-oriented",
        "Proactive problem-solver",
        "Adaptable to fast-paced environments",
      ],
    },
    skills: {
      required: [
        "Specific hard or technical skills required for the role, e.g., JavaScript, UX Design, Sales Negotiation",
      ],
      preferred: [
        "Additional skills that would be a bonus, e.g., React.js, Financial Modeling",
      ],
    },
    experience: {
      minYears: 3,
      description:
        "Ideal number of years of experience or types of previous roles, e.g., '3+ years in B2B sales', 'experience managing teams'",
    },
    education: {
      required: "Bachelor's degree in Computer Science or equivalent",
      preferred: "Master's degree in a related field",
    },
    teamFit: {
      description: "Qualities that align with the team culture or work style.",
      examples: [
        "Enjoys pair programming",
        "Comfortable with asynchronous communication",
        "Aligns with our mission to promote sustainable energy",
      ],
    },
    location: {
      type: "Remote or Onsite",
      preferredRegions: ["North America", "Europe"],
    },
  },
  "team-3": {
    persona: {
      description:
        "Dynamic and persuasive individuals with a passion for building relationships.",
      examples: [
        "Customer-focused",
        "Self-starter with a competitive drive",
        "Excellent at networking",
      ],
    },
    skills: {
      required: [
        "Expertise in sales techniques",
        "Ability to close deals effectively",
      ],
      preferred: [
        "Experience with CRM tools like Salesforce",
        "Knowledge of industry-specific sales cycles",
      ],
    },
    experience: {
      minYears: 4,
      description: "Proven track record in sales or account management roles.",
    },
    education: {
      required: "Bachelor's degree in Business Administration or related field",
      preferred: "Certification in Sales Management or Leadership",
    },
    teamFit: {
      description:
        "People who can work independently while aligning with team goals.",
      examples: [
        "Thrives in a high-pressure environment",
        "Enjoys brainstorming strategies",
        "Aligns with team revenue targets",
      ],
    },
    location: {
      type: "Onsite",
      preferredRegions: ["North America", "Europe"],
    },
  },
};

const AddReferral: React.FC = () => {
  const { team } = useParams<{ team: string }>();
  const template = team ? teamTemplates[team] : undefined;

  if (!template) {
    return <div>Invalid team</div>;
  }

  const headingStyle = {
    color: "#001f3f", // Navy blue color
    fontWeight: "bold",
    fontSize: "20px",
  };

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={16}>
        <Col span={14}>
          <Form layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the candidate's name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Team" name="team" initialValue={team}>
              <Select disabled>
                <Option value="team-1">Team 1</Option>
                <Option value="team-2">Team 2</Option>
                <Option value="team-3">Team 3</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Resume"
              name="resume"
              rules={[
                {
                  required: true,
                  message: "Please upload the candidate's resume!",
                },
              ]}
            >
              <Upload name="resume" listType="text">
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Relationship"
              name="relationship"
              rules={[
                {
                  required: true,
                  message:
                    "Please select your relationship with the candidate!",
                },
              ]}
            >
              <Select>
                <Option value="coworker">Coworker</Option>
                <Option value="school">School</Option>
                <Option value="manager">Manager</Option>
                <Option value="friend">Friend</Option>
                <Option value="reported">Reported</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Referral
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={10}>
          <Card title="Template">
            <h3 style={headingStyle}>Persona</h3>
            <ul>
              {template.persona.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
            <h3 style={headingStyle}>Skills</h3>
            <p>Required:</p>
            <ul>
              {template.skills.required.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <p>Preferred:</p>
            <ul>
              {template.skills.preferred.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3 style={headingStyle}>Experience</h3>
            <p>{template.experience.description}</p>
            <h3 style={headingStyle}>Team Fit</h3>
            <ul>
              {template.teamFit.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
            <h3 style={headingStyle}>Location</h3>
            <p>Type: {template.location.type}</p>
            <p>
              Preferred Regions: {template.location.preferredRegions.join(", ")}
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddReferral;
