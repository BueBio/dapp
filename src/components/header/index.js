import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { providers } from 'ethers';
import WalletImg from '../../assets/wallet.svg';
import UserImg from '../../assets/user.svg';
import Logo from '../../assets/logo-color.svg';
import Cross from '../../assets/cross.svg';
import Menu from '../../assets/menu.svg';
import { useRLogin } from '../../context';
import './styles.scss';

export default function Header() {
  const [menuMobile, setMenuMobile] = useState(false);
  const [btnBorder, setBtnBorder] = useState(false);
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

  function disconnectRLogin() {
    rloginState.disconnect();
    dispatch({
      type: 'setDataGeneral',
      value: {
        disconnect: () => {},
        address: null,
        provider: null,
      },
    });
  }

  function renderBtnWallet() {
    let fnWallet = connectRLogin;
    let messageBtn = 'Connect Wallet';
    if (rloginState.address) {
      fnWallet = disconnectRLogin;
      messageBtn = 'Disconnect';
    }
    return (
      <button type="button" onClick={() => { fnWallet(); setMenuMobile(!menuMobile); }} className="connect-wallet">
        <img src={WalletImg} alt="wallet" />
        {messageBtn}
      </button>
    );
  }

  function renderProfile() {
    if (rloginState.address) {
      return (
        <NavLink to="/profile" className="user">
          <img src={UserImg} alt="user" />
          User
        </NavLink>
      );
    }
    return (
      <div />
    );
  }

  window.addEventListener('scroll', () => {
    if ((window.pageYOffset > 80)) {
      setBtnBorder(true);
    } else {
      setBtnBorder(false);
    }
  });

  return (
    <div className="header-container">
      <div className={`overlay-menu ${menuMobile ? 'active' : ''}`} onClick={() => setMenuMobile(false)} aria-hidden="true" />
      <NavLink to="/">
        <img src={Logo} alt="wallet" className="logo-header" />
      </NavLink>
      <button className={btnBorder ? 'menu btn-border' : 'menu'} onClick={() => setMenuMobile(!menuMobile)} type="button">
        {menuMobile
          ? <img src={Cross} alt="alta" /> : <img src={Menu} alt="alta" />}
      </button>
      <nav className={`clase ${menuMobile ? 'active' : ''}`}>
        <NavLink to="/claim-coupon">Claim your impact NFT</NavLink>
        <NavHashLink to="/#explore-id">Buy Sustainable Products</NavHashLink>
        {renderBtnWallet()}
        {renderProfile()}
      </nav>
    </div>
  );
}
