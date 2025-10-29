import { useState } from 'react'

function BigOTab() {
  const complexities = [
    {
      notation: 'O(1)',
      name: 'Constant',
      color: 'from-green-500 to-green-300',
      description: 'Same time regardless of input size',
      example: 'Accessing array element by index, Hash table lookup',
      spaceExample: 'Accessing a specific satellite by ID number',
    },
    {
      notation: 'O(log n)',
      name: 'Logarithmic',
      color: 'from-blue-500 to-blue-300',
      description: 'Time increases logarithmically',
      example: 'Binary search in sorted array',
      spaceExample: 'Finding a star in a sorted catalog using binary search',
    },
    {
      notation: 'O(n)',
      name: 'Linear',
      color: 'from-yellow-500 to-yellow-300',
      description: 'Time proportional to input size',
      example: 'Linear search, Iterating through array',
      spaceExample: 'Checking each planet in the solar system one by one',
    },
    {
      notation: 'O(n log n)',
      name: 'Linearithmic',
      color: 'from-orange-500 to-orange-300',
      description: 'Efficient sorting algorithms',
      example: 'Merge Sort, Quick Sort (average case)',
      spaceExample: 'Efficiently sorting millions of star coordinates',
    },
    {
      notation: 'O(n²)',
      name: 'Quadratic',
      color: 'from-red-500 to-red-300',
      description: 'Time increases quadratically',
      example: 'Bubble Sort, Selection Sort, Nested loops',
      spaceExample: 'Comparing every planet with every other planet',
    },
    {
      notation: 'O(2ⁿ)',
      name: 'Exponential',
      color: 'from-purple-500 to-purple-300',
      description: 'Doubles with each addition to input',
      example: 'Recursive Fibonacci, Subset generation',
      spaceExample: 'Calculating all possible trajectories for n waypoints',
    },
  ]

  const [selectedComplexity, setSelectedComplexity] = useState(null)

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="card-space p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="text-6xl">📊</div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3">Big O Notation</h2>
            <p className="text-lg mb-4 text-space-cyan">
              Big O measures algorithm efficiency like measuring fuel consumption for space missions.
              It describes how performance scales with input size.
            </p>
            <div className="bg-space-dark/50 p-4 rounded-lg border border-space-cyan/30">
              <h3 className="font-semibold mb-2 text-space-pink">Space Example:</h3>
              <p>
                Finding a specific star: O(1) if you know coordinates, O(n) if you search sequentially,
                O(log n) if you use binary search of sorted catalog.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="card-space p-6 text-white">
        <h3 className="text-xl font-bold mb-4 text-space-cyan">Key Concepts</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: '📈', text: 'Describes algorithm efficiency' },
            { icon: '🎯', text: 'Focuses on worst-case scenario' },
            { icon: '🔢', text: 'Ignores constants and lower terms' },
            { icon: '⚖️', text: 'Helps compare algorithms' }
          ].map((point, idx) => (
            <div key={idx} className="flex items-center space-x-3 bg-space-dark/30 p-3 rounded-lg">
              <span className="text-2xl">{point.icon}</span>
              <span>{point.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Complexity Chart */}
      <div className="card-space p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-space-cyan">Time Complexity Comparison</h3>
        <p className="mb-6 text-sm">Lower on the chart = more efficient (click for details)</p>

        <div className="space-y-2">
          {complexities.map((complexity, index) => (
            <div
              key={index}
              onClick={() => setSelectedComplexity(selectedComplexity === index ? null : index)}
              className="cursor-pointer transform transition-all duration-200 hover:scale-102"
            >
              <div className={`bg-gradient-to-r ${complexity.color} p-4 rounded-lg flex items-center justify-between`}>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg font-bold text-lg">
                    {complexity.notation}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{complexity.name}</div>
                    <div className="text-sm opacity-90">{complexity.description}</div>
                  </div>
                </div>
                <span className="text-2xl transform transition-transform duration-300" style={{ transform: selectedComplexity === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
              </div>

              {selectedComplexity === index && (
                <div className="bg-space-dark/50 border-l-4 border-r-4 border-b-4 rounded-b-lg p-4 mt-[-8px]" style={{ borderColor: complexity.color.split(' ')[0].replace('from-', '') }}>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-space-cyan">Examples:</strong>
                      <p className="mt-1">{complexity.example}</p>
                    </div>
                    <div>
                      <strong className="text-space-pink">Space Mission Analogy:</strong>
                      <p className="mt-1">{complexity.spaceExample}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Growth Visualization */}
      <div className="card-space p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-space-cyan">Growth Rate Visualization</h3>
        <p className="mb-6 text-sm">How different complexities scale with input size (n)</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-space-dark/50">
                <th className="p-3 text-left">Complexity</th>
                <th className="p-3 text-right">n=10</th>
                <th className="p-3 text-right">n=100</th>
                <th className="p-3 text-right">n=1,000</th>
                <th className="p-3 text-right">n=10,000</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-space-cyan/20">
                <td className="p-3 font-bold">O(1)</td>
                <td className="p-3 text-right">1</td>
                <td className="p-3 text-right">1</td>
                <td className="p-3 text-right">1</td>
                <td className="p-3 text-right">1</td>
              </tr>
              <tr className="border-t border-space-cyan/20 bg-space-dark/20">
                <td className="p-3 font-bold">O(log n)</td>
                <td className="p-3 text-right">3</td>
                <td className="p-3 text-right">7</td>
                <td className="p-3 text-right">10</td>
                <td className="p-3 text-right">13</td>
              </tr>
              <tr className="border-t border-space-cyan/20">
                <td className="p-3 font-bold">O(n)</td>
                <td className="p-3 text-right">10</td>
                <td className="p-3 text-right">100</td>
                <td className="p-3 text-right">1,000</td>
                <td className="p-3 text-right">10,000</td>
              </tr>
              <tr className="border-t border-space-cyan/20 bg-space-dark/20">
                <td className="p-3 font-bold">O(n log n)</td>
                <td className="p-3 text-right">30</td>
                <td className="p-3 text-right">664</td>
                <td className="p-3 text-right">9,966</td>
                <td className="p-3 text-right">132,877</td>
              </tr>
              <tr className="border-t border-space-cyan/20">
                <td className="p-3 font-bold">O(n²)</td>
                <td className="p-3 text-right">100</td>
                <td className="p-3 text-right">10,000</td>
                <td className="p-3 text-right">1,000,000</td>
                <td className="p-3 text-right">100,000,000</td>
              </tr>
              <tr className="border-t border-space-cyan/20 bg-space-dark/20">
                <td className="p-3 font-bold">O(2ⁿ)</td>
                <td className="p-3 text-right">1,024</td>
                <td className="p-3 text-right">1.26×10³⁰</td>
                <td className="p-3 text-right text-red-400">Too large!</td>
                <td className="p-3 text-right text-red-400">Too large!</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-space-dark/30 rounded-lg text-sm text-space-cyan">
          <strong>Note:</strong> Even small increases in input size can dramatically affect performance
          for algorithms with higher complexity. Always strive for the most efficient solution!
        </div>
      </div>

      {/* Rules of Thumb */}
      <div className="card-space p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-space-cyan">Big O Rules of Thumb</h3>
        <div className="space-y-4">
          <div className="bg-space-dark/30 p-4 rounded-lg">
            <strong className="text-space-pink">1. Drop Constants:</strong>
            <p className="mt-2">O(2n) → O(n), O(5) → O(1)</p>
          </div>
          <div className="bg-space-dark/30 p-4 rounded-lg">
            <strong className="text-space-pink">2. Drop Lower Order Terms:</strong>
            <p className="mt-2">O(n² + n) → O(n²), O(n + log n) → O(n)</p>
          </div>
          <div className="bg-space-dark/30 p-4 rounded-lg">
            <strong className="text-space-pink">3. Different Inputs = Different Variables:</strong>
            <p className="mt-2">Two arrays? O(a + b) or O(a × b), not O(n)</p>
          </div>
          <div className="bg-space-dark/30 p-4 rounded-lg">
            <strong className="text-space-pink">4. Worst Case:</strong>
            <p className="mt-2">Usually focus on worst-case scenario unless specified</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BigOTab
