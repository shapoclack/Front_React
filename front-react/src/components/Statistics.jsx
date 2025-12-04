import React from 'react';
import './Statistics.css';

function Statistics({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  
  const completionPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Самая популярная категория
  const statusCounts = {
    'completed': completed,
    'in-progress': inProgress,
    'not-started': notStarted
  };
  
  const mostPopular = Object.entries(statusCounts).reduce((a, b) => 
    b[1] > a[1] ? b : a
  )[0];

  const statusLabels = {
    'completed': 'Изучено',
    'in-progress': 'В процессе',
    'not-started': 'Не начато'
  };

  return (
    <div className="statistics">
      <h2 className="statistics__title">📊 Статистика</h2>
      
      <div className="statistics__grid">
        <div className="stat-card stat-card--completed">
          <span className="stat-card__number">{completed}</span>
          <span className="stat-card__label">Изучено</span>
        </div>

        <div className="stat-card stat-card--in-progress">
          <span className="stat-card__number">{inProgress}</span>
          <span className="stat-card__label">В процессе</span>
        </div>

        <div className="stat-card stat-card--not-started">
          <span className="stat-card__number">{notStarted}</span>
          <span className="stat-card__label">Не начато</span>
        </div>

        <div className="stat-card stat-card--total">
          <span className="stat-card__number">{completionPercent}%</span>
          <span className="stat-card__label">Завершено</span>
        </div>
      </div>

      <p className="statistics__popular">
        Самая популярная категория: <strong>{statusLabels[mostPopular]}</strong>
      </p>
    </div>
  );
}

export default Statistics;
