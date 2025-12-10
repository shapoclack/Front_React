import React, { useRef, useState } from 'react';
import './DataExportImport.css';

function DataExportImport({ technologies, onImport }) {
  const fileInputRef = useRef(null);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');

  // Экспорт данных в JSON
  const handleExport = () => {
    try {
      const dataToExport = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        technologies: technologies
      };

      const jsonString = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `technologies-${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('Данные успешно экспортированы!');
    } catch (error) {
      alert('Ошибка экспорта: ' + error.message);
    }
  };

  // Импорт данных из JSON
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImportError('');
    setImportSuccess('');

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const importedData = JSON.parse(content);

        // Валидация структуры данных
        if (!importedData.technologies || !Array.isArray(importedData.technologies)) {
          throw new Error('Некорректный формат файла: отсутствует массив technologies');
        }

        // Валидация каждой технологии
        const validTechnologies = importedData.technologies.filter(tech => {
          return tech.id && tech.title && tech.description;
        });

        if (validTechnologies.length === 0) {
          throw new Error('В файле нет корректных данных о технологиях');
        }

        if (validTechnologies.length < importedData.technologies.length) {
          setImportError(`Некоторые записи были пропущены из-за некорректных данных`);
        }

        // Вызываем функцию импорта
        onImport(validTechnologies);
        setImportSuccess(`Успешно импортировано ${validTechnologies.length} технологий`);
        
        // Очищаем input
        event.target.value = '';
      } catch (error) {
        setImportError(`Ошибка импорта: ${error.message}`);
      }
    };

    reader.onerror = () => {
      setImportError('Ошибка чтения файла');
    };

    reader.readAsText(file);
  };

  return (
    <div className="data-export-import">
      <h3>Экспорт и импорт данных</h3>

      <div className="actions">
        <button 
          onClick={handleExport}
          className="btn-export"
          disabled={technologies.length === 0}
        >
          📥 Экспортировать данные
        </button>

        <button 
          onClick={() => fileInputRef.current?.click()}
          className="btn-import"
        >
          📤 Импортировать данные
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </div>

      {importError && (
        <div className="message error-message" role="alert">
          {importError}
        </div>
      )}

      {importSuccess && (
        <div className="message success-message" role="status">
          {importSuccess}
        </div>
      )}

      <div className="info">
        <p>💡 Экспорт создаст валидный JSON файл с вашими технологиями</p>
        <p>💡 Импорт проверит корректность данных перед загрузкой</p>
      </div>
    </div>
  );
}

export default DataExportImport;
