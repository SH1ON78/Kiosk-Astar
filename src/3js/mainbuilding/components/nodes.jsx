// nodes.jsx - Node Graph Data for Pathfinding

const FLOOR_HEIGHT = 8.0 // Matches Building.jsx

// Helper to create landing nodes for smoother paths
const createLandingNode = (id, x, y, z, label, neighbors) => ({
  id, pos: [x, y, z], type: 'landing', label, neighbors
})

// Ground Floor Nodes
const createGroundFloorNodes = () => {
  const y = 0.2
  const landingY = y + FLOOR_HEIGHT / 2
  
  return [
    // Main entrance
    { id: 'F0-MAIN-ENT', pos: [0, y, 12], type: 'entrance', label: 'Main Entrance', neighbors: ['F0-H-C'] },
    
    // Side doors
    { id: 'F0-LEFT-DOOR', pos: [-45, y, 10], type: 'door', label: 'Left Door', neighbors: ['F0-H-L6'] },
    { id: 'F0-RIGHT-DOOR', pos: [45, y, 10], type: 'door', label: 'Right Door', neighbors: ['F0-H-R6'] },
    
    // Exit path
    { id: 'F0-EXIT-PATH', pos: [0, y, -10], type: 'exit', label: 'Exit to Buildings', neighbors: ['F0-STAIR-MAIN'] },
    
    // Hallways
    { id: 'F0-H-L6', pos: [-47, y, 0], type: 'hallway', neighbors: ['F0-LEFT-DOOR', 'F0-H-L5', 'F0-R-TL6', 'F0-R-BL6', 'F0-STAIR-LEFT'] },
    { id: 'F0-H-L5', pos: [-41, y, 0], type: 'hallway', neighbors: ['F0-H-L6', 'F0-H-L4', 'F0-R-TL5', 'F0-R-BL5'] },
    { id: 'F0-H-L4', pos: [-35, y, 0], type: 'hallway', neighbors: ['F0-H-L5', 'F0-H-L3', 'F0-R-TL4', 'F0-R-BL4'] },
    { id: 'F0-H-L3', pos: [-29, y, 0], type: 'hallway', neighbors: ['F0-H-L4', 'F0-H-L2', 'F0-R-TL3', 'F0-R-BL3'] },
    { id: 'F0-H-L2', pos: [-23, y, 0], type: 'hallway', neighbors: ['F0-H-L3', 'F0-H-L1', 'F0-R-TL2', 'F0-R-BL2'] },
    { id: 'F0-H-L1', pos: [-17, y, 0], type: 'hallway', neighbors: ['F0-H-L2', 'F0-H-C', 'F0-R-TL1', 'F0-R-BL1'] },
    { id: 'F0-H-C', pos: [0, y, 0], type: 'hallway', neighbors: ['F0-H-L1', 'F0-H-R1', 'F0-MAIN-ENT', 'F0-STAIR-MAIN'] },
    { id: 'F0-H-R1', pos: [17, y, 0], type: 'hallway', neighbors: ['F0-H-C', 'F0-H-R2', 'F0-R-TR1', 'F0-R-BR1'] },
    { id: 'F0-H-R2', pos: [23, y, 0], type: 'hallway', neighbors: ['F0-H-R1', 'F0-H-R3', 'F0-R-TR2', 'F0-R-BR2'] },
    { id: 'F0-H-R3', pos: [29, y, 0], type: 'hallway', neighbors: ['F0-H-R2', 'F0-H-R4', 'F0-R-TR3', 'F0-R-BR3'] },
    { id: 'F0-H-R4', pos: [35, y, 0], type: 'hallway', neighbors: ['F0-H-R3', 'F0-H-R5', 'F0-R-TR4', 'F0-R-BR4'] },
    { id: 'F0-H-R5', pos: [41, y, 0], type: 'hallway', neighbors: ['F0-H-R4', 'F0-H-R6', 'F0-R-TR5', 'F0-R-BR5'] },
    { id: 'F0-H-R6', pos: [47, y, 0], type: 'hallway', neighbors: ['F0-H-R5', 'F0-RIGHT-DOOR', 'F0-R-TR6', 'F0-R-BR6', 'F0-STAIR-RIGHT'] },
    
    // Rooms
    { id: 'F0-R-TL6', pos: [-47, y, -8], type: 'room', label: 'Room 001', neighbors: ['F0-H-L6'] },
    { id: 'F0-R-TL5', pos: [-41, y, -8], type: 'room', label: 'Room 002', neighbors: ['F0-H-L5'] },
    { id: 'F0-R-TL4', pos: [-35, y, -8], type: 'room', label: 'Room 003', neighbors: ['F0-H-L4'] },
    { id: 'F0-R-TL3', pos: [-29, y, -8], type: 'room', label: 'Room 004', neighbors: ['F0-H-L3'] },
    { id: 'F0-R-TL2', pos: [-23, y, -8], type: 'room', label: 'Room 005', neighbors: ['F0-H-L2'] },
    { id: 'F0-R-TL1', pos: [-17, y, -8], type: 'room', label: 'Room 006', neighbors: ['F0-H-L1'] },
    { id: 'F0-R-TR1', pos: [17, y, -8], type: 'room', label: 'Room 007', neighbors: ['F0-H-R1'] },
    { id: 'F0-R-TR2', pos: [23, y, -8], type: 'room', label: 'Room 008', neighbors: ['F0-H-R2'] },
    { id: 'F0-R-TR3', pos: [29, y, -8], type: 'room', label: 'Room 009', neighbors: ['F0-H-R3'] },
    { id: 'F0-R-TR4', pos: [35, y, -8], type: 'room', label: 'Room 010', neighbors: ['F0-H-R4'] },
    { id: 'F0-R-TR5', pos: [41, y, -8], type: 'room', label: 'Room 011', neighbors: ['F0-H-R5'] },
    { id: 'F0-R-TR6', pos: [47, y, -8], type: 'room', label: 'Room 012', neighbors: ['F0-H-R6'] },
    
    { id: 'F0-R-BL6', pos: [-47, y, 8], type: 'room', label: 'Room 013', neighbors: ['F0-H-L6'] },
    { id: 'F0-R-BL5', pos: [-41, y, 8], type: 'room', label: 'Room 014', neighbors: ['F0-H-L5'] },
    { id: 'F0-R-BL4', pos: [-35, y, 8], type: 'room', label: 'Room 015', neighbors: ['F0-H-L4'] },
    { id: 'F0-R-BL3', pos: [-29, y, 8], type: 'room', label: 'Room 016', neighbors: ['F0-H-L3'] },
    { id: 'F0-R-BL2', pos: [-23, y, 8], type: 'room', label: 'Room 017', neighbors: ['F0-H-L2'] },
    { id: 'F0-R-BL1', pos: [-17, y, 8], type: 'room', label: 'Room 018', neighbors: ['F0-H-L1'] },
    { id: 'F0-R-BR1', pos: [17, y, 8], type: 'room', label: 'Room 019', neighbors: ['F0-H-R1'] },
    { id: 'F0-R-BR2', pos: [23, y, 8], type: 'room', label: 'Room 020', neighbors: ['F0-H-R2'] },
    { id: 'F0-R-BR3', pos: [29, y, 8], type: 'room', label: 'Room 021', neighbors: ['F0-H-R3'] },
    { id: 'F0-R-BR4', pos: [35, y, 8], type: 'room', label: 'Room 022', neighbors: ['F0-H-R4'] },
    { id: 'F0-R-BR5', pos: [41, y, 8], type: 'room', label: 'Room 023', neighbors: ['F0-H-R5'] },
    { id: 'F0-R-BR6', pos: [47, y, 8], type: 'room', label: 'Room 024', neighbors: ['F0-H-R6'] },
    
    // Stairs (Base)
    { id: 'F0-STAIR-MAIN', pos: [0, y, -5], type: 'stairs', label: 'Main Stairs', neighbors: ['F0-H-C', 'F0-EXIT-PATH', 'F0-STAIR-MAIN-LANDING'] },
    { id: 'F0-STAIR-LEFT', pos: [-48, y, -5], type: 'stairs', label: 'Left Stairs', neighbors: ['F0-H-L6', 'F0-STAIR-LEFT-LANDING'] },
    { id: 'F0-STAIR-RIGHT', pos: [48, y, -5], type: 'stairs', label: 'Right Stairs', neighbors: ['F0-H-R6', 'F0-STAIR-RIGHT-LANDING'] },

    // Stairs (Landings) - pushed back in Z to simulate the U-shape depth
    createLandingNode('F0-STAIR-MAIN-LANDING', 0, landingY, -8, 'Landing', ['F0-STAIR-MAIN', 'F1-STAIR-MAIN']),
    createLandingNode('F0-STAIR-LEFT-LANDING', -48, landingY, -8, 'Landing', ['F0-STAIR-LEFT', 'F1-STAIR-LEFT']),
    createLandingNode('F0-STAIR-RIGHT-LANDING', 48, landingY, -8, 'Landing', ['F0-STAIR-RIGHT', 'F1-STAIR-RIGHT']),
  ]
}

