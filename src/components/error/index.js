import React from 'react';
import { NavLink } from 'react-router-dom';
import ErrorImg from '../../assets/error.png';
import './styles.scss';

export default function Error({ text }) {
  return (
    <div className="page-container">
      <div className="error-msg-container">
        <img src={ErrorImg} alt="error" />
        <h2>{text}</h2>
        <NavLink to="/" className="btn-gral">
          Back home
        </NavLink>
      </div>
    </div>
  );
}
