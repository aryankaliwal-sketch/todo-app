import React from 'react';
import './Spinner.css';

export default function Spinner() {
  return (
    <div className="spinner-wrap">
      <div className="spinner" />
      <p>Loading tasks…</p>
    </div>
  );
}
