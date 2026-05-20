import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">✓</span>
          <span className="logo-text">Taskly</span>
        </div>
        <p className="tagline">Stay organised, get things done.</p>
      </div>
    </header>
  );
}
