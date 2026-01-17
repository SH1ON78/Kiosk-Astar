// Floor2.jsx
import React from 'react'
import UShapedStairs from './components/stairs'

export default function Floor2() {
  const floorHeight = 8 // Updated
  const y = 2 * floorHeight
  
  return (
    <group position={[0, y, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[100, 0.3, 20]} />
        <meshStandardMaterial color="#ecf0f1" />
      </mesh>
      
      <UShapedStairs position={[-48, 0, -5]} />
      <UShapedStairs position={[48, 0, -5]} />
      <UShapedStairs position={[0, 0, -5]} width={3} scale={[1.5, 1, 1.5]} />
    </group>
  )
}