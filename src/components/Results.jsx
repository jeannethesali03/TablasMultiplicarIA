import React from 'react';

const Results = ({ correctCount, totalQuestions, message, onRestart }) => {
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const isGoodPerformance = percentage >= 75;

  return (
    <div className="results-container">
      <div className="results-card">
        <div className="results-animation">
          {isGoodPerformance ? (
            <div className="celebration">
              🎉
              <div className="particle particle-1">🎊</div>
              <div className="particle particle-2">🌟</div>
              <div className="particle particle-3">🏆</div>
            </div>
          ) : (
            <div className="studying">
              📚
              <div className="book-animation">📖</div>
            </div>
          )}
        </div>

        <h2 className="results-title">
          {isGoodPerformance ? '¡Excelente Trabajo!' : '¡Buen Intento!'}
        </h2>

        <p className="results-message ai-message">{message}</p>

        <div className="results-stats">
          <div className="stat">
            <p className="stat-label">Porcentaje</p>
            <p className="stat-value">{percentage}%</p>
          </div>
          <div className="stat">
            <p className="stat-label">Correctas</p>
            <p className="stat-value">{correctCount}</p>
          </div>
          <div className="stat">
            <p className="stat-label">Incorrectas</p>
            <p className="stat-value">{totalQuestions - correctCount}</p>
          </div>
        </div>

        <div className="progress-circle">
          <svg width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={isGoodPerformance ? '#4CAF50' : '#FF9800'}
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * 314} 314`}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
            <text
              x="60"
              y="65"
              textAnchor="middle"
              className="percentage-text"
            >
              {percentage}%
            </text>
          </svg>
        </div>

        <button className="restart-button" onClick={onRestart}>
          🔄 Intentar Nuevamente
        </button>
      </div>
    </div>
  );
};

export default Results;
