export default function ConnectionLine({ from, to }) {
  const nodeWidth = 100;
  const nodeHeight = 50;

  const startX = from.x + nodeWidth;
  const startY = from.y + nodeHeight / 2;
  const endX = to.x;
  const endY = to.y + nodeHeight / 2;

  // Adjust control point based on relative positions of nodes
  const controlPointX = (startX + endX) / 2;
  const deltaY = endY - startY;
  const controlPointY = startY + deltaY / 3;  // Adjust this value to change the curve's height

  const pathData = `
    M ${startX} ${startY}
    Q ${controlPointX} ${controlPointY}, ${endX} ${endY}
  `;

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
