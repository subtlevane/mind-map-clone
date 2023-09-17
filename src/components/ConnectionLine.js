export default function ConnectionLine({ from, to }) {
  return (
    <line 
      x1={from.x} y1={from.y}
      x2={to.x} y2={to.y}
      stroke="#333"
      strokeWidth="2"
    />
  );
}
