import React, { useState } from 'react';

const Question = ({ table, multiplier, onAnswer, currentQuestion, totalQuestions }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(false);

  const correctAnswer = table * multiplier;

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = parseInt(userAnswer, 10);

    if (isNaN(answer)) {
      setError(true);
      return;
    }

    setError(false);
    onAnswer(answer === correctAnswer);
    setUserAnswer('');
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
    setError(false);
  };

  return (
    <div className="question-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}></div>
      </div>
      <p className="progress-text">
        Pregunta {currentQuestion} de {totalQuestions}
      </p>

      <div className="question-card">
        <div className="question-equation">
          <span className="number">{table}</span>
          <span className="operator">×</span>
          <span className="number">{multiplier}</span>
          <span className="equals">=</span>
        </div>

        <form onSubmit={handleSubmit} className="answer-form">
          <input
            type="number"
            value={userAnswer}
            onChange={handleInputChange}
            placeholder="Escribe tu respuesta"
            className={`answer-input ${error ? 'error' : ''}`}
            autoFocus
          />
          <button type="submit" className="submit-button">
            ✓ Responder
          </button>
        </form>

        {error && <p className="error-message">Por favor ingresa un número válido</p>}
      </div>
    </div>
  );
};

export default Question;
