# Algo Astra 🚀

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/license-Open%20Source-green.svg)

**Navigate the Universe of Algorithms**

An interactive, space-themed educational platform for learning data structures and algorithms through engaging visualizations and quizzes.

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Deployment](#-deployment)

</div>

---

## 🌟 Overview

**Algo Astra** transforms complex algorithmic concepts into memorable space exploration experiences. Perfect for:
- 🎓 **Coding Beginners** - Learn fundamentals with visual aids
- 📚 **Students** - Study for exams with interactive examples
- 💼 **Interview Prep** - Practice common technical questions
- 👨‍🏫 **Educators** - Use as a teaching tool in classrooms

---

## ✨ Features

### Interactive Learning Modules

| Module | Features | Space Analogy |
|--------|----------|---------------|
| 🛸 **Arrays & Lists** | Array visualizer with indices, Linked list builder | Spacecraft hangars, Satellite chains |
| 🚀 **Stacks & Queues** | LIFO/FIFO operations, Animated feedback | Rocket stages, Launch sequences |
| 🌌 **Trees & Graphs** | Binary tree visualization, Traversal methods | Mission hierarchies, Satellite networks |
| ⭐ **Sorting Algorithms** | Real-time animations, Code examples | Planetary ordering systems |
| 📊 **Big O Notation** | Complexity comparison, Growth rate tables | Fuel efficiency metrics |
| 🎯 **Practice Quizzes** | 30 questions, Instant feedback, Achievement system | Mission assessments |

### Quiz System

- **6 Topics**: Arrays, Stacks/Queues, Trees/Graphs, Sorting, Big O, Practice
- **5 Questions per topic** (2 points each = 10 points total)
- **Perfect Score Achievement**: Unlock "You're An Algo All Star" banner
- **GraphQL Integration**: All results logged and tracked
- **Instant Feedback**: Detailed explanations for each answer

---

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - Component-based UI
- **Vite 5.4.2** - Lightning-fast build tool
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Apollo Client 3.11.0** - GraphQL state management

### Backend
- **GraphQL 16.9.0** - Type-safe API
- **graphql-http 1.22.0** - Modern HTTP server
- **Express 4.19.2** - Web server framework
- **CORS 2.8.5** - Cross-origin resource sharing

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AllisonMH/algo-astra.git
cd algo-astra

# Install dependencies
npm install
```

### Development

```bash
# Start the GraphQL server
# Terminal 1
npm run server

# Start the dev server
# Terminal 2
npm run dev
```

Visit `http://localhost:3000` to explore the app!

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [**ARCHITECTURE.md**](./ARCHITECTURE.md) | Complete technical architecture, components, and data flow |
| [**Claude.md**](./Claude.md) | Detailed project overview, features, and tech stack |

### Key Concepts

- **Component Structure**: 6 main tabs, each with specialized functionality
- **State Management**: React hooks + Apollo Client cache
- **Styling**: Custom space theme with Tailwind utilities
- **Backend**: Standalone Express GraphQL server
- **Data**: In-memory storage (upgradeable to any database)

---

## 🌐 Deployment

This app consists of two parts that need to be deployed:

### Frontend (Static Site)

The React app can be deployed to any static hosting service:
- **Netlify** - Drag and drop the `dist/` folder
- **GitHub Pages** - Push the `dist/` folder
- **Render** - Connect your repository
- **Any static host** - Upload the `dist/` folder

**Build Command**: `npm run build`
**Output Directory**: `dist/`

### Backend (GraphQL Server)

The Express GraphQL server can be deployed to:
- **Railway** - Easy Node.js deployment
- **Render** - Free Node.js hosting
- **Heroku** - Classic platform-as-a-service
- **DigitalOcean App Platform** - Simple deployment
- **Any Node.js host** - VPS or cloud server

**Start Command**: `npm run server`
**Port**: 4000 (configurable via environment variable)

### Environment Variables

Set on your frontend hosting:
```bash
VITE_GRAPHQL_URL=https://your-backend-url.com/graphql
```

This tells the frontend where to find your GraphQL API.

---

## 📊 Project Structure

```
algo-astra/
├── src/
│   ├── components/          # React components (6 tabs)
│   ├── data/                # Quiz questions
│   ├── graphql/             # Apollo Client setup
│   └── App.jsx              # Main application
├── server/                  # Express GraphQL server
│   ├── index.js            # Server entry point
│   └── schema/             # GraphQL schema & resolvers
├── dist/                    # Production build output
├── public/                  # Static assets
└── package.json            # Dependencies & scripts
```

---

## 🎯 Learning Outcomes

After using Algo Astra, users will:

✅ Understand fundamental data structures and operations
✅ Analyze algorithms using Big O notation
✅ Compare different sorting approaches
✅ Visualize how data structures work internally
✅ Apply concepts to space-themed scenarios
✅ Practice with interview-style questions

---

## 🤝 Contributing

Contributions are welcome! Areas to contribute:

- 📝 Additional quiz questions
- 🎨 New visualizations
- 🗄️ Database integration
- 🌍 Internationalization (i18n)
- 🎨 Dark mode toggle
- 🏆 Achievement badges system
- ♿ Accessibility improvements

---

## 📝 License

Open Source - Built for the coding community

---

## 🙏 Acknowledgments

Built with:
- React ecosystem
- Tailwind CSS community
- GraphQL community
- Space exploration for inspiration

---

<div align="center">

**Made with ❤️ for learners worldwide**

Where Space Meets Algorithms ✨🚀

[⬆ Back to Top](#algo-astra-)

</div>
