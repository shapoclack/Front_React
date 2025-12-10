import React from 'react';
import { Link } from 'react-router-dom';
import ProgressHeader from '../components/ProgressHeader';
import Statistics from '../components/Statistics';
import useTechnologies from '../hooks/useTechnologies';
import './Home.css';

function Home() {
  const { technologies } = useTechnologies();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Добро пожаловать в Трекер Технологий</h1>
        <p>Организуйте своё обучение и отслеживайте прогресс</p>
      </div>

      <ProgressHeader technologies={technologies} />
      <Statistics technologies={technologies} />

      <div className="home-actions">
        <Link to="/technologies" className="btn btn-primary-large">
          📚 Посмотреть все технологии
        </Link>
        <Link to="/add-technology" className="btn btn-secondary-large">
          ➕ Добавить новую технологию
        </Link>
      </div>
    </div>
  );
}

export default Home;
