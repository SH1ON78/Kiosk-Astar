// Building.jsx
import React from 'react'
import * as THREE from 'three'
import UShapedStairs from './stairs' // 1. IMPORT THE NEW STAIRS

const FLOOR_HEIGHT = 4.0 

const Floor = ({ level }) => {
  const y = level * FLOOR_HEIGHT
  const isGym = level === 3

  return (
    <group position={[0, y, 0]}>
      {/* 1. Base Slab */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[100, 0.2, 20]} />
        <meshStandardMaterial color="#bdc3c7" />
      </mesh>

      {/* 2. Hallway */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[98, 0.05, 4]} />
        <meshStandardMaterial color="#ecf0f1" />
      </mesh>

      {/* 3. Rooms */}
      {isGym ? (
        <>
          <Room x={-25} z={0} w={45} d={15} h={2} color="#aed6f1" />
          <Room x={25} z={0} w={45} d={15} h={2} color="#aed6f1" />
        </>
      ) : (
        <>
          {[-40, -30, -20, -10, 10, 20, 30, 40].map((x, i) => (
             <Room key={`t-${i}`} x={x} z={-7} w={8} d={5} h={2} color="#e8daef" />
          ))}
          {[-40, -30, -20, -10, 10, 20, 30, 40].map((x, i) => (
             <Room key={`b-${i}`} x={x} z={7} w={8} d={5} h={2} color="#e8daef" />
          ))}
        </>
      )}

      {/* 4. USE REAL STAIRS INSTEAD OF BLOCKS */}
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

const Room = ({ x, z, w, d, h, color }) => (
  <mesh position={[x, h/2 + 0.1, z]}>
    <boxGeometry args={[w, h, d]} />
    <meshStandardMaterial color={color} transparent opacity={0.6} />
    <lineSegments>
      <edgesGeometry args={[new THREE.BoxGeometry(w, h, d)]} />
      <lineBasicMaterial color="#999" />
    </lineSegments>
  </mesh>
)

export default function Building() {
  return (
    <group>
      <Floor level={0} />
      <Floor level={1} />
      <Floor level={2} />
      <Floor level={3} />
    </group>
  )
}