import React from 'react';
import { NavLink } from 'react-router-dom';
import BoxExplanation from '../../assets/box-explanation.svg';
import QrExplanation from '../../assets/qr-explanation.svg';
import './styles.scss';

export default function StepClaimCoupon() {
  return (
    <div className="claim-coupon-step-container">
      <div className="claim-coupon-explanation">
        <h2 className="token-title">Claim your impact NFT</h2>
        <p>Check the code on the label of the sustainable product you bougth</p>
        <h6>If you have your code, you can write it manually.</h6>
        <NavLink to="/claim-coupon" className="btn-gral">
          Claim Coupon
        </NavLink>
      </div>
      <div className="explanation-container">
        <div className="explanation-with-images-container">
          <div className="explanation-image">
            <img src={BoxExplanation} alt="BoxExplanation" />
          </div>
          <div className="explanation-text">
            <h3>
              Find Buebio&rsquo;s logo in the packaging of your product.
            </h3>
          </div>
        </div>
        <div className="explanation-with-images-container">
          <div className="explanation-image">
            <img src={QrExplanation} alt="QrExplanation" />
          </div>
          <div className="explanation-text">
            <h3>Scan the QR code to claim your NFT.</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
