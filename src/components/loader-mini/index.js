import React from 'react';
import './styles.scss';

export default function LoaderMini() {
  return (
    <div>
      <div className="lds-ring-mini">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
