import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import Statistics from './components/Statistics.jsx';
import QuickActions from './components/QuickActions.jsx';
import SearchBox from './components/SearchBox';
import RoadmapImporter from './components/RoadmapImporter';
import DeadlineForm from './components/DeadlineForm';
import BulkStatusEditor from './components/BulkStatusEditor';
import DataExportImport from './components/DataExportImport';
import useTechnologies from './hooks/useTechnologies.js';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import useDebounce from './hooks/useDebounce';
import './App.css';

// Главная страница
function MainPage() {
  const { technologies, setTechnologies, updateStatus, updateNotes } = useTechnologies();
  const { technologies: apiTechnologies, loading, error, refetch } = useTechnologiesApi();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState(null);
  const [showDeadlineForm, setShowDeadlineForm] = useState(false);

  // Добавляем debounce для оптимизации поиска
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredTechnologies = technologies.filter(tech => {
    const matchesFilter = filter === 'all' || tech.status === filter;
    const matchesSearch = 
      tech.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleSaveDeadline = (updatedTech) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === updatedTech.id ? updatedTech : tech
      )
    );
    setShowDeadlineForm(false);
    setSelectedTech(null);
  };

  const handleBulkUpdate = (techIds, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        techIds.includes(tech.id) ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const handleImport = (importedTechnologies) => {
    const existingIds = technologies.map(tech => tech.id);
    const newTechs = importedTechnologies.filter(tech => !existingIds.includes(tech.id));
    setTechnologies(prev => [...prev, ...newTechs]);
  };

  return (
    <div className="main-page-content">
      <ProgressHeader technologies={technologies} />
      <Statistics technologies={technologies} />
      
      <QuickActions 
        technologies={technologies} 
        setTechnologies={setTechnologies} 
      />

      <RoadmapImporter />
      <BulkStatusEditor 
        technologies={technologies}
        onUpdate={handleBulkUpdate}
      />
      <DataExportImport 
        technologies={technologies}
        onImport={handleImport}
      />

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

      {/* Поиск с debounce */}
      <SearchBox 
        onSearch={setSearchQuery}
        resultsCount={filteredTechnologies.length}
      />

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

      {filteredTechnologies.length === 0 && debouncedSearchQuery && (
        <div className="no-results">
          <p>😔 Ничего не найдено по запросу "{debouncedSearchQuery}"</p>
          <button onClick={() => setSearchQuery('')} className="btn-clear-search">
            Очистить поиск
          </button>
        </div>
      )}

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
        <Navigation />
        
        <div className="app-container">
          <Routes>
            {/* Публичные маршруты */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Защищенные маршруты */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/technologies" element={
              <ProtectedRoute>
                <TechnologyList />
              </ProtectedRoute>
            } />
            <Route path="/technology/:techId" element={
              <ProtectedRoute>
                <TechnologyDetail />
              </ProtectedRoute>
            } />
            <Route path="/add-technology" element={
              <ProtectedRoute>
                <AddTechnology />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
