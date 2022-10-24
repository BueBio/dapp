import React, { useEffect, useState } from 'react';
import { getProductions } from '../../services/tokens';
import Production from '../../assets/production.svg';
import Loader from '../loader';
import './styles.scss';

const IMAGE_URL = `${process.env.REACT_APP_API_URL}/resources`;

export default function NftBox({ display, limit }) {
  const [tokenData, setTokenData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function updateProductions() {
    setLoading(true);
    getProductions(limit)
      .then((data) => {
        setLoading(false);
        setError(false);
        setTokenData(data);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }

  useEffect(() => {
    updateProductions();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-msg">
        <h3>There was an error in our system, please try again...</h3>
        <button type="button" className="btn-gral" onClick={() => updateProductions()}>Try Again</button>
      </div>
    );
  }
  if (!tokenData) {
    return (
      <div>
        There are no tokens published yet...
      </div>
    );
  }

  return (
    tokenData.map((data) => {
      const img = data.image && data.image.filename;
      const tokenImg = img ? `${IMAGE_URL}/${data.image.filename}` : Production;
      const lineClass = data.typeToken === 'impactToken' ? 'color-line-impact' : 'color-line-future';
      const tokenTitle = data.typeToken === 'impactToken' ? 'IMPACT TOKEN' : 'FUTURE TOKEN';
      const tokenTitleColor = data.typeToken === 'impactToken' ? 'h2-impact' : 'h2-future';
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
            <h2>Title</h2>
            <p>Description</p>
            <div className="timer-price-token">
              <h4>{`${data.priceTokenSymbol} ${data.priceAmount}`}</h4>
            </div>
            <div className="buttons-container-token">
              <button type="button" className="btn-gral">Buy now</button>
            </div>
          </div>
        </div>
      );
    })
  );
}
