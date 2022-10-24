import React, { useState } from 'react';
import ErrorIcon from '../../assets/error.png';
import DoneIcon from '../../assets/done-check.svg';
import LoaderMini from '../loader-mini';
import { useRLogin } from '../../context';
import { approve, allowance } from '../../utils/erc20-helper';
import { buy } from '../../utils/buebio-future-helper';
import './styles.scss';

function renderBtn(step, buyToken, approveToken, allowanceToken, err, buyComplete) {
  let message;
  let fn;

  switch (step) {
    case 'confirm':
      message = 'Confirm Buy';
      fn = buyToken;
      break;
    case 'approve':
      message = 'Approve Buy';
      fn = approveToken;
      break;
    default:
      message = 'Buy Now';
      fn = allowanceToken;
      break;
  }

  const error = err && (
    <div className="buy-message-container buy-error">
      <img src={ErrorIcon} alt="error-icon" />
      <p>{err}</p>
    </div>
  );

  const successfully = buyComplete && (
    <div className="buy-message-container buy-successfully">
      <img src={DoneIcon} alt="error-icon" />
      <p>Token purchased successfully</p>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="btn-gral"
        onClick={fn}
      >
        {message}
      </button>
      {error}
      {successfully}
    </>
  );
}

export default function BtnBuyToken({ production }) {
  const { state } = useRLogin();
  const [step, setStep] = useState('buy');
  const [loading, setLoading] = useState(false);
  const [buyComplete, setBuyComplete] = useState(false);
  const [error, setError] = useState('');
  const tokenAmount = 1;

  function allowanceTransfer() {
    setLoading(true);
    allowance(
      state.address,
      production.priceTokenAddress,
      state.provider,
    )
      .then((result) => {
        if (result >= production.priceAmount) {
          setStep('confirm');
        } else {
          setStep('approve');
        }
        setLoading(false);
      })
      .catch(() => {
        setStep('approve');
        setLoading(false);
      });
  }

  function approveTransfer() {
    setLoading(true);
    setError('');
    approve(
      production.priceTokenAddress,
      production.priceAmount,
      production.priceTokenDecimals,
      state.provider,
    )
      .then((data) => data.wait())
      .then(() => {
        setStep('confirm');
        setLoading(false);
      })
      .catch((err) => {
        if (err.code !== 'ACTION_REJECTED') {
          setError('An error occurred while approving the transfer');
        }
        setLoading(false);
      });
  }

  function buyToken() {
    setError('');
    setLoading(true);
    buy(
      production.tokenId,
      tokenAmount,
      state.provider,
    )
      .then((dataBuy) => dataBuy.wait())
      .then(() => {
        setLoading(false);
        setBuyComplete(true);
        setStep('buy');
        setTimeout(() => {
          setBuyComplete(false);
        }, 3000);
      })
      .catch((err) => {
        if (err.code !== 'ACTION_REJECTED') {
          setError('An error occurred while making the purchase');
        }
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <button
        type="button"
        className="btn-gral btn-loader"
        disabled
      >
        <LoaderMini />
      </button>
    );
  }

  return renderBtn(step, buyToken, approveTransfer, allowanceTransfer, error, buyComplete);
}
