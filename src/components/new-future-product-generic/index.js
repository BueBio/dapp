import React from 'react';
import { Link } from 'react-router-dom';
import TransactionLink from '../transaction-link';
import './styles.scss';

const IMAGE_URL = `${process.env.REACT_APP_API_URL}public/resources`;

export default function NewFutureProductGeneric({ tokenData }) {
  const img = tokenData.image && tokenData.image.filename;
  const tokenImg = img && `${IMAGE_URL}/${tokenData.image.filename}`;
  return (
    <div className="nft-box-container">
      <div className="token-img-container">
        <img alt="img" src={tokenImg} />
      </div>
      <div className="color-line-future" />
      <div className="token-name">
        <h2 className="h2-future">FUTURE PRODUCTION</h2>
        <TransactionLink id={tokenData.transactionId} />
      </div>
      <div className="title-text-token">
        <h2>{tokenData.productName}</h2>
        <p>{tokenData.productDescription}</p>
        <div className="timer-price-token">
          <h4>{`${tokenData.priceTokenSymbol} ${tokenData.priceAmount}`}</h4>
        </div>
        <div className="buttons-container-token">
          <Link to={`/token-detail/${tokenData._id}`}>
            <button type="button" className="btn-gral">See more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
