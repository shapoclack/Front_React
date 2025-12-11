import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuth();

  const menuItems = [
    { path: '/', label: 'ГЛАВНАЯ' },
    { path: '/technologies', label: 'ВСЕ ТЕХНОЛОГИИ' },
    { path: '/add-technology', label: 'ДОБАВИТЬ' }
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <button 
            className="nav-menu-btn"
            onClick={toggleDrawer}
            aria-label="открыть меню"
          >
            ☰
          </button>

          <Link to="/" className="nav-logo">
            🚀 Трекер технологий
          </Link>

          <div className="nav-menu">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}

            {user && (
              <Link
                to="/profile"
                className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
              >
                👤 {user.name}
              </Link>
            )}
          </div>

          <ThemeToggle />
        </div>
      </nav>

      {/* Мобильное меню */}
      {drawerOpen && (
        <>
          <div className="drawer-overlay" onClick={closeDrawer}></div>
          <div className="drawer">
            <div className="drawer-header">
              <h2>Меню</h2>
              <button 
                className="drawer-close-btn"
                onClick={closeDrawer}
                aria-label="закрыть меню"
              >
                ✕
              </button>
            </div>
            <div className="drawer-content">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`drawer-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={closeDrawer}
                >
                  {item.label}
                </Link>
              ))}
              {user && (
                <Link
                  to="/profile"
                  className={`drawer-link ${location.pathname === '/profile' ? 'active' : ''}`}
                  onClick={closeDrawer}
                >
                  👤 Профиль ({user.name})
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navigation;
