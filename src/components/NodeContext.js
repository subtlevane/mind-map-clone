import React, { createContext, useState, useContext, useCallback } from 'react';

// Create a context for node data
const NodeContext = createContext();

/**
 * Provider component to manage and provide node data to child components.
 */
export const NodeProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);

  // Update the position of a specific node based on its ID
  const updateNodePosition = useCallback((id, position) => {
    setNodes(prevNodes => {
      const updatedNodes = prevNodes.map(node => 
        node.id === id ? { ...node, ...position } : node
      );
      return updatedNodes;
    });
  }, []);

  return (
    <NodeContext.Provider value={{ nodes, updateNodePosition }}>
      {children}
    </NodeContext.Provider>
  );
};

/**
 * Custom hook to access node data and updater function.
 */
export const useNodes = () => {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error('useNodes must be used within a NodeProvider');
  }
  return context;
};
