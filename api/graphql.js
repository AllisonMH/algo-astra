import { buildSchema } from 'graphql'
import { createHandler } from 'graphql-http/lib/use/http'

// In-memory storage (in production, use Vercel KV or a database)
let quizResults = []
let nextId = 1

const lessonData = {
  arrays: {
    id: '1',
    topic: 'arrays',
    title: 'Arrays & Lists',
    content: 'Arrays are like spacecraft hangars - they store multiple items in a sequential, indexed order. Each hangar bay (index) holds one spacecraft (element).',
    spaceExample: 'Think of the International Space Station modules arranged in a line. Each module has a specific position, and you can access any module directly by knowing its position number.',
    keyPoints: [
      'Fixed or dynamic size collection',
      'Zero-based indexing',
      'O(1) access time by index',
      'O(n) insertion/deletion in middle'
    ]
  },
  stacks: {
    id: '2',
    topic: 'stacks',
    title: 'Stacks & Queues',
    content: 'Stacks follow LIFO (Last In, First Out) like stacking rocket stages. Queues follow FIFO (First In, First Out) like spacecraft in a launch queue.',
    spaceExample: 'Rocket stage separation: The top stage (last added) is the first to separate. Mission control queue: First spacecraft scheduled is first to launch.',
    keyPoints: [
      'Stack: LIFO structure',
      'Queue: FIFO structure',
      'O(1) push/pop operations',
      'Used in depth-first and breadth-first searches'
    ]
  },
  trees: {
    id: '3',
    topic: 'trees',
    title: 'Trees & Graphs',
    content: 'Trees are hierarchical structures like mission command chains. Graphs represent networks like satellite communication systems.',
    spaceExample: 'NASA organization chart (tree) vs. satellite network connections (graph). Each satellite can communicate with multiple others, forming a complex network.',
    keyPoints: [
      'Tree: Hierarchical, no cycles',
      'Binary tree: Max 2 children per node',
      'Graph: Nodes with edges',
      'Used for navigation systems'
    ]
  },
  sorting: {
    id: '4',
    topic: 'sorting',
    title: 'Sorting Algorithms',
    content: 'Sorting algorithms organize data efficiently, like arranging spacecraft by launch date or planets by distance from the sun.',
    spaceExample: 'Sorting planets by distance from sun: Mercury, Venus, Earth, Mars... Each algorithm takes a different approach, some faster for nearly-sorted data.',
    keyPoints: [
      'Bubble Sort: O(n²) - simple but slow',
      'Quick Sort: O(n log n) - fast, divide & conquer',
      'Merge Sort: O(n log n) - stable, predictable',
      'Choice depends on data characteristics'
    ]
  },
  bigO: {
    id: '5',
    topic: 'bigO',
    title: 'Big O Notation',
    content: 'Big O measures algorithm efficiency like measuring fuel consumption for space missions. It describes how performance scales with input size.',
    spaceExample: 'Finding a specific star: O(1) if you know coordinates, O(n) if you search sequentially, O(log n) if you use binary search of sorted catalog.',
    keyPoints: [
      'O(1): Constant - same time regardless of size',
      'O(log n): Logarithmic - binary search',
      'O(n): Linear - check each element once',
      'O(n²): Quadratic - nested loops'
    ]
  }
}

const schema = buildSchema(`
  type QuizResult {
    id: ID!
    topic: String!
    score: Int!
    totalQuestions: Int!
    timestamp: String!
    isPerfectScore: Boolean!
  }

  type LessonContent {
    id: ID!
    topic: String!
    title: String!
    content: String!
    spaceExample: String!
    keyPoints: [String!]!
  }

  input QuizResultInput {
    topic: String!
    score: Int!
    totalQuestions: Int!
    isPerfectScore: Boolean!
  }

  type Query {
    quizResults: [QuizResult!]!
    lessonContent(topic: String!): LessonContent
  }

  type Mutation {
    saveQuizResult(input: QuizResultInput!): QuizResult!
  }
`)

const resolvers = {
  quizResults: () => {
    return quizResults
  },

  lessonContent: ({ topic }) => {
    return lessonData[topic] || null
  },

  saveQuizResult: ({ input }) => {
    const result = {
      id: String(nextId++),
      topic: input.topic,
      score: input.score,
      totalQuestions: input.totalQuestions,
      timestamp: new Date().toISOString(),
      isPerfectScore: input.isPerfectScore
    }
    quizResults.push(result)
    return result
  }
}

const handler = createHandler({
  schema: schema,
  rootValue: resolvers,
})

export default async function (req, res) {
  // Enable CORS for all origins (restrict in production)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    await handler(req, res)
  } catch (error) {
    console.error('GraphQL Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
