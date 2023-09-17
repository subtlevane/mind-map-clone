import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableNode from './DraggableNode';
import ConnectionLine from './ConnectionLine';
import { MindMapContainer, ButtonContainer, ActionButton } from '../styles/MindMapStyles';
import { v4 as uuidv4 } from 'uuid';

function MindMap() {
  const [nodes, setNodes] = useState([]);

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

  const createMainNode = () => ({
    id: uuidv4(),
    text: `Node ${nodes.length + 1}`,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2 + nodes.length * 100,
    type: 'main'
  });

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

  return (
    <MindMapContainer ref={drop}>
      {nodes.map((node) => (
        <DraggableNode key={node.id} node={node} onClick={handleNodeClick} />
      ))}
      {renderConnections()}
      <ButtonContainer>
        <ActionButton onClick={addNewNode}>Add Node</ActionButton>
      </ButtonContainer>
    </MindMapContainer>
  );
}

export default MindMap;
