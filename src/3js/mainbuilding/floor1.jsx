// Floor1.jsx - First Floor Component
import React from 'react'
import UShapedStairs from './components/stairs'

export default function Floor1() {
  const width = 100
  const depth = 20
  const floorHeight = 4
  const y = 1 * floorHeight
  
  return (
    <group position={[0, y, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, 0.3, depth]} />
        <meshStandardMaterial color="#ecf0f1" />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[width - 2, 0.02, 3]} />
        <meshStandardMaterial color="#d4e4f7" />
      </mesh>

      {/* STAIRS */}
      <UShapedStairs position={[-48, 0, -5]} /> {/* Left Side: Standard */}
      <UShapedStairs position={[48, 0, -5]} />  {/* Right Side: Standard */}
      
      <UShapedStairs 
        position={[0, 0, -5]} 
        width={3} 
        scale={[1.5, 1, 1.5]} 
      /> {/* BIGGER MAIN STAIRS */}
    </group>
  )
}