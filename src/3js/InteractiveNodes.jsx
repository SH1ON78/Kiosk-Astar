// InteractiveNodes.jsx
import React, { useState } from 'react'
import { Html } from '@react-three/drei'
import { NODES } from './nodes'

export default function InteractiveNodes({ onSelect, start, end }) {
  const [hovered, setHovered] = useState(null)

  return (
    <group>
      {NODES.map((n) => {
        // Determine Color based on state
        const isStart = n.id === start
        const isEnd = n.id === end
        const isHover = n.id === hovered
        
        let color = '#bdc3c7' // Default Gray (Hallway)
        if (n.type === 'entrance' || n.type === 'door') color = '#27ae60'
        if (n.type === 'stairs') color = '#c0392b'
        if (n.type === 'room' || n.type === 'gym') color = '#e67e22'
        
        if (isStart) color = '#2ecc71' // Bright Green
        if (isEnd) color = '#e74c3c'   // Bright Red

        const scale = isStart || isEnd || isHover ? 1.5 : 1

        return (
          <group key={n.id} position={n.pos}>
            {/* Clickable Sphere */}
            <mesh 
              onClick={(e) => { e.stopPropagation(); onSelect(n.id); }}
              onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(n.id); }}
              onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(null); }}
              scale={[scale, scale, scale]}
            >
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial 
                color={color} 
                emissive={color} 
                emissiveIntensity={isHover ? 0.8 : 0.2} 
              />
            </mesh>

            {/* Label (Only show if start, end, or hovered) */}
            {(isStart || isEnd || isHover) && (
              <Html distanceFactor={15} position={[0, 1, 0]}>
                <div style={{
                  background: 'rgba(0,0,0,0.8)', color: 'white', 
                  padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap',
                  fontSize: '12px', pointerEvents: 'none'
                }}>
                  {n.label || n.id}
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </group>
  )
}