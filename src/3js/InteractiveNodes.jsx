// InteractiveNodes.jsx
import React, { useState } from 'react'
import { Html } from '@react-three/drei'
import { NODES } from './nodes'

export default function InteractiveNodes({ onSelect, start, end }) {
  const [hovered, setHover] = useState(null)

  return (
    <group>
      {NODES.map((n) => {
        const isStart = n.id === start
        const isEnd = n.id === end
        const isHover = n.id === hovered

        // Simple Color Logic
        let color = '#ccc' // Default grey
        if (isHover) color = '#f1c40f' // Yellow hover
        if (isStart) color = '#2ecc71' // Green
        if (isEnd) color = '#e74c3c'   // Red

        // Only show label if relevant
        const showLabel = isStart || isEnd || isHover

        return (
          <group key={n.id} position={n.pos}>
            <mesh 
              onClick={(e) => { e.stopPropagation(); onSelect(n.id) }}
              onPointerOver={() => setHover(n.id)}
              onPointerOut={() => setHover(null)}
            >
              {/* Simple Sphere */}
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>

            {showLabel && (
              <Html distanceFactor={10}>
                <div style={{ 
                  background: 'rgba(0,0,0,0.7)', color: 'white', 
                  padding: '4px 8px', borderRadius: '4px', 
                  pointerEvents: 'none', whiteSpace: 'nowrap' 
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