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
  const [stages, setStages] = useState<Stage[]>([]);
  const [levels, setLevels] = useState<Record<string, Level[]>>({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentStep(0);
    form.resetFields();
    setStages([]);
    setLevels({});
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
    setStages([]);
    setLevels({});
  };

  const addStage = () => {
    const newStage: Stage = {
      key: (stages.length + 1).toString(),
      name: "",
    };
    setStages([...stages, newStage]);
    setLevels((prevLevels) => ({ ...prevLevels, [newStage.key]: [] }));
  };

  const updateStageName = (key: string, name: string) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.key === key ? { ...stage, name } : stage
      )
    );
  };

  const deleteStage = (key: string) => {
    setStages((prevStages) => prevStages.filter((stage) => stage.key !== key));
    setLevels((prevLevels) => {
      const newLevels = { ...prevLevels };
      delete newLevels[key];
      return newLevels;
    });
  };

  const addLevel = (stageKey: string) => {
    const newLevel: Level = {
      key: (levels[stageKey]?.length + 1).toString(),
      name: "",
    };
    setLevels((prevLevels) => ({
      ...prevLevels,
      [stageKey]: [...(prevLevels[stageKey] || []), newLevel],
    }));
  };

  const updateLevelName = (
    stageKey: string,
    levelKey: string,
    name: string
  ) => {
    setLevels((prevLevels) => ({
      ...prevLevels,
      [stageKey]: prevLevels[stageKey].map((level) =>
        level.key === levelKey ? { ...level, name } : level
      ),
    }));
  };

  const deleteLevel = (stageKey: string, levelKey: string) => {
    setLevels((prevLevels) => ({
      ...prevLevels,
      [stageKey]: prevLevels[stageKey].filter(
        (level) => level.key !== levelKey
      ),
    }));
  };

  const stagesColumns = [
    {
      title: "Stage Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Stage) => (
        <Input
          value={text}
          onChange={(e) => updateStageName(record.key, e.target.value)}
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
          onClick={() => deleteStage(record.key)}
        />
      ),
    },
  ];

  const levelsColumns = (stageKey: string) => [
    {
      title: "Level Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Level) => (
        <Input
          value={text}
          onChange={(e) =>
            updateLevelName(stageKey, record.key, e.target.value)
          }
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
          onClick={() => deleteLevel(stageKey, record.key)}
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
          <Button type="dashed" onClick={addStage} style={{ marginBottom: 16 }}>
            Add Stage
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
          {stages.map((stage) => (
            <div key={stage.key} style={{ marginBottom: 24 }}>
              <h3>{stage.name}</h3>
              <Button
                type="dashed"
                onClick={() => addLevel(stage.key)}
                style={{ marginBottom: 16 }}
              >
                Add Level
              </Button>
              <Table
                dataSource={levels[stage.key]}
                columns={levelsColumns(stage.key)}
                pagination={false}
                rowKey="key"
              />
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "20px", fontWeight: 500 }}>
          Interview Templates
        </div>
        <Button
          type="primary"
          onClick={showModal}
          style={{ marginBottom: "16px" }}
        >
          Add Template
        </Button>
      </div>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "50px",
          marginBottom: "16px",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: 500 }}>My Interviews</div>
        <Link href="#" style={{ fontSize: "16px" }}>
          See More
        </Link>
      </div>
      <Table
        dataSource={myInterviewsData}
        columns={interviewColumns}
        pagination={false}
      />
    </div>
  );
};

export default Interviews;
