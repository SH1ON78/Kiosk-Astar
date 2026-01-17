// Building.jsx
import React from 'react'
import * as THREE from 'three'
import UShapedStairs from './components/stairs'

const STAIR_WIDTH = 3
const STAIR_GAP = 0.2
const STAIR_SCALE_X = 1.5
const STAIR_SCALE_Z = 1.5
const STAIR_LANDING_DEPTH = 2.5

const FLOOR_HEIGHT = 8.0

const FloorSlab = ({ width, depth, holes = [] }) => {
  const thickness = 0.5

  const stairsWIDTH = 130 
  const stairsX = 0

  const xMin = stairsX - stairsWIDTH / 2
  const xMax = stairsX + stairsWIDTH / 2

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

  const StairsSegmets = []
  for (let i = 0; i < sortedCuts.length - 1; i++) {
    const a = sortedCuts[i]
    const b = sortedCuts[i + 1]
    const mid = (a + b) / 2
    
    // Check if this segment falls inside any hole definition
    const insideHole = holes.some(h => mid >= (h.x - h.w / 2) && mid <= (h.x + h.w / 2))
    
    // Create segment only if not a hole and has width
    if (!insideHole && b - a > 0.) {
      StairsSegmets.push({ x: mid, w: b - a })
    }
  }

  return (
    <group>
      {/*MIDDLE STRIP HALLWAY*/}
      <mesh position={[0, 0, 3]} receiveShadow>
        <boxGeometry args={[130, thickness, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/*NO STAIRS OTHER SIDE OF THE HALLWAY*/}
      <mesh position={[0, 0, 13]} receiveShadow>
        <boxGeometry args={[130, thickness, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/*STAIRS SIDE WHERE THE STAIRS ARE LOCATED*/}
      {StairsSegmets.map((seg, idx) => (
        <mesh
          key={idx}
          position={[seg.x, 0, -7]}
          receiveShadow
        >
          <boxGeometry args={[seg.w, thickness, 10]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}
const Floor = ({ level }) => {
  const y = level * FLOOR_HEIGHT
  const isGym = level === 3

  const sideStairX = 61.5
  const holeWidth = 7.0

  const middleHoleWidth = Math.max(STAIR_LANDING_DEPTH * STAIR_SCALE_Z + 1.5, STAIR_WIDTH * STAIR_SCALE_X + 1.5)

  const floorHoles = level < 4 ? [
    { x: -sideStairX, w: holeWidth},
    { x: 0, w: middleHoleWidth + 3.4},
    { x: sideStairX, w: holeWidth }
  ] : []

  return (
    <group position={[0, y, 0]}>
      <FloorSlab width={100} depth={30} holes={floorHoles} />
      {level < 3 && (
        <>
          {/* Left Stairs - moved inward */}
          <UShapedStairs position={[-61.5, 0, -3.7]} width={STAIR_WIDTH} scale={[1, 1, 1]} />
          
          {/* Main Center Stairs */}
          <UShapedStairs position={[0, 0, -3.7]} width={STAIR_WIDTH} scale={[STAIR_SCALE_X, 1, STAIR_SCALE_Z]} />
          
          {/* Right Stairs - moved inward */}
          <UShapedStairs position={[61.5, 0, -3.7]} width={STAIR_WIDTH} scale={[1, 1, 1]} />
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