import React from 'react';
import Production from '../../assets/production.svg';
import TOKEN_TYPES from '../../utils/tokentypes';
import TransactionLink from '../transaction-link';
import './styles.scss';

const IMAGE_URL = `${process.env.REACT_APP_API_URL}public/resources`;

export default function NftBox({ typeToken, display, dataToken }) {
  if (!dataToken) {
    return <div />;
  }

  const img = dataToken.image && dataToken.image.filename;

  const tokenImg = img ? `${IMAGE_URL}/${dataToken.image.filename}` : Production;
  const lineClass = typeToken === TOKEN_TYPES.FUTURE ? 'color-line-future' : 'color-line-impact';
  const tokenTitle = typeToken === TOKEN_TYPES.FUTURE ? 'FUTURE TOKEN' : 'IMPACT TOKEN';
  const tokenTitleColor = typeToken === TOKEN_TYPES.FUTURE ? 'h2-future' : 'h2-impact';

  return (
    <div className={`nft-box-container ${display}`}>
      <div className="token-img-container">
        <img alt="img" src={tokenImg} />
      </div>
      <div className={lineClass} />
      <div className="title-text-token">
        <div className="token-name">
          {
            dataToken.transactionId
              ? <TransactionLink id={dataToken.transactionId} />
              : ''
          }
          <h2 className={tokenTitleColor}>{tokenTitle}</h2>
        </div>
        <h2>{dataToken.productName}</h2>
        <p>{dataToken.productDescription}</p>
      </div>
    </div>
  );
}
