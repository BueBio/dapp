import React from 'react';
import { NavLink } from 'react-router-dom';
import { providers } from 'ethers';
import HyperModal from 'react-hyper-modal';
import DoneImg from '../../assets/done-check.svg';
import { useRLogin } from '../../context';
import './styles.scss';

export default function ClaimCouponVerificationCompleted() {
  const { state: rloginState, dispatch } = useRLogin();

  function connectRLogin() {
    rloginState.rlogin.connect()
      .then(({ provider, disconnect }) => {
        const newProvider = new providers.Web3Provider(provider);
        newProvider.getSigner(0).getAddress()
          .then((address) => {
            dispatch({
              type: 'setDataGeneral',
              value: {
                disconnect,
                address,
                provider,
              },
            });
          });
      });
  }

  function renderBtnWallet() {
    const fnWallet = connectRLogin;
    const messageBtn = 'Connect Wallet';
    return (
      <div className="modal-container">
        <div className="explanation-text">
          <h3>
            Uhm... you are not connected to your Metamask account,
            <br />
            to go to your profile, you have to be connected.
          </h3>
        </div>
        <div className="modal-buttons-container">
          <button type="button" className="btn-gral" onClick={() => fnWallet()}>
            {messageBtn}
          </button>
          <span>
            or
          </span>
          <NavLink to="/" className="btn-gral">
            Go back
          </NavLink>
        </div>

      </div>
    );
  }

  const buttonRender = () => {
    if (!rloginState.address) {
      return (
        <HyperModal
          renderOpenButton={(requestOpen) => {
            return (
              <div className="btn-container">
                <button type="button" className="btn-gral" onClick={requestOpen}>Go profile</button>
              </div>
            );
          }}
        >
          {renderBtnWallet()}
        </HyperModal>
      );
    }
    return (
      <div className="btn-container">
        <NavLink to="/profile" className="btn-gral">
          Go profile
        </NavLink>
      </div>
    );
  };

  return (
    <div className="step-box">
      <h2>Verification Completed</h2>
      <div className="verification-completed-container">
        <img src={DoneImg} alt="alt" />
        <h3>
          Done! You have claimed you
          <br />
          NFT successfully!
        </h3>
      </div>
      {buttonRender()}
    </div>
  );
}
