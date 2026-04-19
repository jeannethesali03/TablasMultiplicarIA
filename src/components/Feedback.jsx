import React, { useEffect, useState } from 'react';

const Feedback = ({ isCorrect, message, onContinue }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`feedback-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <div className={`feedback-card ${isCorrect ? 'correct' : 'incorrect'}`}>
        <div className="feedback-icon">
          {isCorrect ? '✅' : '❌'}
        </div>
        <p className="feedback-message">{message}</p>
        <button className="continue-button" onClick={onContinue}>
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default Feedback;
