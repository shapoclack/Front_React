import React from 'react';
import './ProgressBar.css';

function ProgressBar({ progress, label, color, animated, height }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-label">
        {label}: <strong>{progress}%</strong>
      </div>
      <div 
        className="progress-bar-track" 
        style={{ height: `${height}px` }}
      >
        <div
          className={`progress-bar-fill ${animated ? 'animated' : ''}`}
          style={{
            width: `${progress}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
