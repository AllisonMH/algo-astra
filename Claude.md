# Algo Astra - Space-Themed Data Structures & Algorithms Learning Platform

## Project Overview

**Algo Astra** is an interactive, space-themed educational platform designed to teach data structures and algorithms through engaging visualizations, space exploration analogies, and interactive quizzes. The app caters to learners at all levels - from coding beginners to seasoned software engineers preparing for advanced technical interviews.

## Theme & Concept

The app uses **space exploration** as its central theme, making complex algorithmic concepts relatable and memorable through cosmic analogies:

- Arrays = Spacecraft hangars with indexed bays
- Stacks = Rocket stage separation (LIFO)
- Queues = Launch sequences (FIFO)
- Trees = Mission command hierarchies
- Graphs = Satellite communication networks
- Sorting = Organizing planetary data
- Big O = Fuel efficiency metrics for space missions

## Tech Stack

### Frontend
- **React 18.3.1** - Component-based UI framework
- **Vite 5.4.2** - Fast build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for styling
- **PostCSS & Autoprefixer** - CSS processing

### Backend
- **GraphQL** - Query language for API
- **Apollo Client 3.11.0** - GraphQL client for React
- **Express 4.19.2** - Web server framework
- **express-graphql 0.12.0** - GraphQL HTTP server middleware
- **CORS** - Cross-origin resource sharing support

### Development
- **@vitejs/plugin-react 4.3.1** - React support for Vite
- **Node.js** - Runtime environment

## Features

### 1. Arrays & Lists Tab (🛸)
- **Interactive Array Visualizer**: Enter comma-separated values to see array elements with their indices
- **Dynamic Linked List Builder**: Build and visualize linked lists with node addition/removal
- Visual representations of O(1) access time and sequential structure
- Space-themed examples using ISS modules and satellites

### 2. Stacks & Queues Tab (🚀)
- **Stack Visualizer (LIFO)**: Interactive push/pop operations with rocket stage analogy
- **Queue Visualizer (FIFO)**: Enqueue/dequeue operations with launch sequence theme
- Animated visual feedback for operations
- Real-time display of top/front elements and structure size

### 3. Trees & Graphs Tab (🌌)
- **Binary Tree Visualization**: Mission control hierarchy displayed as tree structure
- **Collapsible Sections**:
  - Tree Terminology (root, parent, child, leaf, height, depth)
  - Types of Trees (binary, BST, balanced, complete, full)
  - Traversal Methods (in-order, pre-order, post-order, level-order)
- Visual node connections and hierarchical layout

### 4. Sorting Algorithms Tab (⭐)
- **Algorithm Comparison**: Select from Bubble, Quick, Merge, and Insertion Sort
- **Interactive Visualization**: Watch bars sort in real-time with color-coded states
  - Purple/Pink: Unsorted elements
  - Red: Elements being compared
  - Green: Sorted elements
- **Progress Bar**: Track sorting completion percentage
- **Collapsible Code Examples**: View implementation code for each algorithm
- Reset and randomize array functionality

### 5. Big O Notation Tab (📊)
- **Complexity Comparison Chart**: Color-coded list from O(1) to O(2ⁿ)
- **Interactive Cards**: Click to expand and see examples and space analogies
- **Growth Rate Table**: Numerical comparison of how algorithms scale
- **Rules of Thumb**: Best practices for Big O analysis
- Space mission analogies for each complexity level

### 6. Practice Quiz Tab (🎯)
- **Topic-Based Quizzes**: 6 different quiz topics
  - Arrays & Lists
  - Stacks & Queues
  - Trees & Graphs
  - Sorting Algorithms
  - Big O Notation
  - Comprehensive Practice
- **Quiz Structure**:
  - 5 questions per quiz
  - 2 points per question (10 points total)
  - Multiple choice format
  - Instant feedback with explanations
- **Perfect Score Achievement**: "You're An Algo All Star" winner banner
  - Animated trophy display
  - Date stamp
  - Celebratory styling
- **Quiz History**: Track recent quiz results with scores
- **GraphQL Integration**: All quiz results are logged and stored

## GraphQL Schema

### Types
```graphql
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
```

### Queries
```graphql
query GetQuizResults {
  quizResults {
    id
    topic
    score
    totalQuestions
    timestamp
    isPerfectScore
  }
}

query GetLessonContent($topic: String!) {
  lessonContent(topic: $topic) {
    id
    topic
    title
    content
    spaceExample
    keyPoints
  }
}
```

### Mutations
```graphql
mutation SaveQuizResult($input: QuizResultInput!) {
  saveQuizResult(input: $input) {
    id
    topic
    score
    totalQuestions
    timestamp
    isPerfectScore
  }
}
```

## Project Structure

