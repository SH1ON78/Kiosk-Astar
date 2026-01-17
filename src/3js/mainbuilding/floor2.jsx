// Floor2.jsx - Second Floor Component
import React from 'react'
import UShapedStairs from './components/stairs'

export default function Floor2() {
  const width = 1000
  const depth = 20
  const floorHeight = 8
  const y = 2 * floorHeight
  
  return (
    <group position={[0, y, 0]}>
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
      
      {/* Rooms - Top side */}
      {[-47, -41, -35, -29, -23, -17, -11, 11, 17, 23, 29, 35, 41, 47].map((x, i) => (
        <mesh key={`top-${i}`} position={[x, 0.16, -8]}>
          <boxGeometry args={[5, 0.02, 7]} />
          <meshStandardMaterial color="#fff9e6" />
        </mesh>
      ))}
      
      {/* Rooms - Bottom side */}
      {[-47, -41, -35, -29, -23, -17, -11, 11, 17, 23, 29, 35, 41, 47].map((x, i) => (
        <mesh key={`bot-${i}`} position={[x, 0.16, 8]}>
          <boxGeometry args={[5, 0.02, 7]} />
          <meshStandardMaterial color="#fff9e6" />
        </mesh>
      ))}
      
      {/* U-Shaped Stairs */}
      <UShapedStairs position={[-48, 0, -5]} />
      
      <UShapedStairs 
        position={[0, 0, -5]} 
        width={3} 
        scale={[1.5, 1, 1.5]} 
      /> {/* Updated to be bigger */}
      
      <UShapedStairs position={[48, 0, -5]} />
    </group>
  )
}