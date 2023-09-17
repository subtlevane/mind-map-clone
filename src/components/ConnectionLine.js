export default function ConnectionLine({ from, to }) {
  const nodeWidth = 100;
  const nodeHeight = 50;

  const startX = from.x + nodeWidth;
  const startY = from.y + nodeHeight / 2;
  const endX = to.x;
  const endY = to.y + nodeHeight / 2;

  let pathData;

  if (Math.abs(endY - startY) < nodeHeight) {
    // Nodes are close vertically
    const midX = (startX + endX) / 2;
    const curveDist = nodeHeight + 20;  // 20px buffer for aesthetics
    const controlPointY1 = (endY > startY) ? startY - curveDist : startY + curveDist;
    const controlPointY2 = (endY > startY) ? endY + curveDist : endY - curveDist;

    pathData = `
      M ${startX} ${startY}
      C ${midX} ${controlPointY1}, ${midX} ${controlPointY2}, ${endX} ${endY}
    `;
  } else {
    // Nodes are not close vertically
    const controlPointX = (endX > startX) ? startX + (endX - startX) / 4 : startX - (startX - endX) / 4;
    pathData = `
      M ${startX} ${startY}
      Q ${controlPointX} ${startY}, ${endX} ${endY}
    `;
  }

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
