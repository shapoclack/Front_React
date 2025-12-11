import React, { useState } from 'react';
import './QuickActions.css';

function QuickActions({ technologies, setTechnologies }) {
  const [message, setMessage] = useState('');

  const handleCompleteAll = () => {
    const updatedTechnologies = technologies.map(tech => ({
      ...tech,
      status: 'completed'
    }));
    setTechnologies(updatedTechnologies);
    localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
    showMessage('✅ Все технологии отмечены как выполненные!', 'success');
  };

  const handleResetAll = () => {
    const updatedTechnologies = technologies.map(tech => ({
      ...tech,
      status: 'not-started',
      notes: ''
    }));
    setTechnologies(updatedTechnologies);
    localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
    showMessage('🔄 Все статусы сброшены!', 'info');
  };

  const handleRandomTechnology = () => {
    // Находим технологии, которые не завершены
    const availableTechnologies = technologies.filter(
      tech => tech.status === 'not-started' || tech.status === 'in-progress'
    );

    if (availableTechnologies.length === 0) {
      showMessage('🎉 Все технологии уже изучены! Добавьте новые для продолжения.', 'warning');
      return;
    }

    // Выбираем случайную технологию из доступных
    const randomIndex = Math.floor(Math.random() * availableTechnologies.length);
    const randomTech = availableTechnologies[randomIndex];

    // Обновляем статус на "в процессе"
    const updatedTechnologies = technologies.map(tech =>
      tech.id === randomTech.id
        ? { ...tech, status: 'in-progress' }
        : tech
    );

    setTechnologies(updatedTechnologies);
    localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
    showMessage(`🎲 Начинаем изучать: "${randomTech.title}"!`, 'success');
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="quick-actions-section">
      <h2>⚡ Быстрые действия</h2>
      
      {message && (
        <div className={`quick-action-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="quick-actions-buttons">
        <button
          onClick={handleRandomTechnology}
          className="quick-action-btn random"
          title="Выбрать случайную технологию для изучения"
        >
          🎲 Случайная технология
        </button>

        <button
          onClick={handleCompleteAll}
          className="quick-action-btn complete-all"
          title="Отметить все технологии как выполненные"
        >
          ✓ Отметить все как выполненные
        </button>

        <button
          onClick={handleResetAll}
          className="quick-action-btn reset-all"
          title="Сбросить все статусы"
        >
          ↻ Сбросить все статусы
        </button>
      </div>
    </div>
  );
}

export default QuickActions;
