import React, { useState, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

// Define edges for the flowchart
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
];

const correctAnswer = 'modi'; // Define the correct answer

const FlowChart = () => {
  // State to manage node data
  const [nodeData, setNodeData] = useState({
    '1': { question: '' },
    '2': '',
    '3': '',
  });

  // Handler for text input changes
  const handleTextChange = useCallback((value) => {
    setNodeData((prevData) => ({
      ...prevData,
      '1': {
        question: value,
      },
    }));
  }, []);

  // Handler for sending the input data
  const handleSend = useCallback(() => {
    const isCorrect = nodeData['1'].question.trim().toLowerCase() === correctAnswer.toLowerCase();
    setNodeData((prevData) => ({
      ...prevData,
      '2': isCorrect ? 'Correct!' : '',
      '3': isCorrect ? '' : 'Wrong!',
    }));
  }, [nodeData]);

  // Nodes for the flowchart
  const nodes = [
    {
      id: '1',
      type: 'input',
      data: {
        label: <NodeInputForm question={nodeData['1'].question} onInputChange={handleTextChange} onSend={handleSend} />,
      },
      position: { x: 100, y: 100 },
      style: { background: '#fff59d', padding: 10, borderRadius: 10 },
    },
    {
      id: '2',
      type: 'default',
      data: {
        label: <NodeDisplay title="Correct Answer" content={nodeData['2']} />,
      },
      position: { x: 400, y: 100 },
      style: { background: '#a5d6a7', padding: 10, borderRadius: 10 },
    },
    {
      id: '3',
      type: 'default',
      data: {
        label: <NodeDisplay title="Wrong Answer" content={nodeData['3']} />,
      },
      position: { x: 400, y: 250 },
      style: { background: '#ce93d8', padding: 10, borderRadius: 10 },
    },
  ];

  return (
    <div style={{ height: 500 }}>
      <ReactFlow nodes={nodes} edges={initialEdges}>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

// Component for handling input form
const NodeInputForm = ({ question, onInputChange, onSend }) => {
  return (
    <div>
      <div>Who is the Prime Minister of India?</div>
      <br />
      <input
        type="text"
        placeholder="Type your answer"
        value={question || ''}
        onChange={(e) => onInputChange(e.target.value)}
        style={{ padding: '5px', marginBottom: '10px', width: '90%' }}
      />
      <br />
      <button onClick={onSend} style={{ padding: '5px 10px' }}>Submit</button>
    </div>
  );
};

// Component for displaying node data
const NodeDisplay = ({ title, content }) => (
  <div>
    <div>{title}</div>
    <div>{content || 'No data'}</div>
  </div>
);

export default FlowChart;
