import React, { useState } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Steps,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Link } = Typography;
const { Step } = Steps;

interface Interview {
  key: string;
  candidate: string;
  position: string;
  date: string;
  status: string;
}

interface InterviewTemplate {
  title: string;
  id: string;
}

interface Stage {
  key: string;
  name: string;
}

interface Level {
  key: string;
  name: string;
}

const myInterviewsData: Interview[] = [
  {
    key: "1",
    candidate: "John Doe",
    position: "Cloud Backend",
    date: "2023-10-01",
    status: "Pending",
  },
  {
    key: "2",
    candidate: "Jane Smith",
    position: "Cloud SRE",
    date: "2023-10-05",
    status: "Upcoming",
  },
];

const interviewTemplates: InterviewTemplate[] = [
  { title: "Cloud Backend", id: "cloud-backend" },
  { title: "Cloud SRE", id: "cloud-sre" },
  { title: "Lake", id: "lake" },
  { title: "Lake Pair Programming", id: "lake-pair-programming" },
  {
    title: "Cloud Backend Pair Programming",
    id: "cloud-backend-pair-programming",
  },
];

const getStatusTag = (status: string) => {
  let color = "";
  switch (status) {
    case "Pending":
      color = "gray";
      break;
    case "Upcoming":
      color = "lightgreen";
      break;
    default:
      color = "default";
  }
  return <Tag color={color}>{status}</Tag>;
};

const interviewColumns = [
  {
    title: "Candidate",
    dataIndex: "candidate",
    key: "candidate",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => getStatusTag(status),
  },
];

const Interviews: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [stages, setstages] = useState<Stage[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentStep(0);
    form.resetFields();
    setstages([]);
    setLevels([]);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = (values: any) => {
    console.log("Form values:", values);
    // Add logic to save the new template
    setIsModalVisible(false);
    setCurrentStep(0);
    form.resetFields();
    setstages([]);
    setLevels([]);
  };

  const addstage = () => {
    const newstage: Stage = {
      key: (stages.length + 1).toString(),
      name: "",
    };
    setstages([...stages, newstage]);
  };

  const updatestageName = (key: string, name: string) => {
    setstages((prevstages) =>
      prevstages.map((stage) =>
        stage.key === key ? { ...stage, name } : stage
      )
    );
  };

  const deletestage = (key: string) => {
    setstages((prevstages) => prevstages.filter((stage) => stage.key !== key));
  };

  const addLevel = () => {
    const newLevel: Level = {
      key: (levels.length + 1).toString(),
      name: "",
    };
    setLevels([...levels, newLevel]);
  };

  const updateLevelName = (key: string, name: string) => {
    setLevels((prevLevels) =>
      prevLevels.map((level) =>
        level.key === key ? { ...level, name } : level
      )
    );
  };

  const deleteLevel = (key: string) => {
    setLevels((prevLevels) => prevLevels.filter((level) => level.key !== key));
  };

  const stagesColumns = [
    {
      title: "Stage Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Stage) => (
        <Input
          value={text}
          onChange={(e) => updatestageName(record.key, e.target.value)}
          placeholder="Enter stage name"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Stage) => (
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={() => deletestage(record.key)}
        />
      ),
    },
  ];

  const levelsColumns = [
    {
      title: "Level Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Level) => (
        <Input
          value={text}
          onChange={(e) => updateLevelName(record.key, e.target.value)}
          placeholder="Enter level name"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Level) => (
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={() => deleteLevel(record.key)}
        />
      ),
    },
  ];

  const handleCardClick = (id: string) => {
    navigate(`/interviews/${id}`);
  };

  const steps = [
    {
      title: "Position Title",
      content: (
        <Form.Item
          name="title"
          label="Position Title"
          rules={[
            { required: true, message: "Please input the position title!" },
          ]}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      title: "Stages",
      content: (
        <>
          <Button type="dashed" onClick={addstage} style={{ marginBottom: 16 }}>
            Add stage
          </Button>
          <Table
            dataSource={stages}
            columns={stagesColumns}
            pagination={false}
            rowKey="key"
          />
        </>
      ),
    },
    {
      title: "Levels",
      content: (
        <>
          <Button type="dashed" onClick={addLevel} style={{ marginBottom: 16 }}>
            Add Level
          </Button>
          <Table
            dataSource={levels}
            columns={levelsColumns}
            pagination={false}
            rowKey="key"
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>My Interviews</h2>
        <Link href="#" style={{ fontSize: "16px" }}>
          See More
        </Link>
      </div>
      <Table
        dataSource={myInterviewsData}
        columns={interviewColumns}
        pagination={false}
      />
      <div style={{ marginTop: "24px" }}>
        <h2>Interview Templates</h2>
        <Button
          type="primary"
          onClick={showModal}
          style={{ marginBottom: "16px" }}
        >
          Add Template
        </Button>
        <Row gutter={[16, 16]}>
          {interviewTemplates.map((template) => (
            <Col span={8} key={template.id}>
              <Card
                onClick={() => handleCardClick(template.id)}
                style={{ textAlign: "center", cursor: "pointer" }}
              >
                {template.title}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal
        title="Add New Template"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          style={{ marginTop: "24px" }}
        >
          {steps[currentStep].content}
          <div style={{ marginTop: "24px", textAlign: "right" }}>
            {currentStep > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={handlePrev}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                Finish
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Interviews;
