import React, { useState } from 'react';
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import Statistics from './components/Statistics.jsx';
import QuickActions from './components/QuickActions.jsx';
import useTechnologies from './hooks/useTechnologies.js';
import './App.css';

function App() {
  // Получаем setTechnologies из хука
  const { technologies, setTechnologies, updateStatus, updateNotes } = useTechnologies();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech => {
    const matchesFilter = filter === 'all' || tech.status === filter;
    const matchesSearch = 
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app">
      <div className="app-container">
        <ProgressHeader technologies={technologies} />
        <Statistics technologies={technologies} />
        
        {/* ВАЖНО: передаём setTechnologies из хука */}
        <QuickActions 
          technologies={technologies} 
          setTechnologies={setTechnologies} 
        />

        {/* Поиск */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span>Найдено: {filteredTechnologies.length}</span>
        </div>

        {/* Фильтры */}
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
              notes={tech.notes}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
