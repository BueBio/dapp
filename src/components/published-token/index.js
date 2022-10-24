import React from 'react';
import './styles.scss';

export default function PublishedToken({
  statusTag, status,
}) {
  return (
    <div className="future-production-box-container">
      <div className="future-production-img-container" />
      <div className="title-text-token">
        <div className={`token-status-tag ${statusTag}`}>
          <h4>{status}</h4>
        </div>
        <h2>Titulo</h2>
        <div className="label-text">
          <p>Price</p>
          <h3>ETH 2.21</h3>
        </div>
        <div className="buttons-container-token">
          <button type="button" className="btn-gral">Publish</button>
        </div>
      </div>
    </div>
  );
}
