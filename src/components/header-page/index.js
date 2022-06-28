import React from 'react';
import { providers } from 'ethers';
import { useRLogin } from '../../context';
import getNetworkName from '../../utils/rlogin-utils';
import './style.scss';

export default function HeaderPage({ title }) {
  const { state: rloginState, dispatch } = useRLogin();

  const login = () => {
    rloginState.rlogin.connect()
      .then(({ provider, disconnect }) => {
        const newProvider = new providers.Web3Provider(provider);
        newProvider.getSigner(0).getAddress()
          .then((address) => {
            dispatch({
              type: 'setDataGeneral',
              value: {
                disconnect,
                address: address.toLowerCase(),
                provider,
              },
            });
          });
      });
  };

  const showWalletInfo = () => rloginState.rlogin.showWalletInfo();

  const networkName = rloginState.networkId && <button type="button" className="btn-principal">{getNetworkName(rloginState.networkId)}</button>;

  const elementAddress = rloginState.address && <button type="button" className="btn-principal" onClick={showWalletInfo}>{rloginState.address}</button>;

  const loginBtn = !rloginState.address && <button type="button" className="btn-principal" onClick={login}>Connect</button>;

  return (
    <div className="header">
      <h2>{title}</h2>
      <div className="buttons">
        {networkName}
        {elementAddress}
        {loginBtn}
      </div>
    </div>
  );
}
