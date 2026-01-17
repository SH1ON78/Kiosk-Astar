// App.jsx
import React, { useState, useEffect } from 'react'
import Scene3D from './3js/Scene3D'
import { NODES, NODE_MAP } from './3js/nodes'
import { astar } from './3js/astar'

export default function App() {
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [path, setPath] = useState(null)

  // Recalculate path when start/end changes
  useEffect(() => {
    if (start && end) {
      const calculatedPath = astar(start, end)
      setPath(calculatedPath)
    } else {
      setPath(null)
    }
  }, [start, end])

  const handleNodeClick = (id) => {
    if (!start) setStart(id)
    else if (!end) setEnd(id)
    else {
      // Reset if they click a third time
      setStart(id)
      setEnd(null)
      setPath(null)
    }
  }

  const reset = () => {
    setStart(null)
    setEnd(null)
    setPath(null)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f0f2f5', position: 'relative' }}>
      
      {/* 3D Scene Container */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Scene3D 
          path={path}
          startNode={start} 
          endNode={end} 
          onNodeClick={handleNodeClick} 
        />
      </div>

      {/* Clean UI Overlay */}
      <div style={{ 
        position: 'absolute', top: 20, left: 20, 
        background: 'white', padding: '24px', borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: '280px',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ margin: '0 0 16px 0', fontSize: '1.5rem', color: '#1a1a1a' }}>Campus Map</h1>
        
        <div style={{ marginBottom: '20px', color: '#666', fontSize: '0.9rem' }}>
          {!start && "Tap a Green node to Start"}
          {start && !end && "Tap a Destination"}
          {start && end && "Path Calculated"}
        </div>

        {/* Status Indicators */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#2ecc71', marginRight: 10 }}/>
            Start: <strong>{start ? NODE_MAP[start]?.label : '...'}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#e74c3c', marginRight: 10 }}/>
            End: <strong>{end ? NODE_MAP[end]?.label : '...'}</strong>
          </div>
        </div>

        {/* Reset Button */}
        {start && (
          <button 
            onClick={reset}
            style={{
              marginTop: '20px', width: '100%', padding: '10px',
              background: '#34495e', color: 'white', border: 'none',
              borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
            }}
          >
            Clear Navigation
          </button>
        )}
      </div>
    </div>
  )
}