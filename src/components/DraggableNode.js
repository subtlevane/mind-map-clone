import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const NodeContainer = styled.div`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  transition: left 0.2s ease, top 0.2s ease;
`;

const NodeDiv = styled.div`
  box-sizing: border-box;
  cursor: grab;
  padding: 10px 15px;
  background-color: #ffffff;
  border: 2px solid #007BFF;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  transition: all 0.2s ease;
  min-width: 50px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 15px rgba(0, 123, 255, 0.2);
  }

  &:active {
    cursor: grabbing;
    transform: scale(1.1);
  }
`;

const EditableDiv = styled.div`
  box-sizing: border-box;
  cursor: text;
  padding: 10px 15px;
  background-color: #ffffff;
  border: 2px solid #007BFF;
  border-radius: 5px;
  user-select: none;
  min-width: 50px;
  outline: none;
  white-space: pre-wrap; // Preserve whitespace and newlines
`;

function DraggableNode({ node, onClick }) {
  const dragRef = useRef(null);
  const editRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nodeContent, setNodeContent] = useState(node.text);

  const [, drag, preview] = useDrag({
    type: 'NODE',
    item: { id: node.id, initialX: node.x, initialY: node.y },
  });

  drag(dragRef);
  preview(null);  // This line removes the drag preview
  
  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (editRef.current) {
        window.getSelection().selectAllChildren(editRef.current);
      }
    }, 0);
  };

  return (
    <NodeContainer ref={dragRef} x={node.x} y={node.y} onClick={() => onClick(node)}>
      {isEditing ? (
        <EditableDiv
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={() => {
            setIsEditing(false);
            setNodeContent(editRef.current.innerHTML); // Save content as HTML
          }}
          ref={editRef}
          dangerouslySetInnerHTML={{ __html: nodeContent }} // Render content as HTML
        />
      ) : (
        <NodeDiv onDoubleClick={handleDoubleClick} dangerouslySetInnerHTML={{ __html: nodeContent }} />
      )}
    </NodeContainer>
  );
}

export default DraggableNode;
