import React, { useState, useEffect } from 'react';
import './TechnologySearch.css';

function TechnologySearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 500); // Задержка 500мс

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <div className="technology-search">
      <input
        type="text"
        placeholder="Поиск технологий..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button 
          onClick={() => setSearchTerm('')}
          className="clear-button"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default TechnologySearch;
