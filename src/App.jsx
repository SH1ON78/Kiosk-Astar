// App.jsx
import React, { useState, useMemo, useEffect } from 'react'
import Scene3D from './3js/Scene3D'
import { NODES, NODE_MAP } from './3js/nodes'
import { astar } from './3js/astar'

export default function App() {
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [path, setPath] = useState(null)

  // Calculate path whenever start or end changes
  useEffect(() => {
    if (start && end) {
      const calculatedPath = astar(start, end)
      setPath(calculatedPath)
    } else {
      setPath(null)
    }
  }, [start, end])

  const handleNodeSelect = (nodeId) => {
    if (!start) {
      setStart(nodeId)
    } else if (!end) {
      if (nodeId === start) {
        setStart(null) // Deselect
      } else {
        setEnd(nodeId)
      }
    } else {
      // Reset and start new path
      setStart(nodeId)
      setEnd(null)
      setPath(null)
    }
  }

  const getInstructions = () => {
    if (!start) return "Select a START point (Green/Orange nodes)"
    if (!end) return "Select a DESTINATION"
    return `Navigating: ${NODE_MAP[start]?.label} ➜ ${NODE_MAP[end]?.label}`
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      {/* UI Overlay */}
      <div style={{
        position: 'absolute', top: 20, left: 20, zIndex: 10,
        background: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)', width: '300px',
        fontFamily: "'Inter', sans-serif"
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#2c3e50' }}>Campus Navigator</h2>
        
        <div style={{ 
          background: start && end ? '#e8f5e9' : '#fff3e0', 
          padding: '10px', borderRadius: '6px', marginBottom: '15px',
          borderLeft: '4px solid', borderColor: start && end ? '#27ae60' : '#f39c12',
          fontWeight: '600', color: '#444'
        }}>
          {getInstructions()}
        </div>

        {start && (
          <button 
            onClick={() => { setStart(null); setEnd(null); setPath(null); }}
            style={{
              width: '100%', padding: '8px', background: '#e74c3c', color: 'white',
              border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            Reset Path
          </button>
        )}

        <div style={{ marginTop: 20, fontSize: '0.85rem', color: '#666' }}>
          <div style={{display:'flex', alignItems:'center', marginBottom:4}}><span style={{width:10, height:10, borderRadius:'50%', background:'#27ae60', marginRight:8}}/> Entrances / Exits</div>
          <div style={{display:'flex', alignItems:'center', marginBottom:4}}><span style={{width:10, height:10, borderRadius:'50%', background:'#e67e22', marginRight:8}}/> Rooms / Gyms</div>
          <div style={{display:'flex', alignItems:'center', marginBottom:4}}><span style={{width:10, height:10, borderRadius:'50%', background:'#3498db', marginRight:8}}/> Hallway Nodes</div>
        </div>
      </div>

      {/* The 3D Scene Caller */}
      <Scene3D 
        path={path} 
        startNode={start} 
        endNode={end} 
        onNodeClick={handleNodeSelect} 
      />
    </div>
  )
}