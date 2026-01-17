// Building.jsx
import React from 'react'
import * as THREE from 'three'
import UShapedStairs from './components/stairs'

// Match the stair defaults used when instantiating UShapedStairs below
const STAIR_WIDTH = 3
const STAIR_GAP = 0.2
const STAIR_SCALE_X = 1.5
const STAIR_SCALE_Z = 1.5
const STAIR_LANDING_DEPTH = 2.5

const FLOOR_HEIGHT = 8.0

// Floor slab renderer that supports rectangular holes in the center slab.
// holes: array of { x: number, w: number, d?: number }
const FloorSlab = ({ width, depth, holes = [] }) => {
  const thickness = 0.3

  // Middle Strip configuration
  const centerWidth = 100 
  const centerX = 0
  const centerZ = 5

  // Build X cut positions based on holes
  const xMin = centerX - centerWidth / 2
  const xMax = centerX + centerWidth / 2

  // build cut list (boundary and hole edges)
  const cuts = [xMin]
  holes.forEach(h => {
    const start = h.x - h.w / 2
    const end = h.x + h.w / 2
    // Clamp cuts to the building edges to ensure we don't draw slab outside
    cuts.push(Math.max(xMin, Math.min(xMax, start)))
    cuts.push(Math.max(xMin, Math.min(xMax, end)))
  })
  cuts.push(xMax)

  // sort and unique
  const sortedCuts = Array.from(new Set(cuts)).sort((a, b) => a - b)

  // create center segments where the mid-point is NOT inside a hole
  const centerSegments = []
  for (let i = 0; i < sortedCuts.length - 1; i++) {
    const a = sortedCuts[i]
    const b = sortedCuts[i + 1]
    const mid = (a + b) / 2
    
    // Check if this segment falls inside any hole definition
    const insideHole = holes.some(h => mid >= (h.x - h.w / 2) && mid <= (h.x + h.w / 2))
    
    // Create segment only if not a hole and has width
    if (!insideHole && b - a > 0.01) {
      centerSegments.push({ x: mid, w: b - a })
    }
  }

  return (
    <group>
      {/* Top Strip (Room support - negative Z) */}
      <mesh position={[0, 0, -5]} receiveShadow>
        <boxGeometry args={[100, thickness, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Bottom Strip (Room support - positive Z) */}
      <mesh position={[0, 0, 15]} receiveShadow>
        <boxGeometry args={[100, thickness, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Middle Strip (Corridor/Stairs - center Z) */}
      {centerSegments.map((seg, idx) => (
        <mesh
          key={`center-seg-${idx}`}
          position={[seg.x, 0, 5]}
          receiveShadow
        >
          <boxGeometry args={[seg.w, thickness, 10]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}

const Room = ({ x, z, w, d, h }) => (
  <mesh position={[x, h / 2 + 0.1, z]}>
    <boxGeometry args={[w, h, d]} />
    <meshStandardMaterial color="#f8f9fa" transparent opacity={0.5} />
    <lineSegments>
      <edgesGeometry args={[new THREE.BoxGeometry(w, h, d)]} />
      <lineBasicMaterial color="#333" />
    </lineSegments>
  </mesh>
)

const Floor = ({ level }) => {
  const y = level * FLOOR_HEIGHT
  const isGym = level === 3

  // Compute the stair hole positions
  // Side stairs are at +/- 48. Building edge is at +/- 50.
  // We want the hole to go all the way to the edge.
  // If stair is at 48 and we want to cut to 50, the hole center needs to shift or width increase.
  // Let's make the hole wide enough to cover 48 to 50.
  const sideStairX = 48
  const holeWidth = 6.0 // Center 48, width 6 => 45 to 51. (51 > 50, so it cuts edge cleanly)

  const middleHoleWidth = Math.max(STAIR_LANDING_DEPTH * STAIR_SCALE_Z + 1.0, STAIR_WIDTH * STAIR_SCALE_X + 1.0)

  // Define holes
  const floorHoles = level < 3 ? [
    { x: -sideStairX, w: holeWidth },
    { x: 0, w: middleHoleWidth },
    { x: sideStairX, w: holeWidth }
  ] : []

  return (
    <group position={[0, y, 0]}>
      <FloorSlab width={100} depth={30} holes={floorHoles} />

      {isGym ? (
        <>
          <Room x={-26} z={0} w={48} d={18} h={7} />
          <Room x={26} z={0} w={48} d={18} h={7} />
        </>
      ) : (
        <>
          {/* Top Side Rooms (z = -6) */}
          <Room x={-35} z={-6} w={25} d={8} h={7} /> 
          <Room x={-12} z={-6} w={15} d={8} h={7} />
          <Room x={12} z={-6} w={15} d={8} h={7} />
          <Room x={35} z={-6} w={25} d={8} h={7} />

          {/* Bottom Side Rooms (z = 6) */}
          <Room x={-35} z={6} w={25} d={8} h={7} /> 
          <Room x={-12} z={6} w={15} d={8} h={7} />
          <Room x={12} z={6} w={15} d={8} h={7} />
          <Room x={35} z={6} w={25} d={8} h={7} />
        </>
      )}

      {/* Render Stairs on floors 0, 1, 2 */}
      {level < 3 && (
        <>
          {/* Left Stairs */}
          <UShapedStairs position={[-48, 0, -5]} width={STAIR_WIDTH} scale={[1, 1, 1]} />
          
          {/* Main Center Stairs */}
          <UShapedStairs position={[0, 0, -5]} width={STAIR_WIDTH} scale={[STAIR_SCALE_X, 1, STAIR_SCALE_Z]} />
          
          {/* Right Stairs */}
          <UShapedStairs position={[48, 0, -5]} width={STAIR_WIDTH} scale={[1, 1, 1]} />
        </>
      )}
    </group>
  )
}

export default function Building() {
  return (
    <group>
      {[0, 1, 2, 3].map(lvl => <Floor key={lvl} level={lvl} />)}
    </group>
  )
}