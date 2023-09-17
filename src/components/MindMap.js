import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableNode from './DraggableNode';
import { MindMapContainer, ButtonContainer, ActionButton } from '../styles/MindMapStyles';
import { v4 as uuidv4 } from 'uuid';

function MindMap() {
  const [nodes, setNodes] = useState([]);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const [, drop] = useDrop({
    accept: 'NODE',
    hover: (draggedItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const x = Math.round(draggedItem.initialX + delta.x);
      const y = Math.round(draggedItem.initialY + delta.y);

      const updatedNodes = nodes.map(node =>
        node.id === draggedItem.id ? { ...node, x, y } : node
      );

      setNodes(updatedNodes);
    },
  });

  const addNewNode = () => {
    const newNode = {
      id: uuidv4(),
      text: `Node ${nodes.length + 1}`,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + nodes.length * 100, // Adjusted positioning
    };
    const recommendationNodes = Array(3).fill().map((_, index) => ({
      id: uuidv4(),
      text: 'Recommendation Node',
      x: newNode.x + 200,
      y: newNode.y + index * 100,
    }));
    setHistory((prevHistory) => [...prevHistory, nodes]);
    setNodes((prevNodes) => [...prevNodes, newNode, ...recommendationNodes]);
  };

  const undo = () => {
    if (history.length !== 0) {
      setFuture((prevFuture) => [nodes, ...prevFuture]);
      setNodes(history[history.length - 1]);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  };

  const redo = () => {
    if (future.length !== 0) {
      setHistory((prevHistory) => [...prevHistory, nodes]);
      setNodes(future[0]);
      setFuture((prevFuture) => prevFuture.slice(1));
    }
  };

  return (
    <MindMapContainer ref={drop}>
      {nodes.map((node) => (
        <DraggableNode key={node.id} node={node} />
      ))}
      <ButtonContainer>
        <ActionButton onClick={addNewNode}>Add Node</ActionButton>
        <ActionButton onClick={undo}>Undo</ActionButton>
        <ActionButton onClick={redo}>Redo</ActionButton>
      </ButtonContainer>
    </MindMapContainer>
  );
}

export default MindMap;
