// stairs.jsx - Detailed U-Shaped Staircase
import React from 'react'

export default function UShapedStairs({ position }) {
  const STEP_COUNT = 8 // Steps per flight (Total 16)
  const STEP_HEIGHT = 0.25
  const STEP_DEPTH = 0.4
  const STEP_WIDTH = 1.5

  return (
    <group position={position}>
      {/* Flight 1: Going Up to Landing */}
      {Array.from({ length: STEP_COUNT }).map((_, i) => (
        <mesh key={`s1-${i}`} position={[-0.8, i * STEP_HEIGHT, 1.5 - (i * STEP_DEPTH)]}>
          <boxGeometry args={[STEP_WIDTH, STEP_HEIGHT, STEP_DEPTH]} />
          <meshStandardMaterial color="#95a5a6" />
        </mesh>
      ))}

      {/* The Landing Platform (Mid-way) */}
      <mesh position={[0, STEP_COUNT * STEP_HEIGHT - 0.1, -1.5]}>
        <boxGeometry args={[3.2, 0.2, 2]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>

      {/* Flight 2: Landing to Next Floor */}
      {Array.from({ length: STEP_COUNT }).map((_, i) => (
        <mesh 
          key={`s2-${i}`} 
          position={[0.8, (STEP_COUNT * STEP_HEIGHT) + (i * STEP_HEIGHT), -1.5 + (i * STEP_DEPTH) + 1]}
        >
          <boxGeometry args={[STEP_WIDTH, STEP_HEIGHT, STEP_DEPTH]} />
          <meshStandardMaterial color="#95a5a6" />
        </mesh>
      ))}
    </group>
  )
}