import React from 'react';
import oneActive from '../../assets/1-inactive.svg';
import oneInctive from '../../assets/1-active.svg';
import twoActive from '../../assets/2-active.svg';
import twoInactive from '../../assets/2-inactive.svg';
import threeActive from '../../assets/3-active.svg';
import threeInactive from '../../assets/3-inactive.svg';
import check from '../../assets/check.svg';

import './styles.scss';

export default function StepBox({
  code, wallet, doneMsg, step,
}) {
  function renderStep(srcImg, textH4, active) {
    return (
      <div className="step-image-h4">
        <img src={srcImg} alt="one" />
        <h4 className={`${active}`}>{textH4}</h4>
      </div>
    );
  }

  function returnCode() {
    let srcImg = oneInctive;
    let itsActive = 'finished';

    if (code && step === 'code') {
      srcImg = oneActive;
      itsActive = 'active';
    }
    if (!code && (step !== 'code' || step === 'wallet')) {
      srcImg = check;
      itsActive = 'done';
    }

    return renderStep(srcImg, 'Code Verification', itsActive);
  }

  function returnWallet() {
    let srcImg = twoInactive;
    let itsActive = 'finished';

    if (wallet && step === 'wallet') {
      srcImg = twoActive;
      itsActive = 'active';
    }
    if (!wallet && (step !== 'code' || step === 'done')) {
      srcImg = check;
      itsActive = 'done';
    }

    return renderStep(srcImg, 'Wallet Verification', itsActive);
  }

  function returnDone() {
    let srcImg = threeInactive;
    let itsActive = 'finished';

    if (doneMsg && step === 'done') {
      srcImg = threeActive;
      itsActive = 'active';
    }

    return renderStep(srcImg, 'Verification Completed', itsActive);
  }

  return (
    <div className="section-container">
      <div className="input-section">
        {returnCode()}
        {returnWallet()}
        {returnDone()}
      </div>
    </div>
  );
}
