import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Tooltip, Select } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
  UpCircleFilled,
  MinusCircleFilled,
  DownCircleFilled,
  EditFilled,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

interface QuestionModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const customizeRequiredMark = (
    label: React.ReactNode,
    { required }: { required: boolean }
  ) => (
    <>
      {label}
      {!required && (
        <span style={{ marginLeft: 8, fontWeight: 400, color: "#8c8c8c" }}>
          (optional)
        </span>
      )}
    </>
  );

  useEffect(() => {
    const handleFormChange = () => {
      const values = form.getFieldsValue();
      const allLevelsHaveCriteria = ["Junior", "Senior", "Staff"].every(
        (level) =>
          values.levels &&
          values.levels[level] &&
          values.levels[level].length > 0
      );
      setIsFormValid(allLevelsHaveCriteria);
    };

    form.setFieldsValue({
      question: "",
      priority: undefined,
      time: undefined,
      levels: {
        Junior: [],
        Senior: [],
        Staff: [],
      },
    });

    form
      .validateFields()
      .then(handleFormChange)
      .catch(() => handleFormChange());
  }, [form]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    const allLevelsHaveCriteria = ["Junior", "Senior", "Staff"].every(
      (level) =>
        values.levels && values.levels[level] && values.levels[level].length > 0
    );
    setIsFormValid(allLevelsHaveCriteria);
  };

  const priorityOptions = [
    {
      label: "Critical",
      value: "Critical",
      icon: <ExclamationCircleFilled style={{ color: "purple" }} />,
    },
    {
      label: "High",
      value: "High",
      icon: <UpCircleFilled style={{ color: "red" }} />,
    },
    {
      label: "Medium",
      value: "Medium",
      icon: <MinusCircleFilled style={{ color: "orange" }} />,
    },
    {
      label: "Low",
      value: "Low",
      icon: <DownCircleFilled style={{ color: "blue" }} />,
    },
    {
      label: "Cosmetic",
      value: "Cosmetic",
      icon: <EditFilled style={{ color: "gray" }} />,
    },
  ];

  return (
    <Modal
      title="Add Question"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        onValuesChange={handleValuesChange}
        requiredMark={customizeRequiredMark}
      >
        <Form.Item
          name="question"
          label="Question"
          required
          tooltip="This is a required field."
          rules={[{ required: true, message: "Please enter the question." }]}
        >
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          tooltip="Select the priority level for this question."
        >
          <Select placeholder="Select Priority">
            {priorityOptions.map(({ label, value, icon }) => (
              <Option key={value} value={value}>
                {icon} {label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="time"
          label="Time (minutes)"
          tooltip="Specify the expected duration for this question."
        >
          <Input type="number" min={0} max={60} />
        </Form.Item>

        {["Junior", "Senior", "Staff"].map((level) => (
          <Form.Item key={level} label={`${level} Criteria`} required>
            <Form.List name={["levels", level]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name]}
                        fieldKey={[fieldKey ?? key]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter a criterion.",
                          },
                        ]}
                        style={{ flex: 1, marginBottom: 0 }}
                      >
                        <Input placeholder={`Enter ${level} criterion`} />
                      </Form.Item>
                      <MinusCircleOutlined
                        style={{
                          fontSize: "16px",
                          color: "red",
                          cursor: "pointer",
                          marginLeft: "8px",
                        }}
                        onClick={() => remove(name)}
                      />
                    </div>
                  ))}
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Criterion
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
        ))}

        <Form.Item>
          <Tooltip
            title={
              isFormValid ? "" : "Please ensure all required fields are filled."
            }
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isFormValid}
              style={{ marginTop: 16 }}
              block
            >
              Submit
            </Button>
          </Tooltip>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuestionModal;
