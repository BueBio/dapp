import React from 'react';
import urlFromImage from '../../services/images';
import './style.scss';

export default function Strategies({ vaults }) {
  const elements = vaults.map((vault) => (
    <tr key={vault._id}>
      <td>
        <div className="column-image">
          {vault.image && (
            <img src={urlFromImage(vault.image)} alt={vault.name} />
          )}
          <span>{vault.name}</span>
        </div>
      </td>
      <td>-</td>
      <td>
        {`${vault.apy}%`}
      </td>
      <td> - </td>
      <td>
        -
        <button type="button" className="column-button">Deposit</button>
      </td>
    </tr>
  ));

  return (
    <div className="content-box with-margin">
      <h3>Strategies</h3>
      <table className="table">
        <thead className="thead">
          <tr>
            <th>
              Asset
              <div className="linea"> </div>
            </th>
            <th>
              Scoring
              <div className="linea"> </div>
            </th>
            <th>
              APY
              <div className="linea"> </div>
            </th>
            <th>
              Total Assets
              <div className="linea"> </div>
            </th>
            <th>
              Available to deposit
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
