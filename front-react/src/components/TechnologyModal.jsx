import React, { useState } from 'react';
import './TechnologyModal.css';

function TechnologyModal({ technology, onStatusChange, onNotesChange, onClose }) {
  const [localNotes, setLocalNotes] = useState(technology.notes);

  const handleSave = () => {
    onNotesChange(technology.id, localNotes);
    onClose();
  };

  const statusOptions = [
    { value: 'not-started', label: 'Не начато', color: '#9ca3af' },
    { value: 'in-progress', label: 'В процессе', color: '#f59e0b' },
    { value: 'completed', label: 'Изучено', color: '#22c55e' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>{technology.title}</h2>
        <p className="modal-description">{technology.description}</p>

        <div className="modal-section">
          <h3>Статус</h3>
          <div className="status-buttons">
            {statusOptions.map(option => (
              <button
                key={option.value}
                className={`status-btn ${technology.status === option.value ? 'active' : ''}`}
                style={{ 
                  borderColor: option.color,
                  backgroundColor: technology.status === option.value ? option.color : 'white',
                  color: technology.status === option.value ? 'white' : option.color
                }}
                onClick={() => onStatusChange(technology.id, option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <h3>Заметки</h3>
          <textarea
            value={localNotes}
            onChange={(e) => setLocalNotes(e.target.value)}
            placeholder="Добавьте свои заметки здесь..."
            rows="6"
          />
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Отмена
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default TechnologyModal;