// Floor 1 Nodes
const createFloor1Nodes = () => {
  const y = 1 * FLOOR_HEIGHT + 0.2
  const landingY = y + FLOOR_HEIGHT / 2
  
  return [
    // Hallways
    { id: 'F1-H-L6', pos: [-47, y, 0], type: 'hallway', neighbors: ['F1-H-L5', 'F1-R-TL6', 'F1-R-BL6', 'F1-STAIR-LEFT'] },
    { id: 'F1-H-L5', pos: [-41, y, 0], type: 'hallway', neighbors: ['F1-H-L6', 'F1-H-L4', 'F1-R-TL5', 'F1-R-BL5'] },
    { id: 'F1-H-L4', pos: [-35, y, 0], type: 'hallway', neighbors: ['F1-H-L5', 'F1-H-L3', 'F1-R-TL4', 'F1-R-BL4'] },
    { id: 'F1-H-L3', pos: [-29, y, 0], type: 'hallway', neighbors: ['F1-H-L4', 'F1-H-L2', 'F1-R-TL3', 'F1-R-BL3'] },
    { id: 'F1-H-L2', pos: [-23, y, 0], type: 'hallway', neighbors: ['F1-H-L3', 'F1-H-L1', 'F1-R-TL2', 'F1-R-BL2'] },
    { id: 'F1-H-L1', pos: [-17, y, 0], type: 'hallway', neighbors: ['F1-H-L2', 'F1-H-C', 'F1-R-TL1', 'F1-R-BL1'] },
    { id: 'F1-H-C', pos: [0, y, 0], type: 'hallway', neighbors: ['F1-H-L1', 'F1-H-R1', 'F1-STAIR-MAIN'] },
    { id: 'F1-H-R1', pos: [17, y, 0], type: 'hallway', neighbors: ['F1-H-C', 'F1-H-R2', 'F1-R-TR1', 'F1-R-BR1'] },
    { id: 'F1-H-R2', pos: [23, y, 0], type: 'hallway', neighbors: ['F1-H-R1', 'F1-H-R3', 'F1-R-TR2', 'F1-R-BR2'] },
    { id: 'F1-H-R3', pos: [29, y, 0], type: 'hallway', neighbors: ['F1-H-R2', 'F1-H-R4', 'F1-R-TR3', 'F1-R-BR3'] },
    { id: 'F1-H-R4', pos: [35, y, 0], type: 'hallway', neighbors: ['F1-H-R3', 'F1-H-R5', 'F1-R-TR4', 'F1-R-BR4'] },
    { id: 'F1-H-R5', pos: [41, y, 0], type: 'hallway', neighbors: ['F1-H-R4', 'F1-H-R6', 'F1-R-TR5', 'F1-R-BR5'] },
    { id: 'F1-H-R6', pos: [47, y, 0], type: 'hallway', neighbors: ['F1-H-R5', 'F1-R-TR6', 'F1-R-BR6', 'F1-STAIR-RIGHT'] },
    
    // Rooms
    { id: 'F1-R-TL6', pos: [-47, y, -8], type: 'room', label: 'Room 101', neighbors: ['F1-H-L6'] },
    { id: 'F1-R-TL5', pos: [-41, y, -8], type: 'room', label: 'Room 102', neighbors: ['F1-H-L5'] },
    { id: 'F1-R-TL4', pos: [-35, y, -8], type: 'room', label: 'Room 103', neighbors: ['F1-H-L4'] },
    { id: 'F1-R-TL3', pos: [-29, y, -8], type: 'room', label: 'Room 104', neighbors: ['F1-H-L3'] },
    { id: 'F1-R-TL2', pos: [-23, y, -8], type: 'room', label: 'Room 105', neighbors: ['F1-H-L2'] },
    { id: 'F1-R-TL1', pos: [-17, y, -8], type: 'room', label: 'Room 106', neighbors: ['F1-H-L1'] },
    { id: 'F1-R-TR1', pos: [17, y, -8], type: 'room', label: 'Room 107', neighbors: ['F1-H-R1'] },
    { id: 'F1-R-TR2', pos: [23, y, -8], type: 'room', label: 'Room 108', neighbors: ['F1-H-R2'] },
    { id: 'F1-R-TR3', pos: [29, y, -8], type: 'room', label: 'Room 109', neighbors: ['F1-H-R3'] },
    { id: 'F1-R-TR4', pos: [35, y, -8], type: 'room', label: 'Room 110', neighbors: ['F1-H-R4'] },
    { id: 'F1-R-TR5', pos: [41, y, -8], type: 'room', label: 'Room 111', neighbors: ['F1-H-R5'] },
    { id: 'F1-R-TR6', pos: [47, y, -8], type: 'room', label: 'Room 112', neighbors: ['F1-H-R6'] },
    
    { id: 'F1-R-BL6', pos: [-47, y, 8], type: 'room', label: 'Room 113', neighbors: ['F1-H-L6'] },
    { id: 'F1-R-BL5', pos: [-41, y, 8], type: 'room', label: 'Room 114', neighbors: ['F1-H-L5'] },
    { id: 'F1-R-BL4', pos: [-35, y, 8], type: 'room', label: 'Room 115', neighbors: ['F1-H-L4'] },
    { id: 'F1-R-BL3', pos: [-29, y, 8], type: 'room', label: 'Room 116', neighbors: ['F1-H-L3'] },
    { id: 'F1-R-BL2', pos: [-23, y, 8], type: 'room', label: 'Room 117', neighbors: ['F1-H-L2'] },
    { id: 'F1-R-BL1', pos: [-17, y, 8], type: 'room', label: 'Room 118', neighbors: ['F1-H-L1'] },
    { id: 'F1-R-BR1', pos: [17, y, 8], type: 'room', label: 'Room 119', neighbors: ['F1-H-R1'] },
    { id: 'F1-R-BR2', pos: [23, y, 8], type: 'room', label: 'Room 120', neighbors: ['F1-H-R2'] },
    { id: 'F1-R-BR3', pos: [29, y, 8], type: 'room', label: 'Room 121', neighbors: ['F1-H-R3'] },
    { id: 'F1-R-BR4', pos: [35, y, 8], type: 'room', label: 'Room 122', neighbors: ['F1-H-R4'] },
    { id: 'F1-R-BR5', pos: [41, y, 8], type: 'room', label: 'Room 123', neighbors: ['F1-H-R5'] },
    { id: 'F1-R-BR6', pos: [47, y, 8], type: 'room', label: 'Room 124', neighbors: ['F1-H-R6'] },
    
    // Stairs
    { id: 'F1-STAIR-MAIN', pos: [0, y, -5], type: 'stairs', label: 'Main Stairs', neighbors: ['F1-H-C', 'F0-STAIR-MAIN-LANDING', 'F1-STAIR-MAIN-LANDING'] },
    { id: 'F1-STAIR-LEFT', pos: [-48, y, -5], type: 'stairs', label: 'Left Stairs', neighbors: ['F1-H-L6', 'F0-STAIR-LEFT-LANDING', 'F1-STAIR-LEFT-LANDING'] },
    { id: 'F1-STAIR-RIGHT', pos: [48, y, -5], type: 'stairs', label: 'Right Stairs', neighbors: ['F1-H-R6', 'F0-STAIR-RIGHT-LANDING', 'F1-STAIR-RIGHT-LANDING'] },

    // Landings
    createLandingNode('F1-STAIR-MAIN-LANDING', 0, landingY, -8, 'Landing', ['F1-STAIR-MAIN', 'F2-STAIR-MAIN']),
    createLandingNode('F1-STAIR-LEFT-LANDING', -48, landingY, -8, 'Landing', ['F1-STAIR-LEFT', 'F2-STAIR-LEFT']),
    createLandingNode('F1-STAIR-RIGHT-LANDING', 48, landingY, -8, 'Landing', ['F1-STAIR-RIGHT', 'F2-STAIR-RIGHT']),
  ]
}

