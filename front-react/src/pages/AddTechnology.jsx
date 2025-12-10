import React from 'react';
import { Link } from 'react-router-dom';
import './AddTechnology.css';

function AddTechnology() {
  return (
    <div className="page">
      <h1>Добавить технологию</h1>
      <p>Форма будет добавлена позже</p>
      <Link to="/technologies" className="btn btn-primary">
        ← Назад к списку
      </Link>
    </div>
  );
}

export default AddTechnology;
