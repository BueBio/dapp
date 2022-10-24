import { React, useState } from 'react';
import Header from '../../components/header';
import './styles.scss';
import HoneyImg from '../../assets/honey-big-img.svg';
import PublishTokenStatus from '../../components/publish-token-status';

export default function PublishToken() {
  const [status, setStatus] = useState(null);

  function resetStatus() {
    setStatus(null);
  }

  return (
    <>
      <Header />
      <div className="new-item-container">
        <div className="img-container">
          <img src={HoneyImg} alt="product-img" />
        </div>
        <div className="item-details">
          {
            (((status === 'SUCCESS' || status === 'REJECTED') && (
              <PublishTokenStatus status={status} onClick={() => resetStatus()} />))
              || (
                <>
                  <div>
                    <h2 className="h2-impact">IMPACT TOKEN</h2>
                    <h1>Nombre del producto</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="item-description">
                      <h2>Description</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        ed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam,quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse
                      </p>
                    </div>
                  </div>
                  <div className="item-price-container">
                    <span>Coin</span>
                    <select name="currency">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>BTC</option>
                    </select>
                    <span>Price</span>
                    <input type="number" placeholder="Enter a price" />
                  </div>
                  <div className="price-and-publish-btn">
                    <div className="buy-cancel-buttons-container">
                      <button className="btn-gral" type="button">Cancel</button>
                      <button className="btn-gral" type="button" onClick={() => setStatus('SUCCESS')}>Publish</button>
                    </div>
                  </div>
                </>
              ))
          }
        </div>
      </div>
    </>
  );
}
