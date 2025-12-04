import React from 'react';
import './TechnologyCard.css';

function TechnologyCard({ title, description, status, onStatusChange, id }) {
  const getStatusLabel = () => {
    switch (status) {
      case 'completed':
        return 'Изучено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
      default:
        return 'Не начато';
    }
  };

  const handleClick = () => {
    const statusCycle = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    };
    onStatusChange(id, statusCycle[status]);
  };

  return (
    <div 
      className={`technology-card technology-card--${status}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>
        <span className={`technology-card__status-badge status-${status}`}>
          {getStatusLabel()}
        </span>
      </div>

      <p className="technology-card__description">{description}</p>

      <div className="technology-card__progress">
        <div className="technology-card__progress-bar-wrapper">
          <div
            className={`technology-card__progress-bar technology-card__progress-bar--${status}`}
          />
        </div>
      </div>
    </div>
  );
}

export default TechnologyCard;
