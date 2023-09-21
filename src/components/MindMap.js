import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import DraggableNode from './DraggableNode';
import ConnectionLine from './ConnectionLine';
import { MindMapContainer, ButtonContainer, ActionButton } from '../styles/MindMapStyles';
import { v4 as uuidv4 } from 'uuid';

function MindMap() {
  const [nodes, setNodes] = useState([]);
  const [nodeHistory, setNodeHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const [, drop] = useDrop({
    accept: 'NODE',
    hover: (draggedItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const x = Math.round(draggedItem.initialX + delta.x);
      const y = Math.round(draggedItem.initialY + delta.y);

      setNodes(prevNodes => prevNodes.map(node =>
        node.id === draggedItem.id ? { ...node, x, y } : node
      ));
    },
  });

  const createMainNode = () => {
    return {
      id: uuidv4(),
      text: `Node ${nodes.length + 1}`,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + nodes.length * 100,
      type: 'main'
    };
  };

  const createRecommendationNodes = (baseNode) => {
    return Array(3).fill().map((_, index) => ({
      id: uuidv4(),
      text: 'Recommendation Node',
      x: baseNode.x + 200,
      y: baseNode.y + index * 100,
      parent: baseNode.id,
      type: 'recommendation'
    }));
  };

  const addNewNode = () => {
    const newNode = createMainNode();
    const recommendationNodes = createRecommendationNodes(newNode);
    setNodes(prevNodes => [...prevNodes, newNode, ...recommendationNodes]);
  };

  const deleteNode = (nodeId) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
  };

  const handleNodeClick = (node) => {
    if (node.type === 'recommendation') {
      const recommendationNodes = createRecommendationNodes(node);
      setNodes(prevNodes => [...prevNodes, ...recommendationNodes]);
    }
  };

  const renderConnections = () => {
    return nodes.filter(node => node.parent).map(node => (
      <ConnectionLine key={`connection-${node.id}`} from={nodes.find(n => n.id === node.parent)} to={node} />
    ));
  };

  const undo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(prevIndex => prevIndex - 1);
      setNodes(nodeHistory[currentHistoryIndex - 1]);
    }
  };

  const redo = () => {
    if (currentHistoryIndex < nodeHistory.length - 1) {
      setCurrentHistoryIndex(prevIndex => prevIndex + 1);
      setNodes(nodeHistory[currentHistoryIndex + 1]);
    }
  };

  useEffect(() => {
    setNodeHistory(prevHistory => [...prevHistory, nodes]);
    setCurrentHistoryIndex(prevIndex => prevIndex + 1);
  }, [nodes]);

  return (
    <MindMapContainer ref={drop}>
      {nodes.map((node) => (
        <DraggableNode key={node.id} node={node} onClick={handleNodeClick} onDelete={() => deleteNode(node.id)} />
      ))}
      {renderConnections()}
      <ButtonContainer>
        <ActionButton onClick={addNewNode}>Add Node</ActionButton>
        <ActionButton onClick={undo}>Undo</ActionButton>
        <ActionButton onClick={redo}>Redo</ActionButton>
      </ButtonContainer>
    </MindMapContainer>
  );
}

export default MindMap;
