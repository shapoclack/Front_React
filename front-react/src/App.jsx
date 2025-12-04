import React, { useState } from 'react';
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import Statistics from './components/Statistics.jsx';
import QuickActions from './components/QuickActions.jsx';
import './App.css';
function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'not-started',
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX',
      status: 'not-started',
    },
    {
      id: 3,
      title: 'State Management',
      description: 'Работа с состоянием компонентов',
      status: 'not-started',
    },
    {
      id: 4,
      title: 'Props',
      description: 'Передача данных между компонентами',
      status: 'not-started',
    },
  ]);
    const [filter, setFilter] = useState('all');

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech =>
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const filteredTechnologies = technologies.filter(tech => {
    if (filter === 'all') return true;
    return tech.status === filter;
  });

  return (
    <div className="app">
      <div className="app-container">
        <ProgressHeader technologies={technologies} />
        <Statistics technologies={technologies} />
        <QuickActions technologies={technologies} setTechnologies={setTechnologies} />

        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            Все технологии
          </button>
          <button 
            className={filter === 'not-started' ? 'active' : ''} 
            onClick={() => setFilter('not-started')}
          >
            Только не начатых
          </button>
          <button 
            className={filter === 'in-progress' ? 'active' : ''} 
            onClick={() => setFilter('in-progress')}
          >
            Только в процессе
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Только выполненных
          </button>
        </div>

        <div className="cards-list">
          {filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;