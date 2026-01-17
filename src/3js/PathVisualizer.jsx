// PathVisualizer.jsx
import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { NODE_MAP } from './nodes'

export default function PathVisualizer({ path }) {
  const materialRef = useRef()

  // Convert path IDs to Vector3 points
  const points = useMemo(() => {
    if (!path || path.length < 2) return null
    // Raise path slightly so it floats above floor
    return path.map(id => {
      const p = NODE_MAP[id].pos
      return new THREE.Vector3(p[0], p[1] + 0.5, p[2])
    })
  }, [path])

  // Create smooth curve
  const curve = useMemo(() => {
    if (!points) return null
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2)
  }, [points])

  // Animate the texture flowing
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.map.offset.x -= 0.02
    }
  })

  if (!points) return null

  return (
    <mesh castShadow receiveShadow>
      <tubeGeometry args={[curve, path.length * 8, 0.4, 8, false]} />
      <meshStandardMaterial 
        ref={materialRef}
        color="#00ff88" 
        emissive="#00ff88"
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      >
         {/* Simple texture for flow effect */}
         <canvasTexture 
            attach="map" 
            image={getFlowTexture()} 
            wrapS={THREE.RepeatWrapping} 
            wrapT={THREE.RepeatWrapping} 
            repeat={[1, 1]}
         />
      </meshStandardMaterial>
    </mesh>
  )
}

// Helper to generate a striped texture in memory
function getFlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 1
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 64, 0)
  gradient.addColorStop(0, '#ffffff')
  gradient.addColorStop(0.5, '#000000')
  gradient.addColorStop(1, '#ffffff')
  ctx.fillStyle = gradient
  ctx.fillRect(0,0,64,1)
  return canvas
}