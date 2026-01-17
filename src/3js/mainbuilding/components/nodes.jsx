// nodes.jsx
const FLOOR_HEIGHT = 8.0;

/**
 * U-Stairs Logic (6 Nodes):
 * ENTRY (Hallway) -> START (Floor) -> L1 (Mid-Back) -> L2 (Mid-Back) -> END (Top) -> EXIT (Upper Hallway)
 */
const createStairNodes = (floorLevel, xPos, labelPrefix) => {
  const yBase = floorLevel * FLOOR_HEIGHT + 0.2;
  const yLanding = yBase + FLOOR_HEIGHT / 2;
  const yTop = (floorLevel + 1) * FLOOR_HEIGHT + 0.2;
  const f = `F${floorLevel}`;
  const nextF = `F${floorLevel + 1}`;
  
  // Map xPos to the correct Hallway ID coordinate
  const hX = xPos === -61.5 ? -60 : xPos === 61.5 ? 60 : 0;

  return [
    { 
      id: `${f}-ST-ENTRY-${labelPrefix}`, 
      pos: [hX, yBase, 3], 
      type: 'hallway', 
      neighbors: [`${f}-ST-START-${labelPrefix}`, `${f}-H-${hX}`] 
    },
    { 
      id: `${f}-ST-START-${labelPrefix}`, 
      pos: [xPos - 2, yBase, -3.7], 
      type: 'stairs', 
      neighbors: [`${f}-ST-L1-${labelPrefix}`, `${f}-ST-ENTRY-${labelPrefix}`] 
    },
    { 
      id: `${f}-ST-L1-${labelPrefix}`, 
      pos: [xPos - 2, yLanding, -8.5], 
      type: 'landing', 
      neighbors: [`${f}-ST-L2-${labelPrefix}`, `${f}-ST-START-${labelPrefix}`] 
    },
    { 
      id: `${f}-ST-L2-${labelPrefix}`, 
      pos: [xPos + 2, yLanding, -8.5], 
      type: 'landing', 
      neighbors: [`${f}-ST-END-${labelPrefix}`, `${f}-ST-L1-${labelPrefix}`] 
    },
    { 
      id: `${f}-ST-END-${labelPrefix}`, 
      pos: [xPos + 2, yTop, -3.7], 
      type: 'stairs', 
      neighbors: [`${nextF}-ST-EXIT-${labelPrefix}`, `${f}-ST-L2-${labelPrefix}`] 
    },
    { 
      id: `${nextF}-ST-EXIT-${labelPrefix}`, 
      pos: [hX, yTop, 3], 
      type: 'hallway', 
      neighbors: [`${f}-ST-END-${labelPrefix}`, `${nextF}-H-${hX}`] 
    }
  ];
};

const createFloorNodes = (level) => {
  const y = level * FLOOR_HEIGHT + 0.2;
  const f = `F${level}`;
  let nodes = [];
  
  const xCoords = [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60];

  xCoords.forEach((x, i) => {
    const hId = `${f}-H-${x}`;
    const isStairX = (x === -60 || x === 0 || x === 60);
    const stairLabel = x === -60 ? 'LEFT' : x === 0 ? 'MAIN' : 'RIGHT';

    // 1. Hallway Node
    nodes.push({
      id: hId,
      pos: [x, y, 3],
      type: 'hallway',
      neighbors: [
        i > 0 ? `${f}-H-${xCoords[i-1]}` : null,
        i < xCoords.length - 1 ? `${f}-H-${xCoords[i+1]}` : null,
        `${f}-R-BACK-${x}`,
        `${f}-R-FRONT-${x}`,
        // BRIDGE TO STAIRS:
        // Going UP: connect to current floor entry
        (level < 3 && isStairX) ? `${f}-ST-ENTRY-${stairLabel}` : null,
        // Coming DOWN: connect to the exit node that landed here from the floor below
        (level > 0 && isStairX) ? `${f}-ST-EXIT-${stairLabel}` : null
      ].filter(Boolean)
    });

    // 2. Back Rooms (Z=13)
    nodes.push({
      id: `${f}-R-BACK-${x}`,
      pos: [x, y, 13],
      type: 'room',
      label: `Room ${level}${i < 10 ? '0'+i : i}B`,
      neighbors: [hId]
    });

    // 3. Front Rooms (Z=-7)
    if (!isStairX) {
      nodes.push({
        id: `${f}-R-FRONT-${x}`,
        pos: [x, y, -7],
        type: 'room',
        label: `Room ${level}${i < 10 ? '0'+i : i}F`,
        neighbors: [hId]
      });
    }
  });

  // 4. Stair Logic (Levels 0, 1, 2)
  if (level < 3) {
    const left = createStairNodes(level, -61.5, 'LEFT');
    const center = createStairNodes(level, 0, 'MAIN');
    const right = createStairNodes(level, 61.5, 'RIGHT');
    nodes.push(...left, ...center, ...right);
  }

  return nodes;
};

export const NODES = [0, 1, 2, 3].flatMap(lvl => createFloorNodes(lvl));
export const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]));