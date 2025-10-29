import { useState, useEffect } from 'react'

function SortingTab() {
  const [selectedAlgo, setSelectedAlgo] = useState('bubble')
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90])
  const [sorting, setSorting] = useState(false)
  const [currentIndices, setCurrentIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  const [progress, setProgress] = useState(0)
  const [expandedCode, setExpandedCode] = useState(null)

  const algorithms = [
    { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)' },
    { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)' },
    { id: 'merge', name: 'Merge Sort', complexity: 'O(n log n)' },
    { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)' },
  ]

  const codeExamples = {
    bubble: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    quick: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    merge: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    insertion: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }
  return arr;
}`
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const bubbleSort = async () => {
    const arr = [...array]
    const n = arr.length
    let totalSteps = (n * (n - 1)) / 2
    let currentStep = 0

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentIndices([j, j + 1])
        await sleep(300)

        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
        }

        currentStep++
        setProgress((currentStep / totalSteps) * 100)
      }
      setSortedIndices(prev => [...prev, n - 1 - i])
    }
    setSortedIndices(prev => [...prev, 0])
  }

  const quickSortHelper = async (arr, low, high, totalSteps) => {
    if (low < high) {
      const pi = await partition(arr, low, high, totalSteps)
      await quickSortHelper(arr, low, pi - 1, totalSteps)
      await quickSortHelper(arr, pi + 1, high, totalSteps)
    }
  }

  const partition = async (arr, low, high, totalSteps) => {
    const pivot = arr[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      setCurrentIndices([j, high])
      await sleep(300)

      if (arr[j] < pivot) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        setArray([...arr])
      }
      setProgress(prev => Math.min(prev + 100 / totalSteps.value, 100))
    }

    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    setArray([...arr])
    setSortedIndices(prev => [...prev, i + 1])

    return i + 1
  }

  const quickSort = async () => {
    const arr = [...array]
    const totalSteps = { value: arr.length * Math.log2(arr.length) }
    await quickSortHelper(arr, 0, arr.length - 1, totalSteps)
    setSortedIndices([...Array(arr.length).keys()])
  }

  const startSort = async () => {
    setSorting(true)
    setCurrentIndices([])
    setSortedIndices([])
    setProgress(0)

    if (selectedAlgo === 'bubble') {
      await bubbleSort()
    } else if (selectedAlgo === 'quick') {
      await quickSort()
    }

    setCurrentIndices([])
    setProgress(100)
    setSorting(false)
  }

  const resetArray = () => {
    setArray([64, 34, 25, 12, 22, 11, 90])
    setCurrentIndices([])
    setSortedIndices([])
    setProgress(0)
  }

  const randomizeArray = () => {
    const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setCurrentIndices([])
    setSortedIndices([])
    setProgress(0)
  }

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="card-space p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="text-6xl">⭐</div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3">Sorting Algorithms</h2>
            <p className="text-lg mb-4 text-space-cyan">
              Sorting algorithms organize data efficiently, like arranging spacecraft by launch date
              or planets by distance from the sun.
            </p>
            <div className="bg-space-dark/50 p-4 rounded-lg border border-space-cyan/30">
              <h3 className="font-semibold mb-2 text-space-pink">Space Example:</h3>
              <p>
                Sorting planets by distance from sun: Mercury, Venus, Earth, Mars...
                Each algorithm takes a different approach, some faster for nearly-sorted data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Selection */}
      <div className="card-space p-6 text-white">
        <h3 className="text-xl font-bold mb-4 text-space-cyan">Select Algorithm</h3>
        <div className="flex flex-wrap gap-3">
          {algorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => setSelectedAlgo(algo.id)}
              disabled={sorting}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedAlgo === algo.id
                  ? 'bg-gradient-to-r from-space-purple to-space-pink text-white shadow-lg scale-105'
                  : 'bg-space-dark/50 text-space-cyan border border-space-cyan/30 hover:bg-space-blue/30'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div>{algo.name}</div>
              <div className="text-xs opacity-75">{algo.complexity}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Sorting Visualization */}
      <div className="card-space p-6 text-white">
        <h3 className="text-2xl font-bold mb-4 text-space-cyan">Interactive Sorting Simulation</h3>

        <div className="flex space-x-3 mb-6">
          <button
            onClick={startSort}
            disabled={sorting}
            className="btn-space disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sorting ? 'Sorting...' : 'Start Sort'}
          </button>
          <button
            onClick={resetArray}
            disabled={sorting}
            className="bg-space-blue/50 text-white px-6 py-2 rounded-lg font-semibold hover:bg-space-blue/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
          <button
            onClick={randomizeArray}
            disabled={sorting}
            className="bg-space-dark/50 border border-space-cyan/30 text-space-cyan px-6 py-2 rounded-lg font-semibold hover:bg-space-blue/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Randomize
          </button>
        </div>

        {/* Progress Bar */}
        {sorting && (
          <div className="mb-6">
            <div className="bg-space-dark/50 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-space-purple to-space-pink h-full transition-all duration-300 flex items-center justify-center text-xs font-bold"
                style={{ width: `${progress}%` }}
              >
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        )}

        {/* Array Visualization */}
        <div className="flex items-end justify-center space-x-2 h-64 bg-space-dark/30 p-4 rounded-lg">
          {array.map((value, index) => (
            <div key={index} className="flex flex-col items-center justify-end flex-1">
              <div className="text-xs text-space-cyan mb-1">{value}</div>
              <div
                className={`w-full transition-all duration-300 rounded-t-lg ${
                  sortedIndices.includes(index)
                    ? 'bg-gradient-to-t from-green-500 to-green-300'
                    : currentIndices.includes(index)
                    ? 'bg-gradient-to-t from-red-500 to-red-300'
                    : 'bg-gradient-to-t from-space-purple to-space-pink'
                }`}
                style={{ height: `${(value / Math.max(...array)) * 100}%` }}
              ></div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-space-cyan flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-space-purple to-space-pink rounded"></div>
            <span>Unsorted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-red-500 to-red-300 rounded"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-green-500 to-green-300 rounded"></div>
            <span>Sorted</span>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="space-y-3">
        {algorithms.map((algo) => (
          <div key={algo.id} className="card-space overflow-hidden">
            <button
              onClick={() => setExpandedCode(expandedCode === algo.id ? null : algo.id)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-space-purple/20 transition-colors"
            >
              <div>
                <h3 className="text-xl font-bold text-white">{algo.name} - Code Example</h3>
                <p className="text-sm text-space-cyan mt-1">Time Complexity: {algo.complexity}</p>
              </div>
              <span
                className="text-2xl text-space-cyan transform transition-transform duration-300"
                style={{ transform: expandedCode === algo.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                ▼
              </span>
            </button>

            {expandedCode === algo.id && (
              <div className="px-6 pb-6">
                <pre className="bg-space-dark/50 p-4 rounded-lg overflow-x-auto text-sm text-white border border-space-cyan/30">
                  <code>{codeExamples[algo.id]}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SortingTab
