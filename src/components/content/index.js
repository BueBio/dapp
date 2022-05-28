import React from 'react';
import './style.scss';
import HeaderPage from '../header-page';

export default function Content({ title, children }) {
  return (
    <div className="content">
      <HeaderPage title={title} />
      {children}
    </div>
  );
}