```
algo-astra/
├── index.html                 # Entry HTML file
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── Claude.md                # This documentation file
├── src/
│   ├── main.jsx            # React entry point with Apollo Provider
│   ├── App.jsx             # Main app component with navigation
│   ├── index.css           # Global styles and Tailwind directives
│   ├── components/
│   │   ├── ArraysTab.jsx           # Arrays & Lists interactive tab
│   │   ├── StacksQueuesTab.jsx     # Stacks & Queues with animations
│   │   ├── TreesGraphsTab.jsx      # Binary tree visualization
│   │   ├── SortingTab.jsx          # Sorting algorithm simulator
│   │   ├── BigOTab.jsx             # Big O complexity guide
│   │   └── QuizTab.jsx             # Interactive quiz with scoring
│   ├── data/
│   │   └── quizData.js             # All quiz questions and answers
│   └── graphql/
│       ├── client.js               # Apollo Client configuration
│       └── queries.js              # GraphQL queries and mutations
└── server/
    ├── index.js                    # Express + GraphQL server
    └── schema/
        ├── schema.js               # GraphQL schema definition
        └── resolvers.js            # GraphQL resolvers and data
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd algo-astra
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the GraphQL server**:
   ```bash
   npm run server
   ```
   Server will run at `http://localhost:4000/graphql`

4. **Start the development server** (in a new terminal):
   ```bash
   npm run dev
   ```
   App will run at `http://localhost:3000`

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Preview production build**:
   ```bash
   npm run preview
   ```

## Hosting on Bolt

This app is designed to be easily deployed on Bolt or similar platforms:

1. **Environment Variables**: Configure `VITE_GRAPHQL_URL` if needed
2. **Build**: Run `npm run build` to generate production files in `dist/`
3. **Deploy**: Upload the `dist/` folder to your hosting platform
4. **Server**: Ensure the GraphQL server is running and accessible

## Educational Content

### Quiz Topics & Questions

Each quiz contains **5 carefully crafted questions** with:
- Space-themed scenarios
- Multiple choice answers
- Detailed explanations
- 2 points per question
- Total possible score: 10 points

**Quiz Topics**:
1. **Arrays & Lists** - Zero-based indexing, access times, linked lists
2. **Stacks & Queues** - LIFO/FIFO principles, operations, use cases
3. **Trees & Graphs** - Binary trees, BST, traversals, graphs
4. **Sorting** - Algorithm comparison, time complexity, stability
5. **Big O** - Complexity analysis, growth rates, optimization
6. **Practice** - Comprehensive mixed questions

### Learning Approach

The app follows a **learn-then-test** methodology:
1. **Explore**: Interactive visualizations for hands-on learning
2. **Understand**: Key concepts explained with space analogies
3. **Practice**: Real-time manipulation of data structures
4. **Test**: Quizzes to reinforce knowledge
5. **Track**: Results logged to monitor progress

## Design Features

### Space Theme Elements
- **Color Palette**:
  - Space Dark: `#0a0e27` - Deep space background
  - Space Blue: `#1e3a8a` - Nebula tones
  - Space Purple: `#6366f1` - Cosmic energy
  - Space Cyan: `#06b6d4` - Stellar highlights
  - Space Pink: `#ec4899` - Supernova accents

- **Animations**:
  - Float effect for icons
  - Glow effect for emphasis
  - Smooth transitions throughout
  - Scale transforms on hover
  - Animated progress bars

- **Visual Elements**:
  - Gradient backgrounds
  - Star field patterns
  - Glassmorphism effects
  - Card-based layouts
  - Responsive design for all devices

### User Experience
- **Sticky Navigation**: Quick access to all tabs
- **Smooth Scrolling**: Seamless page transitions
- **Visual Feedback**: Immediate response to user actions
- **Progress Tracking**: See completion status
- **Error Handling**: Graceful handling of edge cases
- **Accessibility**: Semantic HTML and keyboard navigation

## No License Keys or Paid Components

This project is built entirely with **free and open-source** technologies:
- ✅ No API keys required
- ✅ No paid services
- ✅ No license restrictions
- ✅ No external dependencies requiring payment
- ✅ 100% self-contained educational platform

## Future Enhancement Ideas

- Add more data structures (heaps, hash tables, tries)
- Implement code challenges with live execution
- Add user accounts and progress tracking
- Create achievement badges system
- Add social features for comparing scores
- Implement difficulty levels for quizzes
- Add timed quiz mode
- Create study plans and learning paths
- Add video tutorials
- Implement dark/light theme toggle

## Target Audience

1. **Beginners** - Clear explanations with visual aids
2. **Students** - Comprehensive coverage of fundamentals
3. **Interview Prep** - Common technical interview topics
4. **Educators** - Teaching resource with interactive demos
5. **Self-Learners** - Self-paced learning with quizzes

## Key Learning Outcomes

After using Algo Astra, users will be able to:

✅ Understand fundamental data structures and their operations
✅ Analyze algorithm efficiency using Big O notation
✅ Compare different sorting algorithms
✅ Choose appropriate data structures for specific problems
✅ Visualize how algorithms work step-by-step
✅ Apply algorithmic concepts to real-world scenarios
✅ Prepare for technical interviews with confidence

## Contributing

This project welcomes contributions! Areas for contribution:
- Additional quiz questions
- New visualization features
- Bug fixes and optimizations
- Documentation improvements
- Accessibility enhancements
- Internationalization support

## License

[Specify your license here - e.g., MIT, Apache 2.0, etc.]

## Credits

Built with ❤️ for the coding community

**Technologies Used**:
- React, Vite, Tailwind CSS, GraphQL, Apollo, Express

**Inspired By**:
- The beauty of space exploration
- The elegance of algorithmic thinking
- The joy of interactive learning

---

**Algo Astra** - Where Space Meets Algorithms ✨🚀📊
