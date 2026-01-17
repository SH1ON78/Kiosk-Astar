// Floor0.jsx - Ground Floor Component
import React from 'react'
import UShapedStairs from './stairs'

export default function Floor0() {
  const width = 100
  const depth = 20
  
  return (
    <group position={[0, 0, 0]}>
      {/* Floor base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, 0.3, depth]} />
        <meshStandardMaterial color="#ecf0f1" />
      </mesh>
      
      {/* Hallway */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[width - 2, 0.02, 3]} />
        <meshStandardMaterial color="#d4e4f7" />
      </mesh>
      
      {/* Rooms - Top side (12 rooms) */}
      {[-47, -41, -35, -29, -23, -17, -11, 11, 17, 23, 29, 35, 41, 47].map((x, i) => (
        <mesh key={`top-${i}`} position={[x, 0.16, -8]}>
          <boxGeometry args={[5, 0.02, 7]} />
          <meshStandardMaterial color="#fff9e6" />
        </mesh>
      ))}
      
      {/* Rooms - Bottom side (12 rooms) */}
      {[-47, -41, -35, -29, -23, -17, -11, 11, 17, 23, 29, 35, 41, 47].map((x, i) => (
        <mesh key={`bot-${i}`} position={[x, 0.16, 8]}>
          <boxGeometry args={[5, 0.02, 7]} />
          <meshStandardMaterial color="#fff9e6" />
        </mesh>
      ))}
      
      {/* Main entrance (bottom center) */}
      <mesh position={[0, 0.3, 12]}>
        <boxGeometry args={[2, 0.6, 0.3]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>
      
      {/* Side doors (left and right) */}
      <mesh position={[-45, 0.3, 10]}>
        <boxGeometry args={[0.3, 0.6, 2]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>
      <mesh position={[45, 0.3, 10]}>
        <boxGeometry args={[0.3, 0.6, 2]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>
      
      {/* Exit path marker (under main stairs) */}
      <mesh position={[0, 0.3, -10]}>
        <boxGeometry args={[2, 0.6, 0.3]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>
      
      {/* U-Shaped Stairs */}
      <UShapedStairs position={[-48, 0, -5]} />
      <UShapedStairs position={[0, 0, -5]} />
      <UShapedStairs position={[48, 0, -5]} />
    </group>
  )
}