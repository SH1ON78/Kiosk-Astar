// Scene3D.jsx
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Stars } from '@react-three/drei'
import * as THREE from 'three'
import Building from './Building' // We will refactor floors into this one file for cleanliness
import PathVisualizer from './PathVisualizer'
import InteractiveNodes from './InteractiveNodes'

export default function Scene3D({ path, startNode, endNode, onNodeClick }) {
  return (
    <Canvas shadows camera={{ position: [60, 50, 60], fov: 45 }}>
      {/* 1. Atmospheric Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[50, 80, 20]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
      />
      <Environment preset="city" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* 2. The Main Content */}
      <group position={[0, -10, 0]}>
        <Building />
        
        <InteractiveNodes 
          onSelect={onNodeClick} 
          start={startNode} 
          end={endNode} 
        />
        
        <PathVisualizer path={path} />
        
        {/* Ground Reflection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[500, 500]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* 3. Controls */}
      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2.2} // Prevent going under ground
        maxDistance={200}
      />
    </Canvas>
  )
}