// Floor 2 Nodes
const createFloor2Nodes = () => {
  const y = 2 * FLOOR_HEIGHT + 0.2
  const landingY = y + FLOOR_HEIGHT / 2
  
  return [
    // Hallway nodes
    { id: 'F2-H-L6', pos: [-47, y, 0], type: 'hallway', neighbors: ['F2-H-L5', 'F2-R-TL6', 'F2-R-BL6', 'F2-STAIR-LEFT'] },
    { id: 'F2-H-L5', pos: [-41, y, 0], type: 'hallway', neighbors: ['F2-H-L6', 'F2-H-L4', 'F2-R-TL5', 'F2-R-BL5'] },
    { id: 'F2-H-L4', pos: [-35, y, 0], type: 'hallway', neighbors: ['F2-H-L5', 'F2-H-L3', 'F2-R-TL4', 'F2-R-BL4'] },
    { id: 'F2-H-L3', pos: [-29, y, 0], type: 'hallway', neighbors: ['F2-H-L4', 'F2-H-L2', 'F2-R-TL3', 'F2-R-BL3'] },
    { id: 'F2-H-L2', pos: [-23, y, 0], type: 'hallway', neighbors: ['F2-H-L3', 'F2-H-L1', 'F2-R-TL2', 'F2-R-BL2'] },
    { id: 'F2-H-L1', pos: [-17, y, 0], type: 'hallway', neighbors: ['F2-H-L2', 'F2-H-C', 'F2-R-TL1', 'F2-R-BL1'] },
    { id: 'F2-H-C', pos: [0, y, 0], type: 'hallway', neighbors: ['F2-H-L1', 'F2-H-R1', 'F2-STAIR-MAIN'] },
    { id: 'F2-H-R1', pos: [17, y, 0], type: 'hallway', neighbors: ['F2-H-C', 'F2-H-R2', 'F2-R-TR1', 'F2-R-BR1'] },
    { id: 'F2-H-R2', pos: [23, y, 0], type: 'hallway', neighbors: ['F2-H-R1', 'F2-H-R3', 'F2-R-TR2', 'F2-R-BR2'] },
    { id: 'F2-H-R3', pos: [29, y, 0], type: 'hallway', neighbors: ['F2-H-R2', 'F2-H-R4', 'F2-R-TR3', 'F2-R-BR3'] },
    { id: 'F2-H-R4', pos: [35, y, 0], type: 'hallway', neighbors: ['F2-H-R3', 'F2-H-R5', 'F2-R-TR4', 'F2-R-BR4'] },
    { id: 'F2-H-R5', pos: [41, y, 0], type: 'hallway', neighbors: ['F2-H-R4', 'F2-H-R6', 'F2-R-TR5', 'F2-R-BR5'] },
    { id: 'F2-H-R6', pos: [47, y, 0], type: 'hallway', neighbors: ['F2-H-R5', 'F2-R-TR6', 'F2-R-BR6', 'F2-STAIR-RIGHT'] },
    
    // Rooms
    { id: 'F2-R-TL6', pos: [-47, y, -8], type: 'room', label: 'Room 201', neighbors: ['F2-H-L6'] },
    { id: 'F2-R-TL5', pos: [-41, y, -8], type: 'room', label: 'Room 202', neighbors: ['F2-H-L5'] },
    { id: 'F2-R-TL4', pos: [-35, y, -8], type: 'room', label: 'Room 203', neighbors: ['F2-H-L4'] },
    { id: 'F2-R-TL3', pos: [-29, y, -8], type: 'room', label: 'Room 204', neighbors: ['F2-H-L3'] },
    { id: 'F2-R-TL2', pos: [-23, y, -8], type: 'room', label: 'Room 205', neighbors: ['F2-H-L2'] },
    { id: 'F2-R-TL1', pos: [-17, y, -8], type: 'room', label: 'Room 206', neighbors: ['F2-H-L1'] },
    { id: 'F2-R-TR1', pos: [17, y, -8], type: 'room', label: 'Room 207', neighbors: ['F2-H-R1'] },
    { id: 'F2-R-TR2', pos: [23, y, -8], type: 'room', label: 'Room 208', neighbors: ['F2-H-R2'] },
    { id: 'F2-R-TR3', pos: [29, y, -8], type: 'room', label: 'Room 209', neighbors: ['F2-H-R3'] },
    { id: 'F2-R-TR4', pos: [35, y, -8], type: 'room', label: 'Room 210', neighbors: ['F2-H-R4'] },
    { id: 'F2-R-TR5', pos: [41, y, -8], type: 'room', label: 'Room 211', neighbors: ['F2-H-R5'] },
    { id: 'F2-R-TR6', pos: [47, y, -8], type: 'room', label: 'Room 212', neighbors: ['F2-H-R6'] },
    
    { id: 'F2-R-BL6', pos: [-47, y, 8], type: 'room', label: 'Room 213', neighbors: ['F2-H-L6'] },
    { id: 'F2-R-BL5', pos: [-41, y, 8], type: 'room', label: 'Room 214', neighbors: ['F2-H-L5'] },
    { id: 'F2-R-BL4', pos: [-35, y, 8], type: 'room', label: 'Room 215', neighbors: ['F2-H-L4'] },
    { id: 'F2-R-BL3', pos: [-29, y, 8], type: 'room', label: 'Room 216', neighbors: ['F2-H-L3'] },
    { id: 'F2-R-BL2', pos: [-23, y, 8], type: 'room', label: 'Room 217', neighbors: ['F2-H-L2'] },
    { id: 'F2-R-BL1', pos: [-17, y, 8], type: 'room', label: 'Room 218', neighbors: ['F2-H-L1'] },
    { id: 'F2-R-BR1', pos: [17, y, 8], type: 'room', label: 'Room 219', neighbors: ['F2-H-R1'] },
    { id: 'F2-R-BR2', pos: [23, y, 8], type: 'room', label: 'Room 220', neighbors: ['F2-H-R2'] },
    { id: 'F2-R-BR3', pos: [29, y, 8], type: 'room', label: 'Room 221', neighbors: ['F2-H-R3'] },
    { id: 'F2-R-BR4', pos: [35, y, 8], type: 'room', label: 'Room 222', neighbors: ['F2-H-R4'] },
    { id: 'F2-R-BR5', pos: [41, y, 8], type: 'room', label: 'Room 223', neighbors: ['F2-H-R5'] },
    { id: 'F2-R-BR6', pos: [47, y, 8], type: 'room', label: 'Room 224', neighbors: ['F2-H-R6'] },
    
    // Stairs
    { id: 'F2-STAIR-MAIN', pos: [0, y, -5], type: 'stairs', label: 'Main Stairs', neighbors: ['F2-H-C', 'F1-STAIR-MAIN-LANDING', 'F2-STAIR-MAIN-LANDING'] },
    { id: 'F2-STAIR-LEFT', pos: [-48, y, -5], type: 'stairs', label: 'Left Stairs', neighbors: ['F2-H-L6', 'F1-STAIR-LEFT-LANDING', 'F2-STAIR-LEFT-LANDING'] },
    { id: 'F2-STAIR-RIGHT', pos: [48, y, -5], type: 'stairs', label: 'Right Stairs', neighbors: ['F2-H-R6', 'F1-STAIR-RIGHT-LANDING', 'F2-STAIR-RIGHT-LANDING'] },

    // Landings
    createLandingNode('F2-STAIR-MAIN-LANDING', 0, landingY, -8, 'Landing', ['F2-STAIR-MAIN', 'F3-STAIR-MAIN']),
    createLandingNode('F2-STAIR-LEFT-LANDING', -48, landingY, -8, 'Landing', ['F2-STAIR-LEFT', 'F3-STAIR-LEFT']),
    createLandingNode('F2-STAIR-RIGHT-LANDING', 48, landingY, -8, 'Landing', ['F2-STAIR-RIGHT', 'F3-STAIR-RIGHT']),
  ]
}

