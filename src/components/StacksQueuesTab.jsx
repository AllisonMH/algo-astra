import { useState } from 'react'

function StacksQueuesTab() {
  const [stack, setStack] = useState([])
  const [stackInput, setStackInput] = useState('')
  const [queue, setQueue] = useState([])
  const [queueInput, setQueueInput] = useState('')
  const [animation, setAnimation] = useState(null)

  const handlePush = () => {
    if (stackInput.trim()) {
      setAnimation('push')
      setStack([...stack, stackInput.trim()])
      setStackInput('')
      setTimeout(() => setAnimation(null), 500)
    }
  }

  const handlePop = () => {
    if (stack.length > 0) {
      setAnimation('pop')
      setStack(stack.slice(0, -1))
      setTimeout(() => setAnimation(null), 500)
    }
  }

  const handleEnqueue = () => {
    if (queueInput.trim()) {
      setAnimation('enqueue')
      setQueue([...queue, queueInput.trim()])
      setQueueInput('')
      setTimeout(() => setAnimation(null), 500)
    }
  }

  const handleDequeue = () => {
    if (queue.length > 0) {
      setAnimation('dequeue')
      setQueue(queue.slice(1))
      setTimeout(() => setAnimation(null), 500)
    }
  }

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="card-space p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="text-6xl">🚀</div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3">Stacks & Queues</h2>
            <p className="text-lg mb-4 text-space-cyan">
              Stacks follow LIFO (Last In, First Out) like stacking rocket stages.
              Queues follow FIFO (First In, First Out) like spacecraft in a launch queue.
            </p>
            <div className="bg-space-dark/50 p-4 rounded-lg border border-space-cyan/30">
              <h3 className="font-semibold mb-2 text-space-pink">Space Example:</h3>
              <p>
                <strong>Stack:</strong> Rocket stage separation - the top stage (last added) is the first to separate.
                <br />
                <strong>Queue:</strong> Mission control launch sequence - first spacecraft scheduled is first to launch.
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
            { icon: '📚', text: 'Stack: LIFO (Last In, First Out)' },
            { icon: '🎫', text: 'Queue: FIFO (First In, First Out)' },
            { icon: '⚡', text: 'O(1) push/pop operations' },
            { icon: '🔍', text: 'Used in DFS and BFS algorithms' }
          ].map((point, idx) => (
            <div key={idx} className="flex items-center space-x-3 bg-space-dark/30 p-3 rounded-lg">
              <span className="text-2xl">{point.icon}</span>
              <span>{point.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack Visualizer */}
      <div className="card-space p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-space-cyan">Stack (LIFO) - Rocket Stages</h3>
        <p className="mb-4">Push and pop elements like rocket stages separating:</p>

        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePush()}
            placeholder="Enter rocket stage name"
            className="flex-1 px-4 py-2 bg-space-dark/50 border border-space-cyan/30 rounded-lg text-white placeholder-space-cyan/50 focus:outline-none focus:border-space-cyan"
          />
          <button onClick={handlePush} className="btn-space">
            Push
          </button>
          <button
            onClick={handlePop}
            disabled={stack.length === 0}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pop
          </button>
        </div>

        <div className="min-h-[200px] flex flex-col-reverse items-center space-y-reverse space-y-2 p-4 bg-space-dark/30 rounded-lg">
          {stack.length === 0 ? (
            <div className="text-space-cyan/50 text-center py-8">Stack is empty</div>
          ) : (
            stack.map((item, index) => (
              <div
                key={index}
                className={`w-64 bg-gradient-to-r from-space-purple to-space-pink p-4 rounded-lg text-center font-bold shadow-lg transform transition-all duration-500 ${
                  animation === 'push' && index === stack.length - 1
                    ? 'scale-110 animate-bounce'
                    : animation === 'pop' && index === stack.length - 1
                    ? 'opacity-0 scale-50'
                    : ''
                }`}
              >
                {item}
                {index === stack.length - 1 && <div className="text-xs text-space-cyan mt-1">← Top</div>}
              </div>
            ))
          )}
        </div>

        <div className="text-sm text-space-cyan mt-4">
          Stack Size: {stack.length} | Top Element: {stack[stack.length - 1] || 'None'}
        </div>
      </div>

      {/* Queue Visualizer */}
      <div className="card-space p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-space-cyan">Queue (FIFO) - Launch Sequence</h3>
        <p className="mb-4">Enqueue and dequeue spacecraft in launch order:</p>

        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={queueInput}
            onChange={(e) => setQueueInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleEnqueue()}
            placeholder="Enter spacecraft name"
            className="flex-1 px-4 py-2 bg-space-dark/50 border border-space-cyan/30 rounded-lg text-white placeholder-space-cyan/50 focus:outline-none focus:border-space-cyan"
          />
          <button onClick={handleEnqueue} className="btn-space">
            Enqueue
          </button>
          <button
            onClick={handleDequeue}
            disabled={queue.length === 0}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Dequeue
          </button>
        </div>

        <div className="min-h-[120px] flex items-center overflow-x-auto p-4 bg-space-dark/30 rounded-lg space-x-2">
          {queue.length === 0 ? (
            <div className="text-space-cyan/50 text-center w-full py-8">Queue is empty</div>
          ) : (
            <>
              <div className="text-space-cyan text-sm whitespace-nowrap">Front →</div>
              {queue.map((item, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r from-space-blue to-space-purple p-4 rounded-lg text-center font-bold min-w-[120px] shadow-lg transform transition-all duration-500 ${
                    animation === 'enqueue' && index === queue.length - 1
                      ? 'scale-110 animate-bounce'
                      : animation === 'dequeue' && index === 0
                      ? 'opacity-0 scale-50'
                      : ''
                  }`}
                >
                  {item}
                </div>
              ))}
              <div className="text-space-cyan text-sm whitespace-nowrap">← Rear</div>
            </>
          )}
        </div>

        <div className="text-sm text-space-cyan mt-4">
          Queue Size: {queue.length} | Front: {queue[0] || 'None'} | Rear: {queue[queue.length - 1] || 'None'}
        </div>
      </div>
    </div>
  )
}

export default StacksQueuesTab
