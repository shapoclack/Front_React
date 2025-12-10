import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import './TechnologyList.css';

function TechnologyList() {
  const { technologies } = useTechnologies();
  const [displayTechnologies, setDisplayTechnologies] = useState([]);

  // Загружаем технологии из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      setDisplayTechnologies(JSON.parse(saved));
    } else {
      setDisplayTechnologies(technologies);
    }
  }, [technologies]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      <div className="technologies-grid">
        {displayTechnologies.map(tech => (
          <div key={tech.id} className="technology-item">
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <div className="technology-meta">
              <span className={`status status-${tech.status}`}>
                {tech.status}
              </span>
              <Link 
                to={`/technology/${tech.id}`} 
                className="btn-link"
              >
                Подробнее →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {displayTechnologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      )}
    </div>
  );
}

export default TechnologyList;
