// PathVisualizer.jsx
import React, { useMemo } from 'react'
import * as THREE from 'three'
import { NODE_MAP } from './mainbuilding/components/nodes'

export default function PathVisualizer({ path }) {
  const points = useMemo(() => {
    if (!path || path.length < 2) return null
    return path.map(id => {
      const p = NODE_MAP[id].pos
      // Lift the line slightly above the floor (0.2 is floor node height, so 0.5 is safe)
      return new THREE.Vector3(p[0], p[1] + 0.3, p[2])
    })
  }, [path])

  const curve = useMemo(() => {
    if (!points) return null
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.1)
  }, [points])

  if (!points) return null

  return (
    <mesh>
      {/* 0.3 radius for a nice visible "Pipe" */}
      <tubeGeometry args={[curve, path.length * 10, 0.3, 8, false]} />
      <meshStandardMaterial color="#3498db" />
    </mesh>
  )
}