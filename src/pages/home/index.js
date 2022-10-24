import React from 'react';
import { NavLink } from 'react-router-dom';
import FutureProduct from '../../components/future-product';
import StepClaimCoupon from '../../components/step-claim-coupon';
import FutureProductSoon from '../../components/future-products-soon';
import './styles.scss';
import Header from '../../components/header';

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <div className="home-background">
        <div className="home-text-container">
          <h2>
            Impact to earn
          </h2>
          <h4><span>Discover, buy and invest in an ecologically sustainable marketplace</span></h4>
        </div>
        <div className="explanation-of-tokens">
          <div className="sign-responsible-consumer">
            <h3>
              I am a
              {' '}
              <span>responsible consumer</span>
            </h3>
            <p>
              I want to finance sustainable production and receive NFTs
              as proof of my positive impact on the world
            </p>
            <div className="button-container">
              <a href="#explore-id" className="btn-gral">
                Explore
              </a>
              <NavLink to="/claim-coupon" className="btn-gral">
                Claim your Impact
              </NavLink>
            </div>
          </div>
        </div>

      </div>
      <div className="marketplace-token-container">
        <div className="tokens-title-container" id="explore-id">
          <h2 className="token-title">Buy sustainable products now</h2>
        </div>
        <div className="list-token-container">
          <div className="nfts-box">
            <FutureProduct />
            <FutureProductSoon title="Vino Malbec" />
            <FutureProductSoon title="Leña Sustentable" />
            <FutureProductSoon title="Handwoven Poncho" />
          </div>
        </div>
        <StepClaimCoupon />
      </div>
    </div>
  );
}
