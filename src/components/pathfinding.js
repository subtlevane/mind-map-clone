class PriorityQueue {
    constructor() {
      this.elements = [];
    }
  
    isEmpty() {
      return this.elements.length === 0;
    }
  
    put(item, priority) {
      this.elements.push({ item, priority });
      this.elements.sort((a, b) => a.priority - b.priority);
    }
  
    get() {
      return this.elements.shift().item;
    }
  }
  
  function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  
  function getNeighbors(point, grid) {
    const neighbors = [];
    const { x, y } = point;
  
    if (grid[x - 1] && grid[x - 1][y] === 'open') {
      neighbors.push({ x: x - 1, y });
    }
    if (grid[x + 1] && grid[x + 1][y] === 'open') {
      neighbors.push({ x: x + 1, y });
    }
    if (grid[x][y - 1] === 'open') {
      neighbors.push({ x, y: y - 1 });
    }
    if (grid[x][y + 1] === 'open') {
      neighbors.push({ x, y: y + 1 });
    }
  
    return neighbors;
  }
  
  export function aStar(grid, start, end) {
    const openSet = new PriorityQueue();
    const cameFrom = {};
    const gScore = {};
    const fScore = {};
  
    gScore[start] = 0;
    fScore[start] = heuristic(start, end);
    openSet.put(start, 0);
  
    while (!openSet.isEmpty()) {
      const current = openSet.get();
  
      if (current.x === end.x && current.y === end.y) {
        const path = [];
        let temp = current;
        while (temp) {
          path.push(temp);
          temp = cameFrom[temp];
        }
        return path.reverse();
      }
  
      getNeighbors(current, grid).forEach(neighbor => {
        const tentativeGScore = (gScore[current] || Infinity) + 1;
        if (tentativeGScore < (gScore[neighbor] || Infinity)) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentativeGScore;
          fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end);
          openSet.put(neighbor, fScore[neighbor]);
        }
      });
    }
  
    return []; // Return an empty array if no path is found
  }
