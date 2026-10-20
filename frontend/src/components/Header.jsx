import React from 'react';
import { CheckSquare, Moon, Sun, Server } from 'lucide-react';

export default function Header({ isDark, onToggleTheme, isOnline }) {
  return (
    <header className="header-container">
      <div className="brand">
        <div className="brand-icon">
          <CheckSquare size={24} />
        </div>
        <div>
          <h1 className="brand-title">TaskFlow</h1>
          <p className="brand-subtitle">DevOps-Ready Microservices Architecture</p>
        </div>
      </div>

      <div className="header-actions">
        <div className={`status-badge ${isOnline ? 'online' : 'offline'}`} title="Backend API Health">
          <span className="status-dot"></span>
          <span>{isOnline ? 'API Connected' : 'API Offline'}</span>
        </div>

        <button 
          className="theme-toggle-btn" 
          onClick={onToggleTheme} 
          aria-label="Toggle Theme"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
