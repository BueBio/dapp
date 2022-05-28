import React from 'react';
import { Link } from 'react-router-dom';
import Content from '../../components/content';
import image from '../../assets/img/flecha_derecha.svg';

export default function Portfolio() {
  return (
    <Content title="Portfolio">
      <div className="box">
        <div className="content-box resources">
          <div className="resource-items">
            <div className="info-item">
              <h4>Total net worth</h4>
              <p>$ 0.00</p>
            </div>
            <div className="info-item">
              <h4>Avaliable to deposit</h4>
              <p>$ 0.00</p>
            </div>
            <div className="info-item">
              <h4>Vault earnings</h4>
              <p>$ 0.00</p>
            </div>
            <div className="info-item">
              <h4>Vaults est.yearly yield</h4>
              <p>$ 0.00</p>
            </div>
          </div>
        </div>
        <div className="content-box">
          <h3>
            My Vaults
            <Link class="btn-icon" to="/vaults">
              <img alt="" src={image} />
            </Link>
          </h3>
          <div className="info-items">
            <div className="info-item">
              <h4>Holdings</h4>
              <p>$ 0.00</p>
            </div>
            <div className="info-item">
              <h4>APY</h4>
              <p>0.00%</p>
            </div>
          </div>
        </div>
        <div className="content-box">
          <h3>
            My NFTs
            <Link class="btn-icon" to="/nfts">
              <img alt="" src={image} />
            </Link>
          </h3>
          <div className="info-items">
            <div className="info-item">
              <h4>Collections</h4>
              <p>0</p>
            </div>
            <div className="info-item">
              <h4>Using</h4>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}
