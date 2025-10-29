export const quizData = {
  arrays: {
    title: 'Arrays & Lists Quiz',
    topic: 'arrays',
    questions: [
      {
        id: 1,
        question: 'If the International Space Station has 16 modules in an array, what index would the last module have?',
        options: ['16', '15', '0', '17'],
        correctAnswer: 1,
        explanation: 'Arrays use zero-based indexing, so 16 modules would have indices 0-15.'
      },
      {
        id: 2,
        question: 'What is the time complexity of accessing a spacecraft at a specific hangar position in an array?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Array access by index is O(1) - constant time, regardless of array size.'
      },
      {
        id: 3,
        question: 'A linked list of satellites is best described as:',
        options: [
          'Each satellite knows only its own position',
          'Each satellite points to the next satellite in orbit',
          'All satellites are stored in consecutive memory',
          'Satellites cannot be added or removed'
        ],
        correctAnswer: 1,
        explanation: 'In a linked list, each node (satellite) contains a reference to the next node.'
      },
      {
        id: 4,
        question: 'What is the main advantage of a dynamic array over a fixed-size array for storing mission data?',
        options: [
          'Faster access time',
          'Uses less memory',
          'Can grow or shrink as needed',
          'Better for sorting'
        ],
        correctAnswer: 2,
        explanation: 'Dynamic arrays can resize automatically, making them flexible for varying amounts of data.'
      },
      {
        id: 5,
        question: 'In a doubly linked list of orbital maneuvers, each node contains:',
        options: [
          'Only data',
          'Data and one pointer',
          'Data and two pointers (next and previous)',
          'Data and an array index'
        ],
        correctAnswer: 2,
        explanation: 'Doubly linked lists have pointers to both the next and previous nodes.'
      }
    ]
  },
  stacks: {
    title: 'Stacks & Queues Quiz',
    topic: 'stacks',
    questions: [
      {
        id: 1,
        question: 'Rocket stages separate in LIFO order. If stages are pushed as [1st, 2nd, 3rd], which separates first?',
        options: ['1st stage', '2nd stage', '3rd stage', 'All at once'],
        correctAnswer: 2,
        explanation: 'LIFO (Last In, First Out) means the 3rd stage pushed is the first to pop/separate.'
      },
      {
        id: 2,
        question: 'Spacecraft in a launch queue follow which principle?',
        options: ['LIFO', 'FIFO', 'Random', 'Priority-based only'],
        correctAnswer: 1,
        explanation: 'Queues follow FIFO (First In, First Out) - first scheduled, first launched.'
      },
      {
        id: 3,
        question: 'What is the time complexity of push and pop operations on a stack?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Stack push and pop operations are O(1) - constant time.'
      },
      {
        id: 4,
        question: 'Which data structure would be best for implementing an undo feature in mission planning software?',
        options: ['Queue', 'Array', 'Stack', 'Graph'],
        correctAnswer: 2,
        explanation: 'Stack is perfect for undo - the last action (most recent) is undone first.'
      },
      {
        id: 5,
        question: 'In a circular queue of satellite positions with 5 slots, after enqueueing 6 items and dequeueing 3, how many items remain?',
        options: ['2', '3', '5', '6'],
        correctAnswer: 1,
        explanation: 'Circular queue wraps around. Added 6, removed 3: 6 - 3 = 3 items remain.'
      }
    ]
  },
  trees: {
    title: 'Trees & Graphs Quiz',
    topic: 'trees',
    questions: [
      {
        id: 1,
        question: 'In a binary tree representing a mission hierarchy, each node can have maximum how many children?',
        options: ['1', '2', '3', 'Unlimited'],
        correctAnswer: 1,
        explanation: 'Binary trees have at most 2 children per node (left and right).'
      },
      {
        id: 2,
        question: 'A satellite communication network where each satellite can connect to multiple others is best represented as:',
        options: ['Array', 'Stack', 'Tree', 'Graph'],
        correctAnswer: 3,
        explanation: 'Graphs represent networks with multiple connections between nodes.'
      },
      {
        id: 3,
        question: 'In a binary search tree of planet distances from the Sun, where would you find Mars if the root is Earth?',
        options: ['Left subtree', 'Right subtree', 'At root', 'Not possible'],
        correctAnswer: 1,
        explanation: 'Mars is farther from the Sun than Earth, so in a BST it goes right (greater values).'
      },
      {
        id: 4,
        question: 'What traversal method visits nodes level by level, like scanning space sectors systematically?',
        options: ['Depth-first', 'Breadth-first', 'In-order', 'Post-order'],
        correctAnswer: 1,
        explanation: 'Breadth-first (BFS) traversal visits all nodes at each level before moving deeper.'
      },
      {
        id: 5,
        question: 'The height of a balanced binary tree with 15 nodes is approximately:',
        options: ['2', '3', '4', '15'],
        correctAnswer: 2,
        explanation: 'Height ≈ log₂(n+1) - 1. For 15 nodes: log₂(16) - 1 = 4 - 1 = 3.'
      }
    ]
  },
  sorting: {
    title: 'Sorting Algorithms Quiz',
    topic: 'sorting',
    questions: [
      {
        id: 1,
        question: 'Which sorting algorithm would be most efficient for a nearly-sorted list of spacecraft launch times?',
        options: ['Bubble Sort', 'Quick Sort', 'Insertion Sort', 'Selection Sort'],
        correctAnswer: 2,
        explanation: 'Insertion sort is very efficient O(n) for nearly-sorted data.'
      },
      {
        id: 2,
        question: 'What is the average time complexity of Quick Sort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'Quick Sort has average time complexity of O(n log n).'
      },
      {
        id: 3,
        question: 'Merge Sort divides an array of 8 planets into subarrays until:',
        options: [
          'Each subarray has 2 elements',
          'Each subarray has 1 element',
          'Each subarray has 4 elements',
          'It never divides'
        ],
        correctAnswer: 1,
        explanation: 'Merge Sort divides until each subarray has 1 element, then merges them sorted.'
      },
      {
        id: 4,
        question: 'Which sorting algorithm is NOT stable (may change relative order of equal elements)?',
        options: ['Merge Sort', 'Bubble Sort', 'Quick Sort', 'Insertion Sort'],
        correctAnswer: 2,
        explanation: 'Quick Sort is generally not stable, though it can be implemented to be stable.'
      },
      {
        id: 5,
        question: 'For sorting 1 million star coordinates, which algorithm provides guaranteed O(n log n) performance?',
        options: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Selection Sort'],
        correctAnswer: 2,
        explanation: 'Merge Sort guarantees O(n log n) in all cases, unlike Quick Sort which can degrade.'
      }
    ]
  },
  bigO: {
    title: 'Big O Notation Quiz',
    topic: 'bigO',
    questions: [
      {
        id: 1,
        question: 'Finding a specific star in a sorted catalog of 1 billion stars using binary search has complexity:',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Binary search on sorted data is O(log n) - very efficient even for huge datasets.'
      },
      {
        id: 2,
        question: 'Checking if two lists of satellite positions are identical by comparing each element has complexity:',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Comparing each element once requires linear time O(n).'
      },
      {
        id: 3,
        question: 'Which is faster for large inputs: O(n log n) or O(n²)?',
        options: ['O(n log n)', 'O(n²)', 'Same speed', 'Depends on constants'],
        correctAnswer: 0,
        explanation: 'O(n log n) grows much slower than O(n²) for large n.'
      },
      {
        id: 4,
        question: 'Accessing a specific module on the ISS by its ID number from a hash table is:',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 0,
        explanation: 'Hash table access is O(1) average case - constant time.'
      },
      {
        id: 5,
        question: 'Nested loops checking all pairs of n planets has time complexity:',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
        correctAnswer: 2,
        explanation: 'Two nested loops each iterating n times gives O(n²).'
      }
    ]
  },
  practice: {
    title: 'Comprehensive Practice Quiz',
    topic: 'practice',
    questions: [
      {
        id: 1,
        question: 'A space probe needs to visit planets in order of distance from Sun. Which structure is most appropriate?',
        options: ['Stack', 'Queue', 'Binary Search Tree', 'Hash Table'],
        correctAnswer: 2,
        explanation: 'Binary Search Tree maintains sorted order and allows efficient insertion/search.'
      },
      {
        id: 2,
        question: 'What is the space complexity of a recursive function calculating orbital trajectories with depth n?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Recursive calls use stack space proportional to recursion depth: O(n).'
      },
      {
        id: 3,
        question: 'To find the shortest communication path between two satellites, which algorithm is best?',
        options: ['Binary Search', 'Bubble Sort', 'Breadth-First Search', 'Linear Search'],
        correctAnswer: 2,
        explanation: 'BFS finds shortest path in unweighted graphs like communication networks.'
      },
      {
        id: 4,
        question: 'An array of 10 spacecraft needs one more added. What is the worst-case complexity if the array is full?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'If array is full, must create new larger array and copy all elements: O(n).'
      },
      {
        id: 5,
        question: 'Which data structure would best implement a browser back button for a mission planning interface?',
        options: ['Queue', 'Stack', 'Array', 'Binary Tree'],
        correctAnswer: 1,
        explanation: 'Stack implements LIFO - perfect for back button (most recent page first).'
      }
    ]
  }
}

export const getTopicQuizData = (topic) => {
  return quizData[topic] || quizData.practice
}
