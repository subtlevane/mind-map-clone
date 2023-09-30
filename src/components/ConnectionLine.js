import React, { useState } from 'react';
import { aStar } from './PathFinding';

// Calculate the closest point on a node to a given point
function calculateClosestPoint(node, point) {
  const nodeX = node.x; // Assuming node has an 'x' property
  const nodeY = node.y; // Assuming node has a 'y' property
  const nodeWidth = node.width; // Assuming node has a 'width' property
  const nodeHeight = node.height; // Assuming node has a 'height' property

  // Calculate the closest point within the bounds of the node
  const closestX = Math.max(nodeX, Math.min(point.x, nodeX + nodeWidth));
  const closestY = Math.max(nodeY, Math.min(point.y, nodeY + nodeHeight));

  return { x: closestX, y: closestY };
}

// Generate smoother control points for Bezier curves
function generateControlPoints(path, factor = 0.25) {
  if (!path || path.length < 2) {
    return [{ x: 0, y: 0 }, { x: 0, y: 0 }];
  }

  const startPoint = path[0];
  const endPoint = path[path.length - 1];

  const controlPoint1 = {
    x: startPoint.x + (endPoint.x - startPoint.x) * factor,
    y: startPoint.y + (endPoint.y - startPoint.y) * factor
  };

  const controlPoint2 = {
    x: startPoint.x + (endPoint.x - startPoint.x) * (1 - factor),
    y: startPoint.y + (endPoint.y - startPoint.y) * (1 - factor)
  };

  return [controlPoint1, controlPoint2];
}

// Calculate Bezier curve path data
function calculateBezier(from, to, grid) {
  if (!from || !to) {
    console.error("Invalid 'from' or 'to' points");
    return;
  }
  const path = aStar(grid, from, to);
  const [controlPoint1, controlPoint2] = generateControlPoints(path);

  return `M ${from.x} ${from.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${to.x} ${to.y}`;
}

export default function ConnectionLine({ fromNode, toNode, grid }) {
  
  // Calculate the closest points on the nodes
  const fromClosestPoint = calculateClosestPoint(fromNode, fromNode);
  const toClosestPoint = calculateClosestPoint(toNode, toNode);

  // Hover effect state
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse over event
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  // Handle mouse out event
  const handleMouseOut = () => {
    setIsHovered(false);
  };

  // Define the line's stroke color and thickness based on hover state
  const strokeColor = isHovered ? 'red' : '#333';
  const strokeWidth = isHovered ? '3' : '2';

  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <path 
        d={calculateBezier(fromClosestPoint, toClosestPoint, grid)}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
