import React, { useState, useEffect } from 'react';
import TableSelector from './components/TableSelector';
import Question from './components/Question';
import Feedback from './components/Feedback';
import Results from './components/Results';
import { generateRandomNumbers } from './utils/shuffle';
import { correctMessages, incorrectMessages, goodResultMessages, keepPracticingMessages } from './utils/messages';
import { getRandomElement } from './utils/shuffle';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('selection'); // selection, playing, results
  const [selectedTables, setSelectedTables] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // Track all answers
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [finalMessage, setFinalMessage] = useState('');

  // Initialize game
  const handleStartGame = (tables) => {
    setSelectedTables(tables);

    // Generate all questions
    const allQuestions = [];
    tables.forEach(table => {
      const shuffledNumbers = generateRandomNumbers();
      shuffledNumbers.forEach(multiplier => {
        allQuestions.push({
          table,
          multiplier,
          id: `${table}-${multiplier}`
        });
      });
    });

    setQuestions(allQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setGameState('playing');
  };

  // Handle answer
  const handleAnswer = (isAnswerCorrect) => {
    setIsCorrect(isAnswerCorrect);

    // Add answer to the list
    setAnswers([...answers, isAnswerCorrect]);

    if (isAnswerCorrect) {
      setFeedbackMessage(getRandomElement(correctMessages));
    } else {
      setFeedbackMessage(getRandomElement(incorrectMessages));
    }

    setShowFeedback(true);
  };

  // Continue to next question
  const handleContinue = () => {
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game finished - calculate results
      const correctCount = answers.filter(answer => answer === true).length;
      const percentage = Math.round((correctCount / questions.length) * 100);

      if (percentage >= 75) {
        setFinalMessage(getRandomElement(goodResultMessages));
      } else {
        setFinalMessage(getRandomElement(keepPracticingMessages));
      }

      setGameState('results');
    }
  };

  // Handle restart
  const handleRestart = () => {
    setGameState('selection');
    setSelectedTables([]);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowFeedback(false);
    setFeedbackMessage('');
    setFinalMessage('');
  };

  if (gameState === 'selection') {
    return <TableSelector onStart={handleStartGame} />;
  }

  if (gameState === 'playing' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="app">
        <Question
          table={currentQuestion.table}
          multiplier={currentQuestion.multiplier}
          onAnswer={handleAnswer}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />

        {showFeedback && (
          <Feedback
            isCorrect={isCorrect}
            message={feedbackMessage}
            onContinue={handleContinue}
          />
        )}
      </div>
    );
  }

  if (gameState === 'results') {
    const correctCount = answers.filter(answer => answer === true).length;

    return (
      <div className="app">
        <Results
          correctCount={correctCount}
          totalQuestions={questions.length}
          message={finalMessage}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return null;
}

export default App;
