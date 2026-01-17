// Scene3D.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import Building from './mainbuilding/Building'
import PathVisualizer from './PathVisualizer'
import InteractiveNodes from './InteractiveNodes'

export default function Scene3D({ path, startNode, endNode, onNodeClick }) {
  return (
    <Canvas camera={{ position: [50, 60, 80], fov: 45 }}>
      {/* Lighting: Clean and Bright (No dark shadows) */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 5]} intensity={1} />
      <directionalLight position={[-10, 20, -5]} intensity={0.5} />
      
      <group position={[0, -10, 0]}>
        {/* The Building Structure */}
        <Building />

        {/* The Clickable Nodes */}
        <InteractiveNodes 
          onSelect={onNodeClick} 
          start={startNode} 
          end={endNode} 
        />

        {/* The Path Line */}
        <PathVisualizer path={path} />
      </group>

      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2.1} 
        maxDistance={200}
      />
    </Canvas>
  )
}