import { useState } from 'react'

function ArraysTab() {
  const [arrayInput, setArrayInput] = useState('')
  const [arrayElements, setArrayElements] = useState([])
  const [linkedList, setLinkedList] = useState([])
  const [newNodeValue, setNewNodeValue] = useState('')

  const handleArrayVisualize = () => {
    const elements = arrayInput.split(',').map(item => item.trim()).filter(item => item)
    setArrayElements(elements)
  }

  const handleAddNode = () => {
    if (newNodeValue.trim()) {
      setLinkedList([...linkedList, { value: newNodeValue.trim(), id: Date.now() }])
      setNewNodeValue('')
    }
  }

  const handleRemoveNode = (id) => {
    setLinkedList(linkedList.filter(node => node.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="card-space p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="text-6xl">🛸</div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3">Arrays & Lists</h2>
            <p className="text-lg mb-4 text-space-cyan">
              Arrays are like spacecraft hangars - they store multiple items in a sequential, indexed order.
              Each hangar bay (index) holds one spacecraft (element).
            </p>
            <div className="bg-space-dark/50 p-4 rounded-lg border border-space-cyan/30">
              <h3 className="font-semibold mb-2 text-space-pink">Space Example:</h3>
              <p>
                Think of the International Space Station modules arranged in a line. Each module has a
                specific position, and you can access any module directly by knowing its position number.
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
            { icon: '📍', text: 'Fixed or dynamic size collection' },
            { icon: '0️⃣', text: 'Zero-based indexing' },
            { icon: '⚡', text: 'O(1) access time by index' },
            { icon: '🔄', text: 'O(n) insertion/deletion in middle' }
          ].map((point, idx) => (
            <div key={idx} className="flex items-center space-x-3 bg-space-dark/30 p-3 rounded-lg">
              <span className="text-2xl">{point.icon}</span>
              <span>{point.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Array Visualizer */}
      <div className="card-space p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-space-cyan">Interactive Array Visualizer</h3>
        <p className="mb-4">Type comma-separated values to visualize an array:</p>

        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            placeholder="e.g., Mercury, Venus, Earth, Mars"
            className="flex-1 px-4 py-2 bg-space-dark/50 border border-space-cyan/30 rounded-lg text-white placeholder-space-cyan/50 focus:outline-none focus:border-space-cyan"
          />
          <button onClick={handleArrayVisualize} className="btn-space">
            Visualize
          </button>
        </div>

        {arrayElements.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {arrayElements.map((element, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-space-purple to-space-pink p-4 rounded-lg min-w-[100px] text-center transform transition-all hover:scale-110 hover:shadow-xl"
                >
                  <div className="text-xs text-space-cyan mb-1">Index: {index}</div>
                  <div className="font-bold text-lg">{element}</div>
                  <div className="absolute -top-2 -right-2 bg-space-cyan text-space-dark rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {index}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm text-space-cyan">
              Array Length: {arrayElements.length} | Access Time: O(1)
            </div>
          </div>
        )}
      </div>

      {/* Linked List Builder */}
      <div className="card-space p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-space-cyan">Dynamic Linked List Builder</h3>
        <p className="mb-4">Build a linked list where each node points to the next:</p>

        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={newNodeValue}
            onChange={(e) => setNewNodeValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddNode()}
            placeholder="Enter satellite name"
            className="flex-1 px-4 py-2 bg-space-dark/50 border border-space-cyan/30 rounded-lg text-white placeholder-space-cyan/50 focus:outline-none focus:border-space-cyan"
          />
          <button onClick={handleAddNode} className="btn-space">
            Add Node
          </button>
        </div>

        {linkedList.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center overflow-x-auto pb-4">
              {linkedList.map((node, index) => (
                <div key={node.id} className="flex items-center">
                  <div className="group relative bg-gradient-to-br from-space-blue to-space-purple p-4 rounded-lg min-w-[120px] text-center transform transition-all hover:scale-105">
                    <div className="font-bold">{node.value}</div>
                    <button
                      onClick={() => handleRemoveNode(node.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                  {index < linkedList.length - 1 && (
                    <div className="text-space-cyan text-2xl px-2">→</div>
                  )}
                  {index === linkedList.length - 1 && (
                    <div className="text-space-cyan/50 text-2xl px-2">→ null</div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-space-cyan">
              Nodes: {linkedList.length} | Insertion at end: O(n) | Deletion: O(n)
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArraysTab
