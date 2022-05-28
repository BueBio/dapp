import React from 'react';
import './style.scss';
import arrowIcon from '../../assets/img/flecha_derecha.svg';

export default function BoxHighest({ image, title, description }) {
  return (
    <div className="box-highest">
      <img className="icon" alt="" src={image} />
      <div className="btn-text">
        <div>
          {title}
        </div>
        <p>{description}</p>
      </div>
      <img alt="flecha" className="flecha" src={arrowIcon} />
    </div>
  );
}
