import React from 'react';
import NftBox from '../nft-box';
import TOKEN_TYPES from '../../utils/tokentypes';
import './styles.scss';

export default function ShowMyTokens({ showTable, impactTokens, futureTokens }) {
  if (showTable !== 'mytokens') {
    return (
      <div />
    );
  }

  function renderImpactTokens() {
    return impactTokens.map((token, index) => {
      const key = `${token._id}${index}`;
      return (
        <NftBox
          typeToken={TOKEN_TYPES.IMPACT}
          key={key}
          dataToken={token}
        />
      );
    });
  }

  function renderFutureTokens() {
    return futureTokens.map((token, index) => {
      const key = `${token._id}${index}`;
      return (
        <NftBox
          typeToken={TOKEN_TYPES.FUTURE}
          key={key}
          dataToken={token}
        />
      );
    });
  }

  const haveImpactTokens = impactTokens || impactTokens.length > 0;
  const haveFutureTokens = futureTokens || futureTokens.length > 0;

  if (!haveImpactTokens && !haveFutureTokens) {
    return <p>You don&apos;t have tokens</p>;
  }

  return (
    <div className="list-token-container">
      <div className="nfts-box">
        {renderImpactTokens()}
        {renderFutureTokens()}
      </div>
    </div>
  );
}
