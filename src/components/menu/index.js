import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import title from '../../assets/img/logo.svg';

function Menu() {
  return (
    <div className="menu">
      <div className="titulo">
        <img alt="" src={title} />
      </div>
      <ul>
        <li>
          <Link className="btn-link" to="/">Portfolio</Link>
        </li>
        <li>
          <Link className="btn-link" to="/vaults">Vaults</Link>
        </li>
        <li>
          <Link className="btn-link" to="/nfts">Nfts</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
