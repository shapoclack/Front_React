import React, { useState } from 'react';
import './RoadmapImporter.css';

function RoadmapImporter() {
  const [importing, setImporting] = useState(false);

  const handleImportRoadmap = async () => {
    try {
      setImporting(true);

      // Имитация загрузки дорожной карты (БЕЗ реального fetch)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock данные дорожной карты
      const mockRoadmapData = {
        technologies: [
          {
            id: Date.now() + 1,
            title: 'React',
            description: 'Библиотека для создания пользовательских интерфейсов',
            category: 'frontend',
            difficulty: 'beginner',
            status: 'not-started',
            notes: '',
            resources: ['https://react.dev', 'https://ru.reactjs.org']
          },
          {
            id: Date.now() + 2,
            title: 'Node.js',
            description: 'Среда выполнения JavaScript на сервере',
            category: 'backend',
            difficulty: 'intermediate',
            status: 'not-started',
            notes: '',
            resources: ['https://nodejs.org']
          },
          {
            id: Date.now() + 3,
            title: 'TypeScript',
            description: 'Типизированное надмножество JavaScript',
            category: 'language',
            difficulty: 'intermediate',
            status: 'not-started',
            notes: '',
            resources: ['https://www.typescriptlang.org']
          }
        ]
      };

      // Сохраняем импортированные технологии в localStorage
      const existingData = localStorage.getItem('techTrackerData');
      const existingTechnologies = existingData ? JSON.parse(existingData) : [];
      
      const updatedTechnologies = [...existingTechnologies, ...mockRoadmapData.technologies];
      localStorage.setItem('techTrackerData', JSON.stringify(updatedTechnologies));

      alert(`Успешно импортировано ${mockRoadmapData.technologies.length} технологий`);
      
      // Перезагрузка страницы для обновления данных
      window.location.reload();
    } catch (err) {
      alert(`Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>

      <div className="import-actions">
        <button
          onClick={handleImportRoadmap}
          disabled={importing}
          className="import-button"
        >
          {importing ? 'Импорт...' : 'Импорт пример дорожной карты'}
        </button>
      </div>
    </div>
  );
}

export default RoadmapImporter;
