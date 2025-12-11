import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Имя:</span>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn-logout"
        >
          🚪 Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export default Profile;
