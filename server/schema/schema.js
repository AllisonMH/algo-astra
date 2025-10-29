import { buildSchema } from 'graphql'

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

export default schema
