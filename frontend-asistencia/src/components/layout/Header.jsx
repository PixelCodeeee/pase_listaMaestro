import React, { useState } from 'react';
import { IoSearch, IoNotifications, IoPerson } from 'react-icons/io5';
import './Header.css';

export default function Header({ title = 'Dashboard' }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleNotificationsClick = () => {
    console.log('Abrir notificaciones');
  };

  const handleProfileClick = () => {
    console.log('Abrir perfil');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>

        <div className="header-actions">
          {/* Buscar */}
          <div className="header-action-item">
            {showSearch ? (
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header-search-input"
                autoFocus
                onBlur={() => {
                  if (!searchQuery) setShowSearch(false);
                }}
              />
            ) : (
              <button
                className="header-icon-btn"
                onClick={handleSearchClick}
                title="Buscar"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            )}
          </div>

          <div className="header-action-item">
            <button
              className="header-icon-btn"
              onClick={handleNotificationsClick}
              title="Notificaciones"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge">3</span>
            </button>
          </div>

          {/* Perfil */}
          <div className="header-action-item">
            <button
              className="header-icon-btn"
              onClick={handleProfileClick}
              title="Perfil"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}