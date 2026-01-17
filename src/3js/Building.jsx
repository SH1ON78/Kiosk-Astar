// Building.jsx
import React from 'react'
import UShapedStairs from './mainbuilding/stairs'

const FLOOR_HEIGHT = 4.0 // Standardized height

// Reusable "Modern Floor" Component
const FloorLevel = ({ level, hasGym }) => {
  const y = level * FLOOR_HEIGHT
  const width = 100
  const depth = 20
  
  return (
    <group position={[0, y, 0]}>
      {/* 1. The Concrete Slab */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[width, 0.3, depth]} />
        <meshStandardMaterial color="#ecf0f1" roughness={0.1} />
      </mesh>

      {/* 2. Glass Exterior Walls (Visual only) */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[width, 3.8, depth]} />
        <meshPhysicalMaterial 
          color="#a8d8ff" 
          transmission={0.6} // Glass effect
          opacity={0.3} 
          transparent 
          roughness={0} 
          thickness={1}
          side={2} // Double side
        />
      </mesh>

      {/* 3. Interior Layouts */}
      {hasGym ? (
        // Gym Floor Layout
        <>
          <Room x={-25} w={45} d={16} label="Gym 1" />
          <Room x={25} w={45} d={16} label="Gym 2" />
        </>
      ) : (
        // Standard Classroom Layout
        <>
           {/* Hallway Floor Color */}
          <mesh position={[0, 0.16, 0]} receiveShadow>
             <boxGeometry args={[width - 2, 0.05, 4]} />
             <meshStandardMaterial color="#bdc3c7" />
          </mesh>
          
          {/* Top Row Rooms */}
          {[-40, -30, -20, -10, 10, 20, 30, 40].map((x, i) => (
             <Room key={`t-${i}`} x={x} z={-7} w={8} d={5} />
          ))}
          {/* Bottom Row Rooms */}
          {[-40, -30, -20, -10, 10, 20, 30, 40].map((x, i) => (
             <Room key={`b-${i}`} x={x} z={7} w={8} d={5} />
          ))}
        </>
      )}

      {/* 4. Stairs (if not top floor) */}
      {level < 3 && (
        <>
           <UShapedStairs position={[-45, 0, -5]} />
           <UShapedStairs position={[0, 0, -5]} />
           <UShapedStairs position={[45, 0, -5]} />
        </>
      )}
    </group>
  )
}

const Room = ({ x, z = 0, w, d, label }) => (
  <mesh position={[x, 1, z]} castShadow receiveShadow>
    <boxGeometry args={[w, 2, d]} />
    <meshStandardMaterial color="#fff" roughness={0.5} />
    {/* Floor inside room */}
    <mesh position={[0, -0.9, 0]}>
       <boxGeometry args={[w-0.2, 0.1, d-0.2]} />
       <meshStandardMaterial color="#f1c40f" />
    </mesh>
  </mesh>
)

export default function Building() {
  return (
    <group>
      <FloorLevel level={0} />
      <FloorLevel level={1} />
      <FloorLevel level={2} />
      <FloorLevel level={3} hasGym={true} />
    </group>
  )
}