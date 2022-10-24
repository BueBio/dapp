import React from 'react';
import Calendar from '../../assets/calendar-icon.svg';
import { getDatesFormat } from '../../services/getDates';
import './styles.scss';

export default function TokenCharacteristics({ expiredAt, availabledAt }) {
  const expiredAtFormat = getDatesFormat(expiredAt);
  const availabledAtFormat = getDatesFormat(availabledAt);

  return (
    <>
      <div className="token-characteristics-section">
        <div className="characteristics-container">
          <div className="characteristics-title">
            <h3>Expired At</h3>
          </div>
          <div className="characteristics-img-text">
            <img src={Calendar} alt="curent-section" />
            <h4>{expiredAtFormat}</h4>
          </div>
        </div>
      </div>
      <div className="token-characteristics-section">
        <div className="characteristics-container">
          <div className="characteristics-title">
            <h3>Availabled At</h3>
          </div>
          <div className="characteristics-img-text">
            <img src={Calendar} alt="curent-section" />
            <h4>{availabledAtFormat}</h4>
          </div>
        </div>
      </div>

    </>
  );
}
