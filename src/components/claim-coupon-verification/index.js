import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Loader from '../loader';
import { claimCoupon } from '../../services/claim-coupon';
import './styles.scss';

export default function ClaimCouponVerification({
  codeData, walletData, setDoneMessage, setCurrentStep, setValidateCodeAndWallet,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function confirmData() {
    setLoading(true);
    claimCoupon(codeData.code, walletData.wallet)
      .then(() => {
        setLoading(false);
        setValidateCodeAndWallet(false);
        setCurrentStep('done');
        setDoneMessage(true);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }

  if (loading) {
    return (
      <div className="step-box">
        <Loader text="Validating..." />
      </div>
    );
  }

  return (
    <div className="step-box">
      <ReactTooltip />
      <h2>Confirm Information</h2>
      <div className="verification-container">
        <div className="confirm-code-wallet">
          <h4>Code Verification</h4>
          <div className="description-container">
            <div className="data-container">
              <h5>PRODUCT</h5>
              <p>{codeData.product}</p>
            </div>
            <div className="data-container">
              <h5>DESCRIPTION</h5>
              <p>{codeData.description}</p>
            </div>
          </div>
        </div>
        <div className="confirm-code-wallet">
          <h4>Wallet Verification</h4>
          <div className="description-container">
            <div className="data-container">
              <h5>WALLET</h5>
              <p id="wallet-id" data-tip={`${walletData.wallet}`}>{walletData.wallet}</p>
            </div>
            <div className="data-container">
              <h5>NETWORK</h5>
              <p>{walletData.network}</p>
            </div>
          </div>
        </div>
        <div className="btn-container">
          {error ? (
            <>
              <button type="button" className="btn-gral" onClick={() => confirmData()}>Try Again</button>
              <p>There was an error in our system, please, try again...</p>
            </>
          ) : (
            <button type="button" className="btn-gral" onClick={() => confirmData()}>Confirm</button>
          )}
        </div>
      </div>
    </div>
  );
}
