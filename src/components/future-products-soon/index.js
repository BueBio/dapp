import React from 'react';
import Poncho from '../../assets/poncho.jpg';
import Wine from '../../assets/wine.jpg';
import Wood from '../../assets/wool.jpg';
import './styles.scss';

export default function FutureProductSoon({ title }) {
  const tokenImg = (title.includes('Vino') && Wine) || (title.includes('Leña') && Wood) || (title.includes('Poncho') && Poncho);
  const tokenDescription = (title.includes('Vino') && 'Vino Elefante (in The Room) Malbec 750 ml. ')
  || (title.includes('Leña') && 'Blend de leña de aprox 8k Certificada.')
  || (title.includes('Poncho') && 'This Gray Mink llama poncho represents.');
  return (
    <div className="nft-box-container">
      <div className="token-img-container">
        <img src={tokenImg} alt="img" />
      </div>
      <div className="color-line-future" />
      <div className="token-name">
        <h2 className="h2-future">FUTURE PRODUCTION</h2>
      </div>
      <div className="title-text-token">
        <h2>{title}</h2>
        <p>{tokenDescription}</p>
        <div className="timer-price-token">
          <h4>ETH 2</h4>
        </div>
        <div className="buttons-container-token">
          <button type="button" className="btn-gral btn-unavailabled">Soon</button>
        </div>
      </div>
    </div>
  );
}
