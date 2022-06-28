import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import title from '../../assets/img/logo.svg';
import menu from '../../assets/img/menu.svg';
import close from '../../assets/img/close.svg';

function Menu() {
  const [menuMobile, setMenuMobile] = useState('');
  const [menuActivate, setMenuActivate] = useState(false);
  const [colorNav, setColorNav] = useState('');

  function openClose() {
    if (!menuActivate) {
      setMenuMobile('active-menu color-btn');
      setMenuActivate(!menuActivate);
      setColorNav('navColor');
    } else {
      setMenuMobile('');
      setMenuActivate(!menuActivate);
      setColorNav('');
    }
  }
  return (
    <div className={`nav ${colorNav}`}>
      <div className={`menu ${menuMobile}`}>
        <button type="button" className="btn-menu " onClick={() => openClose()}>
          {menuActivate ? <img alt="" src={close} /> : <img alt="" src={menu} />}
        </button>
        <img alt="" src={title} className="title" />
        <button type="button" className="btn-user">0x1671...2AA7</button>
        <ul>
          <li><Link className="btn-link" to="/">Portfolio</Link></li>
          <li><Link className="btn-link" to="/vaults">Vaults</Link></li>
          <li><Link className="btn-link" to="/nfts">Nfts</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
