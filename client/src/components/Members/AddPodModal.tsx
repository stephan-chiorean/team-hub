import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Table } from "antd";

const { Option } = Select;

const AddPodModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [hiringManager, setHiringManager] = useState("");
  const [podMembers, setPodMembers] = useState([]);
  const [memberInput, setMemberInput] = useState("");

  const handleAddMember = () => {
    if (
      memberInput &&
      !podMembers.some((member) => member.email === memberInput)
    ) {
      setPodMembers([
        ...podMembers,
        { key: podMembers.length, email: memberInput },
      ]);
      setMemberInput("");
    }
  };

  const handleDeleteMember = (key) => {
    setPodMembers(podMembers.filter((member) => member.key !== key));
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Button
          type="default"
          danger
          onClick={() => handleDeleteMember(record.key)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Modal
      visible={visible}
      title="Add Pod"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({ ...values, podMembers });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="hiringManager"
          label="Hiring Manager"
          rules={[
            {
              required: true,
              message: "Please input the hiring manager email!",
            },
          ]}
        >
          <Select
            showSearch
            value={hiringManager}
            placeholder="Input and select hiring manager email"
            onChange={(value) => setHiringManager(value)}
            onSearch={(value) => setHiringManager(value)}
            filterOption={false}
          >
            {hiringManager && (
              <Option key={hiringManager} value={hiringManager}>
                {hiringManager}
              </Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item label="Pod Members">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              value={memberInput}
              placeholder="Input member email and add"
              onChange={(e) => setMemberInput(e.target.value)}
              onPressEnter={handleAddMember}
            />
            <Button style={{ marginLeft: 16 }} onClick={handleAddMember}>
              Add
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={podMembers}
            pagination={false}
            style={{ marginTop: "16px" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPodModal;
