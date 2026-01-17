// Floor3.jsx - Gym Floor Component
import React from 'react'
import UShapedStairs from './stairs'

export default function Floor3() {
  const width = 100
  const depth = 20
  const floorHeight = 4
  const y = 3 * floorHeight
  
  return (
    <group position={[0, y, 0]}>
      {/* Floor base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, 0.3, depth]} />
        <meshStandardMaterial color="#ecf0f1" />
      </mesh>
      
      {/* Center hallway */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[3, 0.02, depth - 4]} />
        <meshStandardMaterial color="#d4e4f7" />
      </mesh>
      
      {/* Gym 1 - Left side */}
      <mesh position={[-25, 0.16, 0]}>
        <boxGeometry args={[45, 0.02, depth - 4]} />
        <meshStandardMaterial color="#e8f5e9" />
      </mesh>
      
      {/* Gym 2 - Right side */}
      <mesh position={[25, 0.16, 0]}>
        <boxGeometry args={[45, 0.02, depth - 4]} />
        <meshStandardMaterial color="#e8f5e9" />
      </mesh>
      
      {/* U-Shaped Stairs (terminate here) */}
      <UShapedStairs position={[-48, 0, -5]} />
      <UShapedStairs position={[0, 0, -5]} />
      <UShapedStairs position={[48, 0, -5]} />
    </group>
  )
}