// astar.jsx
import { NODES, NODE_MAP } from './mainbuilding/components/nodes'

function heuristic(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function astar(startId, goalId) {
  if (!NODE_MAP[startId] || !NODE_MAP[goalId]) {
    console.error('Invalid start or goal node');
    return null;
  }

  const open = new Set([startId]);
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  for (const n of NODES) {
    gScore[n.id] = Infinity;
    fScore[n.id] = Infinity;
  }
  
  gScore[startId] = 0;
  fScore[startId] = heuristic(NODE_MAP[startId].pos, NODE_MAP[goalId].pos);

  while (open.size > 0) {
    let current = [...open].reduce((a, b) => fScore[a] < fScore[b] ? a : b);

    if (current === goalId) {
      const path = [];
      let cur = current;
      while (cur) {
        path.unshift(cur);
        cur = cameFrom[cur];
      }
      return path;
    }

    open.delete(current);

    const neighbors = NODE_MAP[current].neighbors || [];
    for (const neighborId of neighbors) {
      const neighborNode = NODE_MAP[neighborId];
      
      if (!neighborNode) continue; 

      const tentativeG = gScore[current] + heuristic(
        NODE_MAP[current].pos,
        neighborNode.pos
      );
      
      if (tentativeG < gScore[neighborId]) {
        cameFrom[neighborId] = current;
        gScore[neighborId] = tentativeG;
        fScore[neighborId] = tentativeG + heuristic(
          neighborNode.pos,
          NODE_MAP[goalId].pos
        );
        
        if (!open.has(neighborId)) {
          open.add(neighborId);
        }
      }
    }
  }

  console.warn('No path found between', startId, 'and', goalId);
  return null;
}