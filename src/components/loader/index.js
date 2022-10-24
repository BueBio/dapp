import React from 'react';
import './styles.scss';

export default function Loader({ text }) {
  return (
    <div>
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div>
        {text}
      </div>
    </div>
  );
}
