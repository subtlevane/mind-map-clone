import React from 'react';
import { aStar } from './PathFinding';

function generateControlPoints(path) {
  if (!path || path.length < 2) {
    return [{ x: 0, y: 0 }, { x: 0, y: 0 }];
  }

  const startPoint = path[0];
  const endPoint = path[path.length - 1];

  const controlPoint1 = {
    x: startPoint.x + (endPoint.x - startPoint.x) / 3,
    y: startPoint.y + (endPoint.y - startPoint.y) / 3
  };

  const controlPoint2 = {
    x: startPoint.x + 2 * (endPoint.x - startPoint.x) / 3,
    y: startPoint.y + 2 * (endPoint.y - startPoint.y) / 3
  };

  return [controlPoint1, controlPoint2];
}

function calculateBezier(from, to, grid) {
  const path = aStar(grid, from, to);
  const [controlPoint1, controlPoint2] = generateControlPoints(path);

  return `M ${from.x} ${from.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${to.x} ${to.y}`;
}

export default function ConnectionLine({ from, to, grid }) {
  const pathData = calculateBezier(from, to, grid);

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
