import { React } from 'react';
import CrossIcon from '../../assets/error-cross.svg';
import SuccessIcon from '../../assets/check-success.svg';
import './styles.scss';

export default function PublishTokenStatus({ status, onClick }) {
  return (
    <div className="main-status-container">
      <div>
        <h1>{status === 'SUCCESS' ? 'Published product' : 'Rejected request'}</h1>
        <div className={`status-container ${status}`}>
          <img src={status === 'SUCCESS' ? SuccessIcon : CrossIcon} alt="status-icon" />
          <span>
            {status === 'SUCCESS'
              ? 'Done! You have published your product successfully.'
              : 'Something went wrong! Please try again.'}
          </span>
        </div>
        <div className="button-container">
          {status === 'SUCCESS' ? (
            <button type="button" className="btn-gral detail">View detail</button>
          ) : (
            <>
              <button type="button" className="btn-gral back" onClick={onClick}>Back</button>
              <button type="submit" className="btn-gral retry">Retry</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
