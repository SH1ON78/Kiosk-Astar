// Stairs.jsx - U-Shaped Staircase Component
import React from 'react'

export default function UShapedStairs({ position }) {
  return (
    <group position={position}>
      {/* Bottom flight */}
      <mesh position={[0, 0.5, 1]}>
        <boxGeometry args={[3, 1, 2]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>
      
      {/* Landing platform */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#95a5a6" />
      </mesh>
      
      {/* Top flight (rotated 180 degrees) */}
      <mesh position={[0, 1.5, -1]}>
        <boxGeometry args={[3, 1, 2]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>
      
      {/* Stair marker for visibility */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
        <meshStandardMaterial color="#e74c3c" emissive="#c0392b" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}