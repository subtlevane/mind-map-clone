function ConnectionLine({ from, to }) {
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <line 
        x1={from.x} y1={from.y}
        x2={to.x} y2={to.y}
        stroke="#333"
        strokeWidth="2"
      />
    </svg>
  );
}
export default ConnectionLine;
