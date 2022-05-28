import React from 'react';
import urlFromImage from '../../services/images';
import './style.scss';

export default function NftsTable({ nfts }) {
  const elements = nfts.map((nft) => (
    <tr key={nft._id}>
      <td>
        <div className="column-image">
          {nft.image && (
            <img src={urlFromImage(nft.image)} alt={nft.name} />
          )}
          <span>{nft.name}</span>
        </div>
      </td>
      <td>
        <div className="column-image">
          {nft.vault && nft.vault.image && (
            <img src={urlFromImage(nft.vault.image)} alt={nft.vault.name} />
          )}
          <span>{nft.vault ? nft.vault.name : '-'}</span>
        </div>
      </td>
      <td>
        -
      </td>
    </tr>
  ));

  return (
    <div className="content-box with-margin">
      <h3>All available NFTs</h3>
      <table className="table">
        <thead className="thead">
          <tr>
            <th>
              NFT
              <div className="linea"> </div>
            </th>
            <th>
              Vault
              <div className="linea"> </div>
            </th>
            <th>
              Available to get
              <div className="linea"> </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
      </table>
    </div>
  );
}
