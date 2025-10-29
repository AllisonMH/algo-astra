import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { SAVE_QUIZ_RESULT, GET_QUIZ_RESULTS } from '../graphql/queries'
import { quizData } from '../data/quizData'

function QuizTab() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  const [saveQuizResult] = useMutation(SAVE_QUIZ_RESULT)
  const { data: quizResults, refetch } = useQuery(GET_QUIZ_RESULTS)

  const topics = [
    { id: 'arrays', name: 'Arrays & Lists', icon: '🛸', color: 'from-blue-500 to-cyan-500' },
    { id: 'stacks', name: 'Stacks & Queues', icon: '🚀', color: 'from-purple-500 to-pink-500' },
    { id: 'trees', name: 'Trees & Graphs', icon: '🌌', color: 'from-indigo-500 to-blue-500' },
    { id: 'sorting', name: 'Sorting Algorithms', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
    { id: 'bigO', name: 'Big O Notation', icon: '📊', color: 'from-green-500 to-teal-500' },
    { id: 'practice', name: 'Comprehensive Practice', icon: '🎯', color: 'from-red-500 to-pink-500' },
  ]

  const startQuiz = (topicId) => {
    setSelectedTopic(topicId)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizComplete(false)
    setShowExplanation(false)
    setAnsweredQuestions([])
  }

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null || !selectedTopic) return

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    const quiz = quizData[selectedTopic]
    const question = quiz.questions[currentQuestion]

    if (answerIndex === question.correctAnswer) {
      setScore(score + 2)
    }

    setAnsweredQuestions([...answeredQuestions, {
      question: question.question,
      selected: answerIndex,
      correct: question.correctAnswer,
      isCorrect: answerIndex === question.correctAnswer
    }])
  }

  const handleNext = async () => {
    const quiz = quizData[selectedTopic]

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)

      const isPerfect = score + (selectedAnswer === quiz.questions[currentQuestion].correctAnswer ? 2 : 0) === 10

      try {
        await saveQuizResult({
          variables: {
            input: {
              topic: quiz.topic,
              score: score + (selectedAnswer === quiz.questions[currentQuestion].correctAnswer ? 2 : 0),
              totalQuestions: quiz.questions.length,
              isPerfectScore: isPerfect
            }
          }
        })
        refetch()
      } catch (error) {
        console.error('Error saving quiz result:', error)
      }
    }
  }

  const exitQuiz = () => {
    setSelectedTopic(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizComplete(false)
    setShowExplanation(false)
    setAnsweredQuestions([])
  }

  const renderWinnerBanner = () => {
    const finalScore = score
    const isPerfect = finalScore === 10

    return (
      <div className="space-y-6">
        {isPerfect && (
          <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 p-8 rounded-xl shadow-2xl border-4 border-yellow-500 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            <div className="relative text-center space-y-4">
              <div className="text-6xl animate-bounce">🏆</div>
              <h2 className="text-4xl font-bold text-space-dark">PERFECT SCORE!</h2>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                You're An Algo All Star!
              </div>
              <div className="flex items-center justify-center space-x-4 text-space-dark">
                <div className="text-2xl">🚀</div>
                <div className="text-xl font-semibold">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-2xl">🚀</div>
              </div>
              <div className="pt-4">
                <div className="inline-block bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-3xl font-bold text-space-dark">{finalScore} / 10</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isPerfect && (
          <div className="bg-gradient-to-br from-space-purple to-space-blue p-8 rounded-xl shadow-lg text-white text-center">
            <div className="text-5xl mb-4">🌟</div>
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
            <div className="text-5xl font-bold mb-4">{finalScore} / 10</div>
            <p className="text-xl text-space-cyan">
              {finalScore >= 8 ? 'Excellent work!' : finalScore >= 6 ? 'Good effort!' : 'Keep practicing!'}
            </p>
          </div>
        )}

        <div className="card-space p-6 text-white">
          <h3 className="text-xl font-bold mb-4 text-space-cyan">Your Answers</h3>
          <div className="space-y-3">
            {answeredQuestions.map((q, idx) => (
              <div key={idx} className={`p-4 rounded-lg ${q.isCorrect ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
                <div className="flex items-start space-x-2">
                  <div className="text-2xl">{q.isCorrect ? '✅' : '❌'}</div>
                  <div className="flex-1">
                    <p className="font-semibold">Question {idx + 1}</p>
                    <p className="text-sm opacity-90 mt-1">{q.question}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button onClick={exitQuiz} className="btn-space">
            Back to Topics
          </button>
          <button onClick={() => startQuiz(selectedTopic)} className="bg-space-blue/50 text-white px-6 py-2 rounded-lg font-semibold hover:bg-space-blue/70 transition-all">
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  const renderQuiz = () => {
    const quiz = quizData[selectedTopic]
    const question = quiz.questions[currentQuestion]

    return (
      <div className="space-y-6">
        {/* Quiz Header */}
        <div className="card-space p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-space-cyan">{quiz.title}</h2>
            <button onClick={exitQuiz} className="text-space-cyan hover:text-white transition-colors">
              ✕ Exit
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
            <div className="text-xl font-bold">
              Score: {score} / 10
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-space-dark/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-space-purple to-space-pink h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="card-space p-6 text-white">
          <div className="text-lg font-semibold mb-6">{question.question}</div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg font-medium transition-all duration-200 ${
                  selectedAnswer === null
                    ? 'bg-space-dark/30 hover:bg-space-blue/30 border border-space-cyan/30'
                    : selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'bg-green-500/50 border-2 border-green-500'
                      : 'bg-red-500/50 border-2 border-red-500'
                    : index === question.correctAnswer
                    ? 'bg-green-500/50 border-2 border-green-500'
                    : 'bg-space-dark/30 border border-space-cyan/30 opacity-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-space-purple/50 flex items-center justify-center font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-1">{option}</div>
                  {selectedAnswer !== null && index === question.correctAnswer && (
                    <div className="text-2xl">✓</div>
                  )}
                  {selectedAnswer === index && index !== question.correctAnswer && (
                    <div className="text-2xl">✗</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-6 p-4 bg-space-dark/50 rounded-lg border border-space-cyan/30">
              <strong className="text-space-cyan">Explanation:</strong>
              <p className="mt-2">{question.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <div className="mt-6 flex justify-center">
              <button onClick={handleNext} className="btn-space">
                {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderTopicSelection = () => {
    return (
      <div className="space-y-8">
        {/* Introduction */}
        <div className="card-space p-6 text-white text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold mb-3">Practice Quiz</h2>
          <p className="text-lg text-space-cyan">
            Test your knowledge with space-themed quizzes! Each quiz has 5 questions worth 2 points each.
            Score a perfect 10/10 to earn the "Algo All Star" achievement!
          </p>
        </div>

        {/* Topic Selection */}
        <div className="card-space p-6 text-white">
          <h3 className="text-2xl font-bold mb-6 text-space-cyan">Select a Topic</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => startQuiz(topic.id)}
                className={`p-6 rounded-xl bg-gradient-to-br ${topic.color} text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl`}
              >
                <div className="text-5xl mb-3">{topic.icon}</div>
                <div className="font-bold text-lg">{topic.name}</div>
                <div className="text-sm opacity-90 mt-2">5 Questions • 10 Points</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quiz History */}
        {quizResults && quizResults.quizResults && quizResults.quizResults.length > 0 && (
          <div className="card-space p-6 text-white">
            <h3 className="text-2xl font-bold mb-6 text-space-cyan">Your Recent Results</h3>
            <div className="space-y-3">
              {quizResults.quizResults.slice(-5).reverse().map((result) => (
                <div key={result.id} className={`p-4 rounded-lg flex items-center justify-between ${result.isPerfectScore ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-300/20 border border-yellow-500' : 'bg-space-dark/30'}`}>
                  <div className="flex items-center space-x-4">
                    {result.isPerfectScore && <div className="text-3xl">🏆</div>}
                    <div>
                      <div className="font-semibold capitalize">{result.topic}</div>
                      <div className="text-sm text-space-cyan">
                        {new Date(result.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${result.isPerfectScore ? 'text-yellow-400' : 'text-white'}`}>
                    {result.score} / 10
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {!selectedTopic && renderTopicSelection()}
      {selectedTopic && !quizComplete && renderQuiz()}
      {selectedTopic && quizComplete && renderWinnerBanner()}
    </div>
  )
}

export default QuizTab
