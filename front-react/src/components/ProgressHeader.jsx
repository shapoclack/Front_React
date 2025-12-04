import React from 'react';
import './TechnologyCard.css'; // можно вынести стили в отдельный файл, но для простоты используем этот же

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <header className="progress-header">
      <div className="progress-header__top">
        <h1 className="progress-header__title">Трекер изучения технологий</h1>
        <p className="progress-header__subtitle">
          Всего технологий: <strong>{total}</strong> · Изучено:{' '}
          <strong>{completed}</strong> · Прогресс: <strong>{percent}%</strong>
        </p>
      </div>

      <div className="progress-header__bar-wrapper">
        <div className="progress-header__bar-bg">
          <div
            className="progress-header__bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </header>
  );
}

export default ProgressHeader;
