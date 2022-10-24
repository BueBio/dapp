import React from 'react';
import './styles.scss';
import Production from '../../assets/production.svg';
import TOKEN_TYPES from '../../utils/tokentypes';
import Timer from '../../assets/timer.svg';

export default function MarketplaceItem({ futureToken, display, dataToken }) {
  if (!dataToken) {
    return <div />;
  }

  const tokenImg = Production;
  const lineClass = futureToken === TOKEN_TYPES.FUTURE ? 'color-line-future' : 'color-line-impact';
  const tokenTitle = futureToken === TOKEN_TYPES.FUTURE ? 'FUTURE TOKEN' : 'IMPACT TOKEN';
  const tokenTitleColor = futureToken === TOKEN_TYPES.FUTURE ? 'h2-future' : 'h2-impact';

  return (
    <div className={`nft-box-container ${display}`}>
      <div className="token-img-container">
        <img alt="img" src={tokenImg} />
      </div>
      <div className={lineClass} />
      <div className="title-text-token">
        <div className="token-name">
          <h2 className={tokenTitleColor}>{tokenTitle}</h2>
        </div>
        <h2>{dataToken.productName}</h2>
        <p>{dataToken.productDescription}</p>
        <div className="timer-price-token">
          <div className="h4-timer">
            <img src={Timer} alt="timer" />
            <h4>27/10/2022</h4>
          </div>
          <h4>ETH 15</h4>
        </div>
        <div className="buttons-container-token">
          <button type="button" className="btn-gral">Buy now</button>
        </div>
      </div>
    </div>
  );
}
