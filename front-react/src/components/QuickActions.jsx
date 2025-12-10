import React, { useState } from 'react';
import './QuickActions.css';

function QuickActions({ technologies, setTechnologies }) {
  const [showExportInfo, setShowExportInfo] = useState(false);

  const markAllCompleted = () => {
    console.log('До обновления:', technologies);
    setTechnologies(prevTech => {
      const updated = prevTech.map(tech => ({ ...tech, status: 'completed' }));
      console.log('После обновления:', updated);
      return updated;
    });
  };

  const resetAll = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все статусы?')) {
      console.log('До сброса:', technologies);
      setTechnologies(prevTech => {
        const updated = prevTech.map(tech => ({ ...tech, status: 'not-started' }));
        console.log('После сброса:', updated);
        return updated;
      });
    }
  };

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    
    // Скачивание файла
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `technologies-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Показываем информацию
    console.log('Данные для экспорта:', dataStr);
    setShowExportInfo(true);
    setTimeout(() => setShowExportInfo(false), 3000);
  };

  return (
    <div className="quick-actions-section">
      <h3>Быстрые действия</h3>
      
      <div className="quick-actions">
        <button 
          className="quick-actions__btn quick-actions__btn--green" 
          onClick={markAllCompleted}
        >
          ✓ Отметить все как выполненные
        </button>
        <button 
          className="quick-actions__btn quick-actions__btn--gray" 
          onClick={resetAll}
        >
          ↻ Сбросить все статусы
        </button>
        <button 
          className="quick-actions__btn quick-actions__btn--blue" 
          onClick={handleExport}
        >
          📥 Экспорт данных
        </button>
      </div>

      {showExportInfo && (
        <div className="export-notification">
          ✓ Данные успешно экспортированы!
        </div>
      )}
    </div>
  );
}

export default QuickActions;
