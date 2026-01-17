// nodes.jsx
const FLOOR_HEIGHT = 8.0;

const createStairNodes = (floorLevel, xPos, labelPrefix) => {
  const yBase = floorLevel * FLOOR_HEIGHT;
  const yLanding = yBase + FLOOR_HEIGHT / 2;
  const yTop = (floorLevel + 1) * FLOOR_HEIGHT;
  const f = `F${floorLevel}`;
  const nextF = `F${floorLevel + 1}`;

  // Map the stair's physical X to the nearest Hallway node X coordinate
  const hX = xPos < -30 ? -60 : (xPos > 30 ? 60 : 0);
  
  const isMain = labelPrefix === 'MAIN';
  const effectiveWidth = 3 * (isMain ? 1.5 : 1.0);
  const gap = 0.2;
  const flightX1 = -(effectiveWidth / 2 + gap); 
  const flightX2 = (effectiveWidth / 2 + gap);  

  const zBottom = -2.2; 
  const zLanding = -8.2; 

  return [
    { 
      id: `${f}-ST-ENTRY-${labelPrefix}`, 
      pos: [hX, yBase + 0.2, 3], 
      type: 'hallway', 
      neighbors: [`${f}-ST-START-${labelPrefix}`, `${f}-H-${hX}`] 
    },
    { 
      id: `${f}-ST-START-${labelPrefix}`, 
      pos: [xPos + flightX1, yBase + 0.3, zBottom], 
      type: 'stairs', 
      neighbors: [`${f}-ST-L1-${labelPrefix}`, `${f}-ST-ENTRY-${labelPrefix}`] 
    },
    { 
      id: `${f}-ST-L1-${labelPrefix}`, 
      pos: [xPos + flightX1, yLanding + 0.1, zLanding], 
      type: 'landing', 
      neighbors: [`${f}-ST-L2-${labelPrefix}`, `${f}-ST-START-${labelPrefix}`] 
    },
    { 
      id: `${f}-ST-L2-${labelPrefix}`, 
      pos: [xPos + flightX2, yLanding + 0.1, zLanding], 
      type: 'landing', 
      neighbors: [`${f}-ST-END-${labelPrefix}`, `${f}-ST-L1-${labelPrefix}`] 
    },
    { 
      id: `${f}-ST-END-${labelPrefix}`, 
      pos: [xPos + flightX2, yTop + 0.3, zBottom], 
      type: 'stairs', 
      neighbors: [`${nextF}-ST-EXIT-${labelPrefix}`, `${f}-ST-L2-${labelPrefix}`] 
    },
    { 
      id: `${nextF}-ST-EXIT-${labelPrefix}`, 
      pos: [hX, yTop + 0.2, 3], 
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
    nodes.push({
      id: hId,
      pos: [x, y, 3],
      type: 'hallway',
      neighbors: [
        i > 0 ? `${f}-H-${xCoords[i-1]}` : null,
        i < xCoords.length - 1 ? `${f}-H-${xCoords[i+1]}` : null,
        `${f}-R-BACK-${x}`,
        `${f}-R-FRONT-${x}`
      ].filter(Boolean)
    });

    nodes.push({
      id: `${f}-R-BACK-${x}`, pos: [x, y, 13], type: 'room',
      label: `Room ${level}${i < 10 ? '0'+i : i}B`, neighbors: [hId]
    });

    if (x !== -60 && x !== 0 && x !== 60) {
      nodes.push({
        id: `${f}-R-FRONT-${x}`, pos: [x, y, -7], type: 'room',
        label: `Room ${level}${i < 10 ? '0'+i : i}F`, neighbors: [hId]
      });
    }
  });
  return nodes;
};

// 1. Generate Raw Node Arrays
const floorNodes = [0, 1, 2, 3].flatMap(lvl => createFloorNodes(lvl));
const stairNodes = [0, 1, 2].flatMap(lvl => [
  ...createStairNodes(lvl, -61.5, 'LEFT'),
  ...createStairNodes(lvl, 0, 'MAIN'),
  ...createStairNodes(lvl, 61.5, 'RIGHT')
]);

// 2. Combine into one flat array
export const NODES = [...floorNodes, ...stairNodes];

// 3. Create the Map (Crucial: do this AFTER nodes are linked)
export const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]));

// 4. Final Pass: Inject Stair Bridges into Hallway Neighbors
// This ensures that the Hallway knows about the stairs
NODES.forEach(node => {
  if (node.type === 'hallway' && node.id.includes('-H-')) {
    const x = node.pos[0];
    const f = node.id.split('-')[0];
    
    // Logic: If hallway is at x=-60, check for LEFT stairs
    const label = x === -60 ? 'LEFT' : (x === 60 ? 'RIGHT' : (x === 0 ? 'MAIN' : null));
    
    if (label) {
      const entryId = `${f}-ST-ENTRY-${label}`;
      const exitId = `${f}-ST-EXIT-${label}`;
      
      // If the Entry/Exit exists for this floor, bridge it
      if (NODE_MAP[entryId]) node.neighbors.push(entryId);
      if (NODE_MAP[exitId]) node.neighbors.push(exitId);
    }
  }
});