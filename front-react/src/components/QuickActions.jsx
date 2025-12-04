import React from 'react';
import './QuickActions.css';

function QuickActions({ technologies, setTechnologies }) {
  const markAllCompleted = () => {
    setTechnologies(technologies.map(tech => ({ ...tech, status: 'completed' })));
  };

  const resetAll = () => {
    setTechnologies(technologies.map(tech => ({ ...tech, status: 'not-started' })));
  };

  const selectRandom = () => {
    const randomIndex = Math.floor(Math.random() * technologies.length);
    alert(`Следующая технология для изучения: ${technologies[randomIndex].title}`);
  };

  return (
    <div className="quick-actions">
      <button className="quick-actions__btn quick-actions__btn--green" onClick={markAllCompleted}>
        ✓ Отметить все как выполненные
      </button>
      <button className="quick-actions__btn quick-actions__btn--gray" onClick={resetAll}>
        ↻ Сбросить все статусы
      </button>
      <button className="quick-actions__btn quick-actions__btn--blue" onClick={selectRandom}>
        🎲 Случайный выбор
      </button>
    </div>
  );
}

export default QuickActions;
