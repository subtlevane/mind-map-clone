import React, { useRef, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const NodeContainer = styled.div`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  transition: left 0.2s ease, top 0.2s ease; /* Added transition for smooth movement */
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

const EditableDiv = styled(NodeDiv)`
  cursor: text;

  &:active {
    transform: none;
  }
`;

function DraggableNode({ node }) {
  const ref = useRef(null);
  const previewRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nodeText, setNodeText] = useState(node.text);

  const [, drag, preview] = useDrag({
    type: 'NODE',
    item: { id: node.id, initialX: node.x, initialY: node.y },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  drag(ref);
  useEffect(() => {
    preview(previewRef.current);
  }, [preview]);

  return (
    <NodeContainer ref={ref} x={node.x} y={node.y}>
      {isEditing ? (
        <EditableDiv
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={() => {
            setIsEditing(false);
            setNodeText(ref.current.textContent);
          }}
          ref={ref}
        >
          {nodeText}
        </EditableDiv>
      ) : (
        <NodeDiv onDoubleClick={() => setIsEditing(true)}>{nodeText}</NodeDiv>
      )}
      <div ref={previewRef} style={{ display: 'none' }} />
    </NodeContainer>
  );
}

export default DraggableNode;