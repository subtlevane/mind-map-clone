import React, { createContext, useState, useContext, useCallback } from 'react';

const NodeContext = createContext();

export const NodeProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);

  const updateNodePosition = useCallback((id, position) => {
    setNodes(prevNodes => {
      const updatedNodes = prevNodes.map(node => 
        node.id === id ? { ...node, ...position } : node
      );
      return updatedNodes;
    });
    // Add code here to update grid
    // Example: grid[position.x][position.y] = 'blocked';
  }, []);

  return (
    <NodeContext.Provider value={{ nodes, updateNodePosition }}>
      {children}
    </NodeContext.Provider>
  );
};

export const useNodes = () => {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error('useNodes must be used within a NodeProvider');
  }
  return context;
};
