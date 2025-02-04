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
  Tooltip,
} from "antd";
import {
  EllipsisOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const ItemType = "CARD";

const DraggableCard = ({
  template,
  index,
  moveCard,
  handleView,
  menu,
}: {
  template: any;
  index: any;
  moveCard: any;
  handleView: any;
  menu: any;
}) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Col span={8} ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
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
  );
};

const Documentation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<any | null>(null);
  const [viewingTemplate, setViewingTemplate] = useState<any | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string>("Authorizers");

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

  const moveCard = (fromIndex: number, toIndex: number) => {
    const card = templates[fromIndex];
    setTemplates(
      update(templates, {
        $splice: [
          [fromIndex, 1],
          [toIndex, 0, card],
        ],
      })
    );
  };

  const menu = (template: any) => (
    <Menu>
      <Menu.Item onClick={() => handleEdit(template)}>Edit</Menu.Item>
      <Menu.Item onClick={() => handleDelete(template)}>Delete</Menu.Item>
    </Menu>
  );

  const teamMenu = (
    <Menu
      onClick={(e) => {
        setSelectedTeam(e.key);
      }}
    >
      <Menu.Item key="Authorizers">Authorizers</Menu.Item>
      <Menu.Item key="Dynamics">Dynamics</Menu.Item>
      <Menu.SubMenu key="Commanders" title="Commanders">
        <Menu.Item key="Commanders - Stream">Stream</Menu.Item>
        <Menu.Item key="Commanders - Core">Core</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="zoom-container">
        <div style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div>
              Team:{" "}
              <Dropdown overlay={teamMenu}>
                <Button>
                  {selectedTeam} <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <Button type="primary" onClick={showModal}>
              Create New Template
            </Button>
          </div>
          <Row gutter={16}>
            {templates.map((template, index) => (
              <DraggableCard
                key={index}
                index={index}
                template={template}
                moveCard={moveCard}
                handleView={handleView}
                menu={menu}
              />
            ))}
          </Row>
          <Modal
            title={editingTemplate ? "Edit Template" : "Create New Template"}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              initialValues={{
                name: editingTemplate?.name || "",
                description: editingTemplate?.description || "",
              }}
              onFinish={handleOk}
            >
              <Form.Item
                name="name"
                label="Template Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the template name!",
                  },
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
      </div>
    </DndProvider>
  );
};

export default Documentation;
