import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../loader';
import { codeValidation } from '../../services/claim-coupon';
import './styles.scss';

export default function ClaimCouponCode({
  setCodeData,
  setValidateWallet,
  setCurrentStep,
  setValidateCode,
}) {
  const { coupon } = useParams();
  const [code, setCode] = useState(coupon);
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="step-box">
        <Loader text="Validating..." />
      </div>
    );
  }

  function submitCode() {
    setLoading(true);
    if (!code) {
      setError(true);
      setLoading(false);
      setMsgError('This field cannot be empty...');
      return false;
    }
    return codeValidation(code)
      .then((data) => {
        setCodeData({
          product: data.production.productName,
          description: data.production.productDescription,
          code,
        });
        setError(false);
        setLoading(false);
        setValidateCode(false);
        setValidateWallet(true);
        setCurrentStep('wallet');
      })
      .catch((err) => {
        navigate('/claim-coupon');
        switch (err.response.data.code) {
          case 'invalid_or_used_code':
            setMsgError('Invalid code or already used');
            break;
          default:
            setMsgError('There was an error in our system, please try again...');
        }
        setError(true);
        setLoading(false);
      });
  }

  if (coupon) {
    submitCode();
  }

  return (
    <div className="step-box">
      <h2>Code Verification</h2>
      <div className="section-container">
        <div className="input-section">
          <div className="title-input">
            <h3>NFT Reward Code</h3>
            <input
              type="text"
              value={code}
              className={`${error}`}
              placeholder="Enter your code..."
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            {error && <p>{msgError}</p>}
          </div>
          <button type="button" className="btn-gral" onClick={() => submitCode()}>Confirm</button>
        </div>
      </div>
    </div>

  );
}
