import React, { useState } from 'react';
import Header from '../../components/header';
import Stepbox from '../../components/step-box';
import ClaimCouponWallet from '../../components/claim-coupon-wallet';
import ClaimCouponVerification from '../../components/claim-coupon-verification';
import ClaimCouponCode from '../../components/claim-coupon-code';
import ClaimCouponVerificationCompleted from '../../components/claim-coupon-verification-completed';
import './styles.scss';

export default function ClaimCoupon() {
  const [validateCode, setValidateCode] = useState(true);
  const [validateWallet, setValidateWallet] = useState(false);
  const [validateCodeAndWallet, setValidateCodeAndWallet] = useState(false);
  const [doneMessage, setDoneMessage] = useState(false);
  const [codeData, setCodeData] = useState({
    product: '',
    description: '',
    code: '',
  });
  const [walletData, setWalletData] = useState({
    wallet: '',
    network: '',
  });
  const [currentStep, setCurrentStep] = useState('code');

  const codeVerification = () => {
    return (
      <ClaimCouponCode
        codeData={codeData}
        setCodeData={setCodeData}
        setValidateWallet={setValidateWallet}
        setCurrentStep={setCurrentStep}
        setValidateCode={setValidateCode}
      />
    );
  };

  const walletVerification = () => {
    return (
      <ClaimCouponWallet
        setWalletData={setWalletData}
        walletData={walletData}
        setValidateWallet={setValidateWallet}
        setValidateCodeAndWallet={setValidateCodeAndWallet}
      />
    );
  };

  const verifyDataFromWalletAndCode = () => {
    return (
      <ClaimCouponVerification
        codeData={codeData}
        walletData={walletData}
        setDoneMessage={setDoneMessage}
        setCurrentStep={setCurrentStep}
        setValidateCodeAndWallet={setValidateCodeAndWallet}
      />
    );
  };

  const verificationCompleted = () => {
    return (
      <ClaimCouponVerificationCompleted />
    );
  };

  return (
    <div className="page-container">
      <Header />
      <div className="reclaim-coupon-container">
        <div className="text-explanation-claim-coupon">
          <h2>How to claim an ImpactToken?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a felis ut sapien
            ulvinar dictum. Curabitur sit amet vestibulum velit, vitae laoreet nisl.
            Morbi ut est luctus ante laoreet sodales.
            Phasellus luctus erat nec ligula semper fringilla.
            Sed id scelerisque neque.Aenean tristique, diam vitae vulputate dignissim,
            velit elit consectetur lacus,et suscipit sapien lectus a diam.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
          <Stepbox
            code={validateCode}
            wallet={validateWallet}
            doneMsg={doneMessage}
            step={currentStep}
          />
        </div>
        {validateCode && codeVerification()}
        {validateWallet && walletVerification()}
        {validateCodeAndWallet && verifyDataFromWalletAndCode()}
        {doneMessage && verificationCompleted()}
      </div>
    </div>
  );
}
