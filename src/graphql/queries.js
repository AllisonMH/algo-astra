import { gql } from '@apollo/client'

export const GET_QUIZ_RESULTS = gql`
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
`

export const SAVE_QUIZ_RESULT = gql`
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
`

export const GET_LESSON_CONTENT = gql`
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
`
