import React from 'react';
import './StatCard.css';

export default function StatCard({ icon, title, value, bgColor = '#3f4955' }) {
  return (
    <div className="stat-card" style={{ backgroundColor: bgColor }}>
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-info">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}