import React from 'react';
import './styles.scss';

export default function ShowHistorial({ showTable }) {
  if (showTable !== 'myHistorial') {
    return (
      <div />
    );
  }

  return (
    <div className="list-token-container">
      <div className="historial-box">
        <table>
          <tr className="table-section">
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>DATE</th>
            <th>ACTION</th>
            <th>DETAILS</th>
          </tr>
          <tr className="under-table-section">
            <td>#12</td>
            <td>Honey</td>
            <td>2.1 ETH</td>
            <td>21-02-2023</td>
            <td>SELLED</td>
            <td>I</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
