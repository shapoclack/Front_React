import React, { useState, useEffect } from 'react';
import './SearchBox.css';

function SearchBox({ onSearch, resultsCount }) {
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
    
    // Debounce: задержка 300ms перед поиском
    const timer = setTimeout(() => {
      onSearch(inputValue);
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearch]);

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className="search-box">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
        />
        {inputValue && (
          <button 
            className="search-clear"
            onClick={handleClear}
            aria-label="Очистить поиск"
          >
            ✕
          </button>
        )}
        {isSearching && <span className="search-loading">⏳</span>}
      </div>
      <span className="search-results">
        Найдено: {resultsCount}
      </span>
    </div>
  );
}

export default SearchBox;
