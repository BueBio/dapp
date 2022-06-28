import React from 'react';
import './style.scss';

export default function InfoBox({ title, children }) {
  return (
    <div className="content-info">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
