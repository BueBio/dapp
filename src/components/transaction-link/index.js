import React from 'react';
import './styles.scss';
import LinkIcon from '../../assets/link.svg';

const EXPLORER_URL = process.env.REACT_APP_BLOCKCHAIN_EXPLORER_URL;

export default function TransactionLink({ id }) {
  return (
    <div className="transaction-link">
      <a href={`${EXPLORER_URL}${id}`} target="_blank" rel="noreferrer"><img src={LinkIcon} alt="link-icon" /></a>
    </div>
  );
}
