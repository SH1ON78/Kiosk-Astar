// astar.jsx - A* Pathfinding Algorithm
import { NODES, NODE_MAP } from './nodes'

// Heuristic function (Euclidean distance)
function heuristic(a, b) {
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  const dz = a[2] - b[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

// A* Pathfinding Algorithm
export function astar(startId, goalId) {
  // Validate start and goal nodes exist
  if (!NODE_MAP[startId] || !NODE_MAP[goalId]) {
    console.error('Invalid start or goal node')
    return null
  }

  const open = new Set([startId])
  const cameFrom = {}
  const gScore = {}
  const fScore = {}

  // Initialize scores
  for (const n of NODES) {
    gScore[n.id] = Infinity
    fScore[n.id] = Infinity
  }
  
  gScore[startId] = 0
  fScore[startId] = heuristic(NODE_MAP[startId].pos, NODE_MAP[goalId].pos)

  // Main A* loop
  while (open.size > 0) {
    // Find node in open set with lowest fScore
    let current = null
    let bestScore = Infinity
    
    for (const id of open) {
      if (fScore[id] < bestScore) {
        bestScore = fScore[id]
        current = id
      }
    }

    // Goal reached - reconstruct path
    if (current === goalId) {
      const path = []
      let cur = current
      
      while (cur) {
        path.unshift(cur)
        cur = cameFrom[cur]
      }
      
      return path
    }

    open.delete(current)

    // Check all neighbors
    for (const neighborId of NODE_MAP[current].neighbors) {
      const tentativeG = gScore[current] + heuristic(
        NODE_MAP[current].pos,
        NODE_MAP[neighborId].pos
      )
      
      if (tentativeG < gScore[neighborId]) {
        // This path to neighbor is better than any previous one
        cameFrom[neighborId] = current
        gScore[neighborId] = tentativeG
        fScore[neighborId] = tentativeG + heuristic(
          NODE_MAP[neighborId].pos,
          NODE_MAP[goalId].pos
        )
        
        if (!open.has(neighborId)) {
          open.add(neighborId)
        }
      }
    }
  }

  // No path found
  console.error('No path found between', startId, 'and', goalId)
  return null
}

// Optional: Get path length/distance
export function getPathDistance(path) {
  if (!path || path.length < 2) return 0
  
  let distance = 0
  for (let i = 0; i < path.length - 1; i++) {
    const from = NODE_MAP[path[i]].pos
    const to = NODE_MAP[path[i + 1]].pos
    distance += heuristic(from, to)
  }
  
  return distance
}

// Optional: Get floor transitions in path
export function getFloorTransitions(path) {
  if (!path || path.length < 2) return []
  
  const transitions = []
  for (let i = 0; i < path.length - 1; i++) {
    const currentNode = NODE_MAP[path[i]]
    const nextNode = NODE_MAP[path[i + 1]]
    
    if (currentNode.type === 'stairs' && nextNode.type !== 'stairs') {
      const fromFloor = path[i].match(/F(\d+)/)[1]
      const toFloor = path[i + 1].match(/F(\d+)/)[1]
      
      if (fromFloor !== toFloor) {
        transitions.push({
          from: parseInt(fromFloor),
          to: parseInt(toFloor),
          stairId: path[i]
        })
      }
    }
  }
  
  return transitions
}