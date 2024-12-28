import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  useReactFlow,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "react-flow-renderer";
import { Modal, Form, Input, Checkbox, Button, Table } from "antd";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input", // input node
    data: { label: "Welcome" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    data: { label: "Introduction" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Training" },
    position: { x: 400, y: 100 },
  },
  {
    id: "4",
    type: "output", // output node
    data: { label: "Completion" },
    position: { x: 250, y: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
];

interface Task {
  key: string;
  description: string;
  done: boolean;
}

const Onboarding = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form] = Form.useForm();
  const reactFlowInstance = useReactFlow();

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent | React.TouchEvent, node: Node) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id ? { ...n, position: node.position } : n
        )
      );
    },
    []
  );

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setCurrentNode(node);
    form.setFieldsValue({ label: node.data.label });
    setTasks(node.data.tasks || []);
    setIsModalVisible(true);
  };

  const addNode = () => {
    setCurrentNode(null);
    form.resetFields();
    setTasks([]);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newTasks = tasks.map((task) => ({
        ...task,
        done: values.tasks?.includes(task.key) || false,
      }));

      if (currentNode) {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === currentNode.id
              ? {
                  ...n,
                  data: { ...n.data, label: values.label, tasks: newTasks },
                }
              : n
          )
        );
      } else {
        const newNode: Node = {
          id: (nodes.length + 1).toString(),
          data: { label: values.label, tasks: newTasks },
          position: { x: Math.random() * 400, y: Math.random() * 400 },
        };
        setNodes((nds) => nds.concat(newNode));
      }
      setIsModalVisible(false);
    });
  };

  const handleAddTask = () => {
    const newTask: Task = {
      key: (tasks.length + 1).toString(),
      description: "",
      done: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleTaskChange = (key: string, value: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === key ? { ...task, description: value } : task
      )
    );
  };

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === key ? { ...task, done: checked } : task
      )
    );
  };

  const columns = [
    {
      title: "Done",
      dataIndex: "done",
      render: (done: boolean, record: Task) => (
        <Checkbox
          checked={done}
          onChange={(e) => handleCheckboxChange(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text: string, record: Task) => (
        <Input
          value={text}
          onChange={(e) => handleTaskChange(record.key, e.target.value)}
        />
      ),
    },
  ];

  return (
    <div style={{ height: 500, position: "relative" }}>
      <button
        onClick={addNode}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10,
          padding: "8px 12px",
          backgroundColor: "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Node
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        style={{ width: "100%", height: "100%" }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <Modal
        title={currentNode ? "Edit Node" : "Add Node"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="label"
            label="Node Label"
            rules={[
              { required: true, message: "Please input the node label!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="tasks" label="Tasks">
            <Button
              onClick={handleAddTask}
              type="dashed"
              style={{ marginBottom: 16 }}
            >
              Add Task
            </Button>
            <Table
              dataSource={tasks}
              columns={columns}
              pagination={false}
              rowKey="key"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Onboarding;
