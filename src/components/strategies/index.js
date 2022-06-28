import React from 'react';
import { Link } from 'react-router-dom';
import urlFromImage from '../../services/images';
import './style.scss';

export default function Strategies({ vaults }) {
  const elements = vaults.map((vault) => (
    <tr key={vault._id}>
      <td>
        <div className="linea"> </div>
        <div className="column-image">
          {vault.image && (
            <img src={urlFromImage(vault.image)} alt={vault.name} />
          )}
          <span>{vault.name}</span>
        </div>
      </td>
      <td data-title="Scoring">-</td>
      <td data-title="APY">
        {`${vault.apy}%`}
      </td>
      <td data-title="Total-Assets"> - </td>
      <td data-title="Avaliable to deposit"> - </td>
      <td>
        <Link className="column-button btn-principal" to={`/vaults/${vault._id}`}>Deposit</Link>
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
        <tbody className="tbody">
          {elements}
        </tbody>
      </table>
    </div>
  );
}
