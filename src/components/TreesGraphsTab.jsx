import { useState } from 'react'

function TreesGraphsTab() {
  const [expandedSections, setExpandedSections] = useState({
    terminology: false,
    types: false,
    traversal: false,
  })

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  // Sample binary tree structure
  const tree = {
    value: 'Mission\nControl',
    left: {
      value: 'Launch\nOperations',
      left: { value: 'Crew', left: null, right: null },
      right: { value: 'Fuel', left: null, right: null },
    },
    right: {
      value: 'Flight\nDynamics',
      left: { value: 'Navigation', left: null, right: null },
      right: { value: 'Telemetry', left: null, right: null },
    },
  }

  const TreeNode = ({ node, level = 0 }) => {
    if (!node) return null

    return (
      <div className="flex flex-col items-center">
        <div className="bg-gradient-to-br from-space-purple to-space-pink px-6 py-3 rounded-lg text-white font-bold text-center min-w-[100px] shadow-lg hover:scale-110 transition-transform whitespace-pre-line">
          {node.value}
        </div>

        {(node.left || node.right) && (
          <div className="flex items-start mt-4 space-x-8">
            <div className="flex flex-col items-center">
              {node.left && (
                <>
                  <div className="h-8 w-0.5 bg-space-cyan"></div>
                  <TreeNode node={node.left} level={level + 1} />
                </>
              )}
            </div>

            <div className="flex flex-col items-center">
              {node.right && (
                <>
                  <div className="h-8 w-0.5 bg-space-cyan"></div>
                  <TreeNode node={node.right} level={level + 1} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="card-space p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="text-6xl">🌌</div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3">Trees & Graphs</h2>
            <p className="text-lg mb-4 text-space-cyan">
              Trees are hierarchical structures like mission command chains.
              Graphs represent networks like satellite communication systems.
            </p>
            <div className="bg-space-dark/50 p-4 rounded-lg border border-space-cyan/30">
              <h3 className="font-semibold mb-2 text-space-pink">Space Example:</h3>
              <p>
                NASA organization chart (tree) vs. satellite network connections (graph).
                Each satellite can communicate with multiple others, forming a complex network.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="card-space p-6 text-white">
        <h3 className="text-xl font-bold mb-4 text-space-cyan">Key Points</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: '🌳', text: 'Tree: Hierarchical, no cycles' },
            { icon: '2️⃣', text: 'Binary tree: Max 2 children per node' },
            { icon: '🕸️', text: 'Graph: Nodes with edges' },
            { icon: '🗺️', text: 'Used for navigation systems' }
          ].map((point, idx) => (
            <div key={idx} className="flex items-center space-x-3 bg-space-dark/30 p-3 rounded-lg">
              <span className="text-2xl">{point.icon}</span>
              <span>{point.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Binary Tree Visualization */}
      <div className="card-space p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-space-cyan">Binary Tree Visualization</h3>
        <p className="mb-6">Example: Mission Control Hierarchy</p>

        <div className="overflow-x-auto pb-4">
          <div className="inline-block min-w-full">
            <TreeNode node={tree} />
          </div>
        </div>

        <div className="mt-6 text-sm text-space-cyan bg-space-dark/30 p-4 rounded-lg">
          <p><strong>Binary Tree Properties:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Each node has at most 2 children (left and right)</li>
            <li>Root node: Mission Control (top level)</li>
            <li>Leaf nodes: Crew, Fuel, Navigation, Telemetry (no children)</li>
            <li>Height: 2 (longest path from root to leaf)</li>
          </ul>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-4">
        {/* Terminology */}
        <div className="card-space overflow-hidden">
          <button
            onClick={() => toggleSection('terminology')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-space-purple/20 transition-colors"
          >
            <h3 className="text-xl font-bold text-white">Tree Terminology</h3>
            <span className="text-2xl text-space-cyan transform transition-transform duration-300" style={{ transform: expandedSections.terminology ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▼
            </span>
          </button>

          {expandedSections.terminology && (
            <div className="px-6 pb-6 text-white space-y-3">
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Root:</strong> The topmost node (Mission Control)
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Parent:</strong> Node with children (e.g., Launch Operations)
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Child:</strong> Node descended from another (e.g., Crew, Fuel)
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Leaf:</strong> Node with no children (end nodes)
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Height:</strong> Longest path from root to leaf
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Depth:</strong> Distance from root to a specific node
              </div>
            </div>
          )}
        </div>

        {/* Types */}
        <div className="card-space overflow-hidden">
          <button
            onClick={() => toggleSection('types')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-space-purple/20 transition-colors"
          >
            <h3 className="text-xl font-bold text-white">Types of Trees</h3>
            <span className="text-2xl text-space-cyan transform transition-transform duration-300" style={{ transform: expandedSections.types ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▼
            </span>
          </button>

          {expandedSections.types && (
            <div className="px-6 pb-6 text-white space-y-3">
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Binary Tree:</strong> Each node has at most 2 children
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Binary Search Tree (BST):</strong> Left child &lt; parent &lt; right child
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Balanced Tree:</strong> Height difference between subtrees ≤ 1
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Complete Binary Tree:</strong> All levels filled except possibly last
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Full Binary Tree:</strong> Every node has 0 or 2 children
              </div>
            </div>
          )}
        </div>

        {/* Traversal */}
        <div className="card-space overflow-hidden">
          <button
            onClick={() => toggleSection('traversal')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-space-purple/20 transition-colors"
          >
            <h3 className="text-xl font-bold text-white">Traversal Methods</h3>
            <span className="text-2xl text-space-cyan transform transition-transform duration-300" style={{ transform: expandedSections.traversal ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▼
            </span>
          </button>

          {expandedSections.traversal && (
            <div className="px-6 pb-6 text-white space-y-3">
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">In-Order (Left, Root, Right):</strong>
                <p className="mt-2 text-sm">Crew → Launch Ops → Fuel → Mission Control → Navigation → Flight Dynamics → Telemetry</p>
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Pre-Order (Root, Left, Right):</strong>
                <p className="mt-2 text-sm">Mission Control → Launch Ops → Crew → Fuel → Flight Dynamics → Navigation → Telemetry</p>
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Post-Order (Left, Right, Root):</strong>
                <p className="mt-2 text-sm">Crew → Fuel → Launch Ops → Navigation → Telemetry → Flight Dynamics → Mission Control</p>
              </div>
              <div className="bg-space-dark/30 p-4 rounded-lg">
                <strong className="text-space-cyan">Level-Order (Breadth-First):</strong>
                <p className="mt-2 text-sm">Mission Control → Launch Ops → Flight Dynamics → Crew → Fuel → Navigation → Telemetry</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TreesGraphsTab
