// InteractiveNodes.jsx
import React, { useState } from 'react'
import { Html } from '@react-three/drei'
import { NODES } from './mainbuilding/components/nodes' // Ensure this path is correct relative to this file

export default function InteractiveNodes({ onSelect, start, end }) {
  const [hovered, setHover] = useState(null)

  if (!NODES) return null; // Safety guard against white screen crash

  return (
    <group>
      {NODES.map((n) => {
        const isStart = n.id === start
        const isEnd = n.id === end
        const isHover = n.id === hovered
        let color = isStart ? '#2ecc71' : isEnd ? '#e74c3c' : isHover ? '#f1c40f' : '#ccc';

        return (
          <group key={n.id} position={n.pos}>
            <mesh 
              onClick={(e) => { e.stopPropagation(); onSelect(n.id); }}
              onPointerOver={(e) => { e.stopPropagation(); setHover(n.id); }}
              onPointerOut={() => setHover(null)}
            >
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color={color} emissive={isHover ? color : 'black'} emissiveIntensity={0.5} />
            </mesh>
            {(isStart || isEnd || isHover) && (
              <Html distanceFactor={15}>
                <div style={{ background: 'black', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '10px' }}>
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