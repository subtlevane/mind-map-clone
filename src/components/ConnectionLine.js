import React from 'react';

// Sample representation of all nodes in the mind map.
// This should ideally come from a parent component or context.
const allNodes = [
  { id: 'node1', x: 100, y: 100 },
  { id: 'node2', x: 300, y: 300 },
  // ... other nodes
];

function checkForObstaclesBetween(from, to, nodes) {
  // Define a threshold to determine if a node is considered an "obstacle".
  // This can be adjusted based on your requirements.
  const threshold = 20;

  for (let node of nodes) {
    // Skip the 'from' and 'to' nodes.
    if (node === from || node === to) continue;

    // Check if the node's x-coordinate is between the 'from' and 'to' x-coordinates.
    if (node.x > Math.min(from.x, to.x) + threshold && node.x < Math.max(from.x, to.x) - threshold) {
      // Check if the node's y-coordinate is between the 'from' and 'to' y-coordinates.
      if (node.y > Math.min(from.y, to.y) + threshold && node.y < Math.max(from.y, to.y) - threshold) {
        return true; // There's an obstacle between 'from' and 'to'.
      }
    }
  }

  return false; // No obstacles found.
}

export default function ConnectionLine({ from, to }) {
  const nodeWidth = 100;
  const nodeHeight = 50;

  let pathData;

  function refineControlPoints(from, to, obstacle) {
    const midpoint = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2,
    };

    let controlPoint1, controlPoint2;

    if (obstacle) {
      controlPoint1 = {
        x: from.x + nodeWidth,
        y: midpoint.y,
      };
      controlPoint2 = {
        x: to.x,
        y: midpoint.y,
      };
    } else {
      controlPoint1 = {
        x: from.x + nodeWidth + (to.x - from.x) / 3,
        y: from.y + nodeHeight / 2,
      };
      controlPoint2 = {
        x: to.x - (to.x - from.x) / 3,
        y: to.y + nodeHeight / 2,
      };
    }

    return [controlPoint1, controlPoint2];
  }

  function calculateBezier(from, to, obstacle) {
    const [controlPoint1, controlPoint2] = refineControlPoints(from, to, obstacle);

    return `M ${from.x + nodeWidth} ${from.y + nodeHeight / 2} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${to.x} ${to.y + nodeHeight / 2}`;
  }

  // Check for obstacles between from and to
  const obstacle = checkForObstaclesBetween(from, to, allNodes);

  pathData = calculateBezier(from, to, obstacle);

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <path 
        d={pathData}
        fill="none"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}