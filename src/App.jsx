import { useState } from 'react'
import ArraysTab from './components/ArraysTab'
import StacksQueuesTab from './components/StacksQueuesTab'
import TreesGraphsTab from './components/TreesGraphsTab'
import SortingTab from './components/SortingTab'
import BigOTab from './components/BigOTab'
import QuizTab from './components/QuizTab'

function App() {
  const [activeTab, setActiveTab] = useState('arrays')

  const tabs = [
    { id: 'arrays', label: 'Arrays & Lists', icon: '🛸' },
    { id: 'stacks', label: 'Stacks & Queues', icon: '🚀' },
    { id: 'trees', label: 'Trees & Graphs', icon: '🌌' },
    { id: 'sorting', label: 'Sorting', icon: '⭐' },
    { id: 'bigO', label: 'Big O', icon: '📊' },
    { id: 'quiz', label: 'Practice Quiz', icon: '🎯' },
  ]

  const renderTab = () => {
    switch (activeTab) {
      case 'arrays':
        return <ArraysTab />
      case 'stacks':
        return <StacksQueuesTab />
      case 'trees':
        return <TreesGraphsTab />
      case 'sorting':
        return <SortingTab />
      case 'bigO':
        return <BigOTab />
      case 'quiz':
        return <QuizTab />
      default:
        return <ArraysTab />
    }
  }

  return (
    <div className="min-h-screen space-gradient star-field">
      {/* Header */}
      <header className="bg-space-dark/80 backdrop-blur-sm border-b border-space-cyan/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl animate-float">🚀</div>
              <div>
                <h1 className="text-3xl font-bold text-white">Algo Astra</h1>
                <p className="text-space-cyan text-sm">Navigate the Universe of Algorithms</p>
              </div>
            </div>
            <div className="text-space-cyan text-sm hidden md:block">
              Learning Data Structures Through Space Exploration
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-space-dark/60 backdrop-blur-sm border-b border-space-cyan/20 sticky top-[88px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2 space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-space-purple to-space-pink text-white shadow-lg scale-105'
                    : 'bg-space-blue/30 text-space-cyan hover:bg-space-blue/50'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {renderTab()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-space-dark/80 backdrop-blur-sm border-t border-space-cyan/30 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-space-cyan">
          <p>Algo Astra - Your Journey Through Space and Algorithms</p>
          <p className="text-sm mt-2 opacity-75">Built with React, Vite, Tailwind CSS & GraphQL</p>
        </div>
      </footer>
    </div>
  )
}

export default App
