import React, { useState } from 'react';
import { ethers } from 'ethers';
import Loader from '../loader';
import { useRLogin } from '../../context';
import './styles.scss';

export default function ClaimCouponWallet({
  setWalletData,
  walletData,
  setValidateWallet,
  setValidateCodeAndWallet,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { state } = useRLogin();

  function submitWallet(forceWallet) {
    const walletAddress = forceWallet || walletData;
    const walletVerif = ethers.utils.isAddress(walletAddress);
    setLoading(true);
    if (!walletAddress || walletAddress === '') {
      setError(true);
      setLoading(false);
    }
    if (walletVerif) {
      setError(false);
      setLoading(false);
      setValidateWallet(false);
      setValidateCodeAndWallet(true);
      setWalletData({
        wallet: walletAddress,
        network: 'RSK',
      });
    } else {
      setLoading(false);
      setError(true);
      setMsgError('This wallet is not valid');
    }
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
      <h2>Wallet Verification</h2>
      <div className="section-container">
        <div className="input-section">
          <div className="title-input">
            <h3>Wallet Verification Red RSK</h3>
            <input type="text" className={`${error}`} placeholder="Enter your wallet..." onChange={(e) => setWalletData(e.target.value)} />
            {error && <p>{msgError}</p>}
          </div>
          <button type="button" className="btn-gral" onClick={() => submitWallet()}>Confirm</button>
          {
            state.address
              ? <button type="button" className="btn-secondary" onClick={() => submitWallet(state.address)}>Use connected wallet</button>
              : ''
          }
        </div>
      </div>
    </div>
  );
}
