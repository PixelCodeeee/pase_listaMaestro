// src/components/layout/MainLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './MainLayout.css';

export default function MainLayout({ children, title = 'Dashboard', userName = 'Usuario' }) {
  return (
    <div className="main-layout">
      {/* Sidebar */}
      <Sidebar userName={userName} />

      {/* Contenedor principal */}
      <div className="main-content-wrapper">
        {/* Header */}
        <Header title={title} />

        {/* Contenido de la página */}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}