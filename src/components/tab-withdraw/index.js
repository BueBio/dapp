import React, { useEffect, useState } from 'react';
import { withdraw } from '../../services/vaults';
import { getBalanceWallet } from '../../utils/erc20-helper';
import { useRLogin } from '../../context';

export default function TabWithdraw({
  vault,
  token,
  showTab,
  walletVault,
}) {
  const { state: rloginState } = useRLogin();
  const { address, provider } = rloginState;
  const [balanceWithdraw, setBalanceWithdraw] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [withdrawSuccessfully, setWithdrawSuccessfully] = useState(false);

  useEffect(() => {
    if (vault && address) {
      getBalanceWallet(address, vault.coinAddress, provider)
        .then((balance) => {
          setUserBalance(balance);
        })
        .catch(console.log);
    }
  }, [vault, address]);

  const setMaxWithdraw = () => {
    setBalanceWithdraw(walletVault.balance);
  };

  const checkIfBtnDisabled = () => {
    let disabled = false;
    if (balanceWithdraw > walletVault.balance) {
      disabled = true;
    }
    if (balanceWithdraw <= 0) {
      disabled = true;
    }
    return disabled;
  };

  const setClassBtnWithdraw = () => {
    const classDisable = checkIfBtnDisabled() && 'disabled';
    return `btn-secondary ${classDisable}`;
  };

  const handleWithdraw = (e) => {
    const { value } = e.target;
    setBalanceWithdraw(value);
  };

  const submitWithdraw = () => {
    return withdraw({
      walletAddress: address,
      vault: vault._id,
      amount: balanceWithdraw,
    })
      .then(() => {
        setBalanceWithdraw(0);
        setWithdrawSuccessfully(true);
        setTimeout(() => {
          setWithdrawSuccessfully(false);
        }, 3000);
      });
  };

  if (!showTab) {
    return <div />;
  }

  const messageWithdraw = <p>The transaction is pending</p>;

  return (
    <>
      <h5>From Vault</h5>
      <div className="vault-deposit">
        <div className="img-deposit">
          <img src={vault.urlImage} alt="vault" />
        </div>
        <div className="text-deposit">
          <p>
            {`You have ${walletVault.balance} ${token.symbol}`}
          </p>
          <input type="number" value={balanceWithdraw} onChange={handleWithdraw} />
          <button onClick={setMaxWithdraw} type="button">Max</button>
        </div>
      </div>
      <h5>To Wallet</h5>
      <div className="wallet-deposit">
        <div className="img-deposit">
          <img src={vault.urlImage} alt="vault" />
        </div>
        <div className="text-deposit">
          <p>
            {`You have ${userBalance} ${token.symbol}`}
          </p>
          <h3>{userBalance}</h3>
        </div>
      </div>
      <div className="action-buttons">
        <button
          type="button"
          className={setClassBtnWithdraw()}
          onClick={submitWithdraw}
          disabled={checkIfBtnDisabled()}
        >
          Withdraw
        </button>
      </div>
      {withdrawSuccessfully && messageWithdraw}
    </>
  );
}
