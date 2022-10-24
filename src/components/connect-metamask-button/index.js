import React from 'react';
import { providers } from 'ethers';
import { useRLogin } from '../../context';
import './styles.scss';

export default function ConnectMetamaskButton() {
  const { state: rloginState, dispatch } = useRLogin();

  function connectRLogin() {
    rloginState.rlogin.connect()
      .then(({ provider, disconnect }) => {
        const newProvider = new providers.Web3Provider(provider);
        newProvider.getSigner(0).getAddress()
          .then((address) => {
            dispatch({
              type: 'setDataGeneral',
              value: {
                disconnect,
                address,
                provider,
              },
            });
          });
      });
  }
  const fnWallet = connectRLogin;
  const messageBtn = 'Connect Wallet';

  return (
    <button type="button" className="btn-gral connect-metamask-button" onClick={() => fnWallet()}>
      {messageBtn}
    </button>
  );
}
