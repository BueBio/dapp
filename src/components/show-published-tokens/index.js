import React from 'react';
import PublishedToken from '../published-token';
import './styles.scss';

export default function ShowPublishedTokens({ showTable }) {
  if (showTable !== 'publishedToken') {
    return (
      <div />
    );
  }

  return (
    <div className="list-token-container">
      <div className="nfts-published-box">
        <PublishedToken status="Selled" statusTag="selled" />
        <PublishedToken status="Active Bid" statusTag="activeBid" />
        <PublishedToken status="Expired" statusTag="expired" />
        <PublishedToken status="Selled" statusTag="selled" />
        <PublishedToken status="Expired" statusTag="expired" />
        <PublishedToken status="Selled" statusTag="selled" />
      </div>
    </div>
  );
}
