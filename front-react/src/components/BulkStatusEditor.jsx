import React, { useState } from 'react';
import './BulkStatusEditor.css';

function BulkStatusEditor({ technologies, onUpdate }) {
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [newStatus, setNewStatus] = useState('not-started');
  const [isSelectMode, setIsSelectMode] = useState(false);

  const handleToggleSelect = (techId) => {
    setSelectedTechnologies(prev => {
      if (prev.includes(techId)) {
        return prev.filter(id => id !== techId);
      } else {
        return [...prev, techId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedTechnologies.length === technologies.length) {
      setSelectedTechnologies([]);
    } else {
      setSelectedTechnologies(technologies.map(tech => tech.id));
    }
  };

  const handleBulkUpdate = () => {
    if (selectedTechnologies.length === 0) {
      alert('Выберите хотя бы одну технологию');
      return;
    }

    onUpdate(selectedTechnologies, newStatus);
    setSelectedTechnologies([]);
    setIsSelectMode(false);
    alert(`Обновлено статусов: ${selectedTechnologies.length}`);
  };

  if (!isSelectMode) {
    return (
      <div className="bulk-editor-trigger">
        <button 
          onClick={() => setIsSelectMode(true)}
          className="btn-bulk-edit"
        >
          ✏️ Массовое редактирование
        </button>
      </div>
    );
  }

  return (
    <div className="bulk-editor">
      <div className="bulk-editor-header">
        <h3>Массовое редактирование статусов</h3>
        <button 
          onClick={() => {
            setIsSelectMode(false);
            setSelectedTechnologies([]);
          }}
          className="btn-close"
        >
          ✕
        </button>
      </div>

      <div className="bulk-editor-controls">
        <button 
          onClick={handleSelectAll}
          className="btn-select-all"
        >
          {selectedTechnologies.length === technologies.length 
            ? 'Снять все' 
            : 'Выбрать все'}
        </button>

        <div className="status-selector">
          <label htmlFor="bulk-status">Новый статус:</label>
          <select 
            id="bulk-status"
            value={newStatus} 
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        <button 
          onClick={handleBulkUpdate}
          className="btn-apply"
          disabled={selectedTechnologies.length === 0}
        >
          Применить к выбранным ({selectedTechnologies.length})
        </button>
      </div>

      <div className="technologies-list">
        {technologies.map(tech => (
          <div 
            key={tech.id} 
            className={`tech-item ${selectedTechnologies.includes(tech.id) ? 'selected' : ''}`}
            onClick={() => handleToggleSelect(tech.id)}
          >
            <input
              type="checkbox"
              checked={selectedTechnologies.includes(tech.id)}
              onChange={() => {}}
              aria-label={`Выбрать ${tech.title}`}
            />
            <div className="tech-info">
              <h4>{tech.title}</h4>
              <span className={`status-badge status-${tech.status}`}>
                {tech.status === 'not-started' ? 'Не начато' : 
                 tech.status === 'in-progress' ? 'В процессе' : 'Завершено'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BulkStatusEditor;