// Floor 3 Nodes (Gym Floor)
const createFloor3Nodes = () => {
  const y = 3 * FLOOR_HEIGHT + 0.2
  
  return [
    // Hallway
    { id: 'F3-H-C', pos: [0, y, 0], type: 'hallway', neighbors: ['F3-STAIR-MAIN', 'F3-GYM-LEFT', 'F3-GYM-RIGHT'] },
    
    // Gyms
    { id: 'F3-GYM-LEFT', pos: [-25, y, 0], type: 'gym', label: 'Gym 1', neighbors: ['F3-H-C', 'F3-STAIR-LEFT'] },
    { id: 'F3-GYM-RIGHT', pos: [25, y, 0], type: 'gym', label: 'Gym 2', neighbors: ['F3-H-C', 'F3-STAIR-RIGHT'] },
    
    // Stairs (Top connections come from F2 landings)
    { id: 'F3-STAIR-MAIN', pos: [0, y, -5], type: 'stairs', label: 'Main Stairs', neighbors: ['F3-H-C', 'F2-STAIR-MAIN-LANDING'] },
    { id: 'F3-STAIR-LEFT', pos: [-48, y, -5], type: 'stairs', label: 'Left Stairs', neighbors: ['F3-GYM-LEFT', 'F2-STAIR-LEFT-LANDING'] },
    { id: 'F3-STAIR-RIGHT', pos: [48, y, -5], type: 'stairs', label: 'Right Stairs', neighbors: ['F3-GYM-RIGHT', 'F2-STAIR-RIGHT-LANDING'] },
  ]
}

// Combine all floors
export const NODES = [
  ...createGroundFloorNodes(),
  ...createFloor1Nodes(),
  ...createFloor2Nodes(),
  ...createFloor3Nodes()
]

// Create node map for quick lookup
export const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]))