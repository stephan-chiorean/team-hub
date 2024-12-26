import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Card,
  Row,
  Col,
} from "antd";
import { title } from "framer-motion/client";

const { Option } = Select;

interface Candidate {
  key: number;
  name: string;
  linkedinUrl: string;
  team: string;
  description: string;
  status: "Pending" | "Reviewing" | "Rejected" | "Approved";
}

const templates = [
  {
    title: "Product",
    description:
      "As a Product professional, you’ll play a pivotal role in shaping our vision and turning it into reality. We’re looking for candidates with strong problem-solving skills, customer empathy, and the ability to collaborate cross-functionally to deliver innovative solutions. Experience in user research, roadmap prioritization, and an agile environment is a plus.",
  },
  {
    title: "Engineering",
    description:
      "Our Engineering team builds the foundation of everything we do. We seek candidates who are passionate about clean code, scalable solutions, and cutting-edge technologies. Strong problem-solving skills, a collaborative mindset, and proficiency in languages like JavaScript, Python, or Java are essential. Bonus points for experience with cloud technologies, CI/CD pipelines, or microservices architecture.",
  },
  {
    title: "Marketing",
    description:
      "Marketing is the voice of our brand, connecting us with our audience and driving engagement. We’re looking for creative and analytical individuals with expertise in crafting compelling campaigns, managing digital channels, and analyzing market trends. Strong communication skills, proficiency in tools like Google Analytics or HubSpot, and a knack for storytelling are key. Experience with content creation, SEO, or social media strategies is a big plus.",
  },
  {
    title: "Sales",
    description:
      "Sales drives our growth and builds relationships with customers that last. We’re searching for persuasive communicators with a hunter mentality, exceptional negotiation skills, and a passion for meeting goals. Ideal candidates thrive under pressure, have experience managing pipelines, and are eager to understand our customers' unique needs.",
  },
  {
    title: "Finance",
    description:
      "Finance ensures our financial health and strategic decision-making. Ideal candidates have a knack for numbers, strong analytical skills, and a deep understanding of budgeting, forecasting, and financial reporting. Experience with tools like Excel, QuickBooks, or enterprise financial software is advantageous, as is attention to detail and strategic thinking.",
  },
  {
    title: "Support",
    description:
      "Support is the heart of our customer experience. We’re looking for empathetic problem-solvers who excel at resolving customer issues promptly and effectively. Strong communication skills, patience, and the ability to translate technical jargon into simple terms are key. Familiarity with ticketing systems and a customer-first mindset are a must.",
  },
  {
    title: "HR",
    description:
      "HR is the backbone of our team, fostering a culture where everyone can thrive. We seek candidates who excel in talent acquisition, employee relations, and organizational development. Exceptional interpersonal skills, knowledge of labor laws, and experience in performance management or training are key. A passion for creating an inclusive and positive workplace is non-negotiable.",
  },
];

const Sourcing: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null
  );
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCandidate(null);
  };

  const handleOk = (values: Omit<Candidate, "key" | "status">) => {
    if (editingCandidate) {
      setCandidates(
        candidates.map((candidate) =>
          candidate.key === editingCandidate.key
            ? { ...candidate, ...values }
            : candidate
        )
      );
    } else {
      setCandidates([
        ...candidates,
        { ...values, key: Date.now(), status: "Pending" },
      ]);
    }
    setIsModalVisible(false);
    setEditingCandidate(null);
  };

  const handleEdit = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    form.setFieldsValue(candidate);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "LinkedIn URL",
      dataIndex: "linkedinUrl",
      key: "linkedinUrl",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Candidate["status"]) => {
        let color;
        switch (status) {
          case "Pending":
            color = "gray";
            break;
          case "Reviewing":
            color = "yellow";
            break;
          case "Rejected":
            color = "red";
            break;
          case "Approved":
            color = "green";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "24px" }}>My Sourcing</div>
        <Button type="primary" onClick={showModal}>
          Add Candidate
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={candidates}
        onRow={(record) => ({
          onClick: () => handleEdit(record),
        })}
      />
      <Modal
        title={editingCandidate ? "Edit Candidate" : "Add Candidate"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={
            editingCandidate || {
              name: "",
              linkedinUrl: "",
              team: "",
              description: "",
            }
          }
          onFinish={handleOk}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the candidate name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="linkedinUrl"
            label="LinkedIn URL"
            rules={[
              { required: true, message: "Please input the LinkedIn URL!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="team"
            label="Team"
            rules={[{ required: true, message: "Please select the team!" }]}
          >
            <Select>
              <Option value="Product">Product</Option>
              <Option value="Engineering">Engineering</Option>
              <Option value="Sales">Sales</Option>
              <Option value="Support">Support</Option>
              <Option value="Finance">Finance</Option>
              <Option value="HR">HR</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
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
      <div style={{ marginTop: 32 }}>
        <div style={{ fontSize: "20px", fontWeight: 500, marginBottom: 16 }}>
          Templates
        </div>
        <Row gutter={[16, 16]}>
          {templates.map((template, index) => (
            <Col span={8} key={index}>
              <Card title={template.title} bordered={true}>
                {template.description}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Sourcing;
