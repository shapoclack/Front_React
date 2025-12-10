import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import Statistics from './components/Statistics.jsx';
import QuickActions from './components/QuickActions.jsx';
import RoadmapImporter from './components/RoadmapImporter';
import DeadlineForm from './components/DeadlineForm';
import BulkStatusEditor from './components/BulkStatusEditor';
import DataExportImport from './components/DataExportImport';
import useTechnologies from './hooks/useTechnologies.js';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import './App.css';

// Главная страница (встроенная версия)
function MainPage() {
  const { technologies, setTechnologies, updateStatus, updateNotes } = useTechnologies();
  const { technologies: apiTechnologies, loading, error, refetch } = useTechnologiesApi();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState(null);
  const [showDeadlineForm, setShowDeadlineForm] = useState(false);

  const filteredTechnologies = technologies.filter(tech => {
    const matchesFilter = filter === 'all' || tech.status === filter;
    const matchesSearch = 
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Обработчик сохранения срока изучения
  const handleSaveDeadline = (updatedTech) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === updatedTech.id ? updatedTech : tech
      )
    );
    setShowDeadlineForm(false);
    setSelectedTech(null);
    alert('Срок изучения установлен!');
  };

  // Обработчик массового обновления статусов
  const handleBulkUpdate = (techIds, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        techIds.includes(tech.id) ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Обработчик импорта данных
  const handleImport = (importedTechnologies) => {
    // Объединяем существующие и импортированные технологии
    // Проверяем дубликаты по ID
    const existingIds = technologies.map(tech => tech.id);
    const newTechs = importedTechnologies.filter(tech => !existingIds.includes(tech.id));
    
    setTechnologies(prev => [...prev, ...newTechs]);
  };

  return (
    <div>
      <ProgressHeader technologies={technologies} />
      <Statistics technologies={technologies} />
      
      <QuickActions 
        technologies={technologies} 
        setTechnologies={setTechnologies} 
      />

      {/* Импорт дорожных карт */}
      <RoadmapImporter />

      {/* Массовое редактирование статусов */}
      <BulkStatusEditor 
        technologies={technologies}
        onUpdate={handleBulkUpdate}
      />

      {/* Экспорт и импорт данных */}
      <DataExportImport 
        technologies={technologies}
        onImport={handleImport}
      />

      {/* Состояния загрузки и ошибок */}
      {loading && (
        <div className="app-loading">
          <div className="spinner"></div>
          <p>Загрузка технологий...</p>
        </div>
      )}

      {error && (
        <div className="app-error">
          <p>{error}</p>
          <button onClick={refetch}>Попробовать снова</button>
        </div>
      )}

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
          <div key={tech.id} className="card-wrapper">
            <TechnologyCard
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              notes={tech.notes}
              deadline={tech.deadline}
              priority={tech.priority}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
            />
            <button
              onClick={() => {
                setSelectedTech(tech);
                setShowDeadlineForm(true);
              }}
              className="btn-set-deadline"
            >
              📅 Установить срок
            </button>
          </div>
        ))}
      </div>

      {/* Показываем технологии из API (если есть) */}
      {!loading && apiTechnologies.length > 0 && (
        <div className="api-technologies">
          <h2>Технологии из API</h2>
          <div className="technologies-grid">
            {apiTechnologies.map(tech => (
              <div key={tech.id} className="technology-item">
                <h3>{tech.title}</h3>
                <p>{tech.description}</p>
                <span className="category-badge">{tech.category}</span>
                <span className="difficulty-badge">{tech.difficulty}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Форма установки срока изучения */}
      {showDeadlineForm && selectedTech && (
        <DeadlineForm
          technology={selectedTech}
          onSave={handleSaveDeadline}
          onClose={() => {
            setShowDeadlineForm(false);
            setSelectedTech(null);
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app-container">
          <Navigation />
          
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